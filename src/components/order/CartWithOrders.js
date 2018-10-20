import React, {Component} from 'react';
import _ from "lodash";
import {withRouter} from 'react-router-dom'
import ServiceDetails from "./ServiceDetails";
import Spinner from "../Spinner";
import NavigationBar from "../NavigationBar";
import '../../styles/orderstatus.css'
import {cartStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {paymentMode} from "../../constants/PaymentMode";
import {isSuperAdmin} from "../../helper/userType";
import TextInputModal from "./TextInputModal";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";

function getStatus(x, y) {
    if (x == y) {
        return 'active'
    } else if (x > y) {
        return 'complete'
    } else
        return 'disabled'
}

function TextInfo({lable, data}) {
    if (data)
        return (<div className='row'>
            <div className='col-3'>{lable}</div>
            <div className='col-9'>: {data}</div>
        </div>)
    else
        return ''
}

function OrderStatusBar({status, isCourier}) {
    return (
        <div className="row bs-wizard" style={{"borderBottom": "0"}}>
            <div className={`col-3 bs-wizard-step ${getStatus(status, 30)}`}>
                <div className="text-center bs-wizard-stepnum">Placed</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>

            <div className={`col-3 bs-wizard-step ${getStatus(status, 50)}`}>
                <div className="text-center bs-wizard-stepnum">Processing</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>

            {
                isCourier ?
                    <div className={`col-3 bs-wizard-step ${getStatus(status, 60)}`}>
                        <div className="text-center bs-wizard-stepnum">Ready To Deliver</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="bs-wizard-dot"></div>
                    </div>
                    : ''
            }

            {
                isCourier ? '' :
                    <div className={`col-3 bs-wizard-step ${getStatus(status, 70)}`}>
                        <div className="text-center bs-wizard-stepnum">Ready To Pickup</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="bs-wizard-dot"></div>
                    </div>
            }

            <div className={`col-3 bs-wizard-step ${getStatus(status, 80)}`}>
                <div className="text-center bs-wizard-stepnum">Completed</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>
        </div>
    )
}

class CartWithOrders extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.location.pathname.split('/')[2];
        const cart = this.fetchCart();
        this.state = {
            cart: cart,
            isCourier: cart.collectionType === 'Courier',
            isPaymentCodeModalOpen: false,
            isCollectionCodeModalOpen: false,
            isPaymentCodeWrong: false,
            isCollectionCodeWrong: false,
            showSpinner: false
        }
    }

    fetchCart = (id) => {
        const that = this;
        const url = domainUrl + '/cart/' + this.id
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.withCredentials = true;
        let cart = {}
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const obj = JSON.parse(request.responseText);
                cart = obj.cart;
            }
        };
        request.send();
        return cart;
    }

    makePayment = (paymentCode) => {
        this.closePaymentCodeModal();
        if (paymentCode !== this.state.cart.paymentCode) {
            this.setState({
                isPaymentCodeWrong: true,
            })
        } else {
            this.setState({
                showSpinner: true,
                isPaymentCodeWrong: false
            });
            const url = domainUrl + '/cart/acceptPayment/' + paymentCode;
            const request = new XMLHttpRequest();
            request.open('PATCH', url, true);
            request.withCredentials = true;
            request.setRequestHeader("Content-type", "application/json");
            const that = this;
            request.onload = function () {
                if (this.status == HttpStatus.OK) {
                    var res = JSON.parse(request.response);
                    that.setState({
                        cart: that.fetchCart()
                    })
                }
                that.setState({
                    showSpinner: false
                })
            };
            request.send(JSON.stringify({}));
        }
    }

    statusUpdateToReady = (id) => {
        this.setState({
            showSpinner: true,
        });
        const url = domainUrl + '/order/changeStatus/' + id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        const that = this;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response);
                that.setState({
                    cart: that.fetchCart()
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify({
            status: 50
        }));
    }

    openPaymentCodeModal = () => {
        this.setState({
            isPaymentCodeModalOpen: true
        })
    }

    closePaymentCodeModal = () => {
        this.setState({
            isPaymentCodeModalOpen: false
        })
    }
    openCollectionCodeModal = () => {
        this.setState({
            isCollectionCodeModalOpen: true
        })
    }

    closeColletionCodeModal = () => {
        this.setState({
            isCollectionCodeModalOpen: false
        })
    }

    completeOrder = (data) => {
        this.setState({
            showSpinner: true,
        });
        const url = domainUrl + '/cart/changeStatus/' + this.state.cart._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        const that = this;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response);
                that.setState({
                    cart: that.fetchCart()
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify(data));
    }

    compareCollectionCode = (collectionCode) => {
        this.closeColletionCodeModal();
        if (collectionCode !== this.state.cart.pickup.collectionCode) {
            this.setState({
                isCollectionCodeWrong: true,
            })
        } else {
            this.setState({
                isCollectionCodeWrong: false
            });
            this.completeOrder({
                status: 80
            })
        }
    }

    render() {
        const cart = this.state.cart;
        const courier = cart.courier;
        const pickup = cart.pickup;
        return (
            <div className='mb-4 pb-4'>
                <NavigationBar/>
                <div className="container pb-0 mt-4">
                    <h3>
                        <strong>Order #: {cart.orderId}</strong>
                    </h3>
                    <hr/>
                    <h3 className='order-status'>
                        {camelCaseToWords(cartStatus[cart.status])}
                        {
                            this.state.isCourier
                                ? ((isSuperAdmin(this.props.user) && cart.status === 60)
                                ? (<span onClick={() => this.completeOrder({
                                    courierServiceName: 'abc',
                                    trackingId: '827348274837487347',
                                    status: 80
                                })}> (<span className='link'>Complete Order</span>)</span>)
                                : '')
                                : ((isSuperAdmin(this.props.user) && cart.status === 70)
                                ? (<span onClick={this.openCollectionCodeModal}> (<span
                                    className='link'>Complete Order</span>)</span>)
                                : '')
                        }
                    </h3>
                    <TextInputModal visible={this.state.isCollectionCodeModalOpen}
                                    closeModal={this.closeColletionCodeModal}
                                    onSubmit={this.compareCollectionCode}/>

                    <OrderStatusBar status={cart.status}
                                    isCourier={this.state.isCourier}/>

                    <table id="cart" className="table table-hover table-condensed mt-4">
                        <thead>
                        <tr style={{'cursor': 'default'}}>
                            <th>Service</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Parameters</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Service Cost</th>
                            <th className="text-center">Parameter Cost</th>
                            <th className="text-center">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _.map(cart.orders, (o, i) => <ServiceDetails key={o._id}
                                                                         order={o}
                                                                         user={this.props.user}
                                                                         statusUpdateToReady={this.statusUpdateToReady}
                                                                         index={i}/>)
                        }
                        <tr style={{'cursor': 'default'}}>
                            <td data-th="Service" colSpan="6">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <h4 className="nomargin">{cart.collectionType}</h4>
                                    </div>
                                </div>
                            </td>
                            <td className="text-center">₹ {cart.collectionTypeCost}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="total-price">
                        <div><span className={'total'}>Total: ₹ </span><span
                            className='price'>{cart.totalCost}</span></div>
                    </div>
                    <h5><strong>COLLECTION INFORMATION</strong></h5>
                    <div className='container p-1'>
                        <TextInfo lable="Collection Type" data={cart.collectionType}/>
                        {
                            this.state.isCourier
                                ? (
                                    <React.Fragment>
                                        <TextInfo lable="Name" data={courier.name}/>
                                        <TextInfo lable="Address" data={" " + courier.address.line1 +
                                        ", " + courier.city + " - " + courier.pinCode + ", " + courier.state + ", " + courier.country}/>
                                        <TextInfo lable="Phone" data={courier.contactNo}/>
                                        <TextInfo lable="Email" data={courier.email}/>
                                    </React.Fragment>
                                )
                                : (<React.Fragment>
                                    <TextInfo lable="Collection Code" data={pickup.collectionCode}/>
                                    <TextInfo lable="Name" data={pickup.name}/>
                                    <TextInfo lable="DAIICT ID" data={pickup.daiictId}/>
                                    <TextInfo lable="Phone" data={pickup.contactNo}/>
                                    <TextInfo lable="Email" data={pickup.email}/>
                                </React.Fragment>)
                        }
                    </div>

                    <h5 className={'mt-4'}><strong>PAYMENT INFORMATION</strong></h5>
                    <div className='container p-1'>
                        <TextInfo lable="Payment Mode" data={camelCaseToWords(paymentMode[cart.paymentType])}/>
                        {
                            cart.status == 30
                                ? (
                                    <React.Fragment>
                                        <TextInfo lable="Payment Code" data={cart.paymentCode}/>
                                        <div className='row'>
                                            <div className='col-3'>Payment Status</div>
                                            <div className='col-9'>: Pending
                                                {isSuperAdmin(this.props.user) ?
                                                    (<span> (<span className='link'
                                                                   onClick={this.openPaymentCodeModal}>
                                                        Update Status</span>)</span>) : ''}
                                            </div>
                                        </div>
                                        <TextInputModal visible={this.state.isPaymentCodeModalOpen}
                                                        onSubmit={this.makePayment}
                                                        closeModal={this.closePaymentCodeModal}/>
                                    </React.Fragment>
                                )
                                : (<React.Fragment>
                                    <TextInfo lable="Payment Code" data={cart.paymentCode}/>
                                    <TextInfo lable="Payment Status" data={'Successful'}/>
                                </React.Fragment>)
                        }
                    </div>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default withRouter(CartWithOrders);
