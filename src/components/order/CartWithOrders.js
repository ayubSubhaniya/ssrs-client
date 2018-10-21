import React, {Component} from 'react';
import _ from "lodash";
import {withRouter} from 'react-router-dom'
import ServiceDetails from "./ServiceDetails";
import NavigationBar from "../NavigationBar";
import '../../styles/orderstatus.css'
import {cartStatus, rcartStatus, rorderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {isSuperAdmin} from "../../helper/userType";
import TextInputModal from "./TextInputModal";
import {makeCall} from "../../helper/caller";
import {defaultCart} from "../../constants/constants";
import TextInfo from "./TextInfo"
import CourierDetailsModal from "./CourierDetailsModal";

function getStatus(x, y) {
    if (x == y) {
        return 'active'
    } else if (x > y) {
        return 'complete'
    } else
        return 'disabled'
}

function OrderStatusBar({status, isDelivery}) {
    return (
        <div className="row bs-wizard" style={{"borderBottom": "0"}}>
            <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.placed)}`}>
                <div className="text-center bs-wizard-stepnum">Placed</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>

            <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.processing)}`}>
                <div className="text-center bs-wizard-stepnum">Processing</div>
                <div className="progress">
                    <div className="progress-bar"></div>
                </div>
                <div className="bs-wizard-dot"></div>
            </div>

            {
                isDelivery ?
                    <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.readyToDeliver)}`}>
                        <div className="text-center bs-wizard-stepnum">Ready To Deliver</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="bs-wizard-dot"></div>
                    </div>
                    : ''
            }

            {
                isDelivery ? '' :
                    <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.readyToPickup)}`}>
                        <div className="text-center bs-wizard-stepnum">Ready To Pickup</div>
                        <div className="progress">
                            <div className="progress-bar"></div>
                        </div>
                        <div className="bs-wizard-dot"></div>
                    </div>
            }

            <div className={`col-3 bs-wizard-step ${getStatus(status, rcartStatus.completed)}`}>
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
        this.state = {
            cart: defaultCart,
            collectionType: {},
            isPaymentCodeModalOpen: false,
            isCollectionCodeModalOpen: false,
            isPaymentCodeWrong: false,
            isCollectionCodeWrong: false,
            isCourierDetailsModalOpen: false,
        }
    }

    componentDidMount(){
        this.getCart();
    }

    getCart = () => {
        let id = this.props.location.pathname.split('/')[2];
        makeCall({
            jobType: 'GET',
            urlParams: '/cart/' + id
        })
            .then((response) => {
                this.setState({
                    cart: response.cart
                })
                this.getCollection(response.cart.collectionType);
            })
    }

    getCollection = (id) => {
        makeCall({
            jobType: 'GET',
            urlParams: '/collectionType/' + id
        })
            .then((response) => {
                this.setState({
                    collectionType: response.collectionType
                })
            })
    }

    makePayment = (paymentCode) => {
        this.closePaymentCodeModal();
        if (paymentCode !== this.state.cart.paymentCode) {
            this.setState({
                isPaymentCodeWrong: true,
            })
        } else {
            this.setState({
                isPaymentCodeWrong: false
            })
            makeCall({
                jobType: 'PATCH',
                urlParams: '/cart/acceptPayment/' + paymentCode
            })
                .then(() => {
                    this.getCart();
                })
        }
    }

    statusUpdateToReady = (id) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/order/changeStatus/' + id,
            params: {
                status: rorderStatus.ready
            }
        })
            .then((response) => {
               this.getCart()
            });
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

    openCourierDetailsModal = () => {
        this.setState({
            isCourierDetailsModalOpen: true
        })
    }

    closeCourierDetailsModal = () => {
        this.setState({
            isCourierDetailsModalOpen: false
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
        makeCall({
            jobType: 'PATCH',
            urlParams: '/cart/changeStatus/' + this.state.cart._id,
            params: data
        })
            .then(() => {
                this.closeCourierDetailsModal();
                this.getCart()
            })
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
                status: rcartStatus.completed
            })
        }
    }

    render() {
        const cart = this.state.cart;
        const delivery = cart.delivery;
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
                            delivery
                                ? ((isSuperAdmin(this.props.user) && cart.status === rcartStatus.readyToDeliver)
                                ? (<span onClick={this.openCourierDetailsModal}> (<span className='link'>Complete Order</span>)</span>)
                                : '')
                                : ((isSuperAdmin(this.props.user) && cart.status === rcartStatus.readyToPickup)
                                ? (<span onClick={this.openCollectionCodeModal}> (<span
                                    className='link'>Complete Order</span>)</span>)
                                : '')
                        }
                    </h3>
                    <TextInputModal visible={this.state.isCollectionCodeModalOpen}
                                    text={'Enter Collection Code'}
                                    closeModal={this.closeColletionCodeModal}
                                    onSubmit={this.compareCollectionCode}/>
                    <CourierDetailsModal visible={this.state.isCourierDetailsModalOpen}
                                         closeModal={this.closeCourierDetailsModal}
                                         onSubmit={this.completeOrder}/>


                    <OrderStatusBar status={cart.status}
                                    isDelivery={delivery}/>

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
                                        <h4 className="nomargin">{this.state.collectionType.name}</h4>
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
                        <TextInfo lable="Collection Type" data={this.state.collectionType.name}/>
                        {
                            delivery
                                ? (
                                    <React.Fragment>
                                        <TextInfo lable="Name" data={delivery.name}/>
                                        <TextInfo lable="Address" data={" " + delivery.address.line1 +
                                        ", " + delivery.city + " - " + delivery.pinCode + ", " + delivery.state + ", " + delivery.country}/>
                                        <TextInfo lable="Phone" data={delivery.contactNo}/>
                                        <TextInfo lable="Email" data={delivery.email}/>
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
                        <TextInfo lable="Payment Mode" data={camelCaseToWords(cart.paymentType)}/>
                        {
                            cart.status === rcartStatus.placed
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
                                                        text={'Enter Payment Code'}
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
            </div>
        );
    }
}

export default withRouter(CartWithOrders);
