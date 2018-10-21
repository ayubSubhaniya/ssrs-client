import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
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
import OrderStatusBar from "./OrderStatusBar"
import OrderList from "./OrderList";


function CartStatus({status, user, delivery, openCourierDetailsModal, openCollectionCodeModal}) {
    return (
        <h3 className='order-status'>
            {camelCaseToWords(cartStatus[status])}
            {
                delivery
                    ? ((isSuperAdmin(user) && status === rcartStatus.readyToDeliver)
                    ? (<span onClick={openCourierDetailsModal}> (<span className='link'>Complete Order</span>)</span>)
                    : '')
                    : ((isSuperAdmin(user) && status === rcartStatus.readyToPickup)
                    ? (<span onClick={openCollectionCodeModal}> (<span
                        className='link'>Complete Order</span>)</span>)
                    : '')
            }
        </h3>
    )
}

function DeliveryInfo({delivery}) {
    return (
        <React.Fragment>
            <TextInfo lable="Name" data={delivery.name}/>
            <TextInfo lable="Address" data={" " + delivery.address.line1 +
            ", " + delivery.city + " - " + delivery.pinCode + ", " + delivery.state + ", " + delivery.country}/>
            <TextInfo lable="Phone" data={delivery.contactNo}/>
            <TextInfo lable="Email" data={delivery.email}/>
        </React.Fragment>
    )
}

function PickInfo({pickup}) {
    return (
        <React.Fragment>
            <TextInfo lable="Collection Code" data={pickup.collectionCode}/>
            <TextInfo lable="Name" data={pickup.name}/>
            <TextInfo lable="DAIICT ID" data={pickup.daiictId}/>
            <TextInfo lable="Phone" data={pickup.contactNo}/>
            <TextInfo lable="Email" data={pickup.email}/>
        </React.Fragment>
    )
}

function PaymentInfo({cart, user, isPaymentCodeModalOpen, openPaymentCodeModal, closePaymentCodeModal, makePayment}) {
    return (
        <React.Fragment>
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
                                        {isSuperAdmin(user) ?
                                            (<span> (<span className='link'
                                                           onClick={openPaymentCodeModal}>
                                                        Update Status</span>)</span>) : ''}
                                    </div>
                                </div>
                                <TextInputModal visible={isPaymentCodeModalOpen}
                                                text={'Enter Payment Code'}
                                                onSubmit={makePayment}
                                                closeModal={closePaymentCodeModal}/>
                            </React.Fragment>
                        )
                        : (<React.Fragment>
                            <TextInfo lable="Payment Code" data={cart.paymentCode}/>
                            <TextInfo lable="Payment Status" data={'Successful'}/>
                        </React.Fragment>)
                }
            </div>
        </React.Fragment>
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

    componentDidMount() {
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
                    <CartStatus status={cart.status}
                                user={this.props.user}
                                openCourierDetailsModal={this.openCourierDetailsModal}
                                openCollectionCodeModal={this.openCollectionCodeModal}/>
                    <TextInputModal visible={this.state.isCollectionCodeModalOpen}
                                    text={'Enter Collection Code'}
                                    closeModal={this.closeColletionCodeModal}
                                    onSubmit={this.compareCollectionCode}/>
                    <CourierDetailsModal visible={this.state.isCourierDetailsModalOpen}
                                         closeModal={this.closeCourierDetailsModal}
                                         onSubmit={this.completeOrder}/>
                    <OrderStatusBar status={cart.status}
                                    isDelivery={delivery}/>

                    <OrderList cart={cart}
                               collectionType={this.state.collectionType}
                               user={this.props.user}
                               statusUpdateToReady={this.statusUpdateToReady}/>
                    <div className="total-price">
                        <div><span className={'total'}>Total: ₹ </span><span
                            className='price'>{cart.totalCost}</span></div>
                    </div>
                    <h5><strong>COLLECTION INFORMATION</strong></h5>
                    <div className='container p-1'>
                        <TextInfo lable="Collection Type" data={this.state.collectionType.name}/>
                        {
                            delivery
                                ? <DeliveryInfo delivery={delivery}/>
                                : <PickInfo pickup={pickup}/>
                        }
                    </div>
                    <PaymentInfo user={this.props.user}
                                 cart={cart}
                                 openPaymentCodeModal={this.openPaymentCodeModal}
                                 makePayment={this.makePayment}
                                 closePaymentCodeModal={this.closePaymentCodeModal}
                                 isPaymentCodeModalOpen={this.state.isPaymentCodeModalOpen}/>
                </div>
            </div>
        );
    }
}

export default withRouter(CartWithOrders);
