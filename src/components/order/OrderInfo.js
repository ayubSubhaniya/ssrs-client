import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom'
import NavigationBar from "../NavigationBar";
import '../../styles/orderstatus.css'
import { cartStatus, rcartStatus } from "../../constants/status";
import { camelCaseToWords } from "../../helper/String";
import TextInput from "./TextInput";
import {makeCall} from "../../helper/caller";
import {collectionTypeCategory, defaultCart, ONLINE} from "../../constants/constants";
import {collectionCode, paymentCode} from "../../constants/errorMessage";
import TextInfoMod from "./TextInfoMod"
import CourierForm from "./CourierForm";
import OrderStatusBar from "./OrderStatusBar"
import ServiceList from "./ServiceList";
import { DeliveryInfo, PickupInfo } from './Info'
import { isAdmin } from "../../helper/userType";
import { handleError } from "../../helper/error";
import { domainUrl, errorMessages, modalMessages } from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import ErrorMessage from "../error/ErrorMessage";
import _ from "lodash";
import PaymentFailHistoryModal from './PaymentFailHistoryModal';
import PaymentFailHistoryModalCard from './PaymentFailHistoryModalCard';
import ConfirmModal from '../ConfirmModal';

function PaymentInfo({ cart, visible, openModal, closeModal }) {
    let paymentStatus = '';
    if (cart.paymentStatus)
        paymentStatus = 'Done';
    else if (cart.status === rcartStatus.processingPayment)
        paymentStatus = 'Processing';
    else if (cart.paymentType === ONLINE)
        paymentStatus = 'Failed';
    else
        paymentStatus = 'Pending';

    if (cart.paymentFailHistory.length) {
        cart.paymentFailHistory = _.reverse(cart.paymentFailHistory);
    }
    return (
        <div className='w-50 p-3 ml-3' style={{"border":"2px solid #343a40", "borderRadius":"4px"}}>
            <h5 className="position_head">PAYMENT INFORMATION</h5>
            <div className='container p-1'>
                <TextInfoMod lable="Payment Mode" data={camelCaseToWords(cart.paymentType)} />
                <TextInfoMod lable="Payment Code" data={cart.paymentCode} />
                <TextInfoMod lable="Payment Status" data={paymentStatus} />
            </div>

            {
                cart.paymentFailHistory.length > 0
                    ? <div>
                        <hr />
                        <h5>PAYMENT FAIL HISTORY</h5>
                        <PaymentFailHistoryModalCard
                            paymentId={cart.paymentFailHistory[0].paymentId}
                            paymentDate={cart.paymentFailHistory[0].paymentDate}
                            paymentType={cart.paymentFailHistory[0].paymentType} />
                        {
                            cart.paymentFailHistory.length > 1
                                ? <div>
                                    <PaymentFailHistoryModal
                                        visible={visible}
                                        inputList={cart.paymentFailHistory}
                                        closeModal={closeModal} />
                                    <button className="btn btn-outline-info btn-sm" onClick={openModal} style={{ "float": "right" }}>
                                        View All<i className="fa fa-angle-right" style={{ "marginLeft": "3px" }}></i>
                                    </button>
                                </div>
                                : ''
                        }
                    </div>
                    : ''

            }
        </div>
    )
}

class OrderInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cart: defaultCart,
            errorMessage: '',
            collectionType: {},
            isCancelModalOpen: false,
            isPaymentCodeModalOpen: false,
            isCollectionCodeModalOpen: false,
            isPaymentCodeWrong: false,
            isCollectionCodeWrong: false,
            isCourierDetailsModalOpen: false,
            isPaymentFailHistoryModalOpen: false,
            isRefundModalOpen: false,
        }
    }

    componentDidMount() {
        this.getCart();
    }


    cleanErrorMessage = () => {
        this.setState({
            errorMessage: ''
        })
    };

    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        })
    };

    onError = (response) => {
        if (response.status === HttpStatus.PRECONDITION_FAILED) {
            this.setErrorMessage(response.statusText);
        } else if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.setErrorMessage(errorMessages.internalServerError);
        } else if (response.status === HttpStatus.FORBIDDEN) {
            this.setErrorMessage(errorMessages.forbidden);
        } else if (response.status === HttpStatus.NOT_FOUND) {
            this.setErrorMessage('Cart not found');
        } else {
            this.setErrorMessage(errorMessages.somethingsWrong);
        }
    };

    getCart = () => {
        let id = this.props.match.params.id;
        makeCall({
            jobType: 'GET',
            urlParams: '/cart/' + id
        })
            .then((response) => {
                this.setState({
                    cart: response.cart
                });
            })
            .catch(() => {
                this.props.history.push("/order")
            })
    };

    makePayment = (paymentCode) => {
        if (paymentCode !== this.state.cart.paymentCode) {
            this.setState({
                isPaymentCodeWrong: true,
            })
        } else {
            this.setState({
                isPaymentCodeWrong: false
            });
            makeCall({
                jobType: 'PATCH',
                urlParams: '/cart/acceptPayment/' + paymentCode
            })
                .then(() => {
                    this.getCart();
                    this.closePaymentCodeModal();
                })
                .catch((error) => {
                    handleError(error);
                })
        }
    };

    openPaymentCodeModal = () => {
        this.setState({
            isPaymentCodeModalOpen: true
        })
    };

    closePaymentCodeModal = () => {
        this.setState({
            isPaymentCodeModalOpen: false
        })
    };

    openCancelModal = () => {
        this.setState({
            isCancelModalOpen: true
        })
    };

    closeCancelModal = () => {
        this.setState({
            isCancelModalOpen: false
        })
    };

    openCourierDetailsModal = () => {
        this.setState({
            isCourierDetailsModalOpen: true
        })
    };

    closeCourierDetailsModal = () => {
        this.setState({
            isCourierDetailsModalOpen: false
        })
    };

    openCollectionCodeModal = () => {
        this.setState({
            isCollectionCodeModalOpen: true
        })
    };

    closeCollectionCodeModal = () => {
        this.setState({
            isCollectionCodeModalOpen: false
        })
    };

    openPaymentFailHistoryModal = () => {
        this.setState({
            isPaymentFailHistoryModalOpen: true
        })
    }

    closePaymentFailHistoryModal = () => {
        this.setState({
            isPaymentFailHistoryModalOpen: false
        })
    }

    openRefundModal = () => {
        this.setState({
            isRefundModalOpen: true
        })
    }

    closeRefundModal = () => {
        this.setState({
            isRefundModalOpen: false
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
                this.closeCollectionCodeModal();
                this.getCart()
            })
            .catch((error) => {
                handleError(error);
            })
    };


    cancelCart = (reason) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/cart/cancelCart/' + this.state.cart._id,
            params: {
                cancelReason: reason
            }
        })
            .then(() => {
                this.closeCancelModal();
                this.getCart();
            })
            .catch((error) => {
                handleError(error);
            })
    };

    giveRefund = () => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/cart/changeStatus/' + this.state.cart._id,
            params: {
                status: rcartStatus.refunded
            }
        })
            .then(() => {
                this.getCart()
            })
            .catch((error) => {
                handleError(error);
            })
    };

    compareCollectionCode = (collectionCode) => {
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
    };

    redirect = (id) => {
        this.props.history.push({
            pathname: '/payment/' + id
        });
    };

    render() {
        const cart = this.state.cart;
        const delivery = cart.collectionType.category === collectionTypeCategory.DELIVERY ? cart.delivery : undefined;
        const pickup = cart.collectionType.category === collectionTypeCategory.PICKUP ? cart.pickup : undefined;
        return (
            <div className='mb-4 pb-4'>
                <NavigationBar />
                <div className="container pb-0 mt-4">
                    <h3>
                        <strong>Order #: {cart.orderId}</strong>
                    </h3>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <h3 className='order-status'>
                            {camelCaseToWords(cartStatus[cart.status])}
                        </h3>
                        {
                            (cart.status >= rcartStatus.placed && cart.status < rcartStatus.completed && isAdmin(this.props.user))
                                ? <div className='btn btn-outline-danger mr-4 align-self-center'
                                    onClick={this.openCancelModal}>
                                    Cancel
                                </div>
                                : ''
                        }
                        {
                            (cart.status === rcartStatus.completed)
                                ? <a href={domainUrl + '/cart/invoice/' + cart._id}
                                     target="_blank"
                                     download={`invoice_${cart.orderId}.pdf`}
                                     className='btn btn-outline-primary mr-4 align-self-center'>
                                    <i className="fa fa-download mr-2" aria-hidden="true"/>
                                    Invoice
                                </a>
                                : ''
                        }
                        {
                            (cart.status === rcartStatus.cancelled && cart.paymentStatus === true && cart.totalCost > 0 && isAdmin(this.props.user))
                                ? <div className='btn btn-outline-primary mr-4 align-self-center'
                                       onClick={this.openRefundModal}>
                                    <i className="fa fa-undo mr-2"></i>
                                    Refund
                                </div>
                                : ''
                        }
                        {
                            (cart.status === rcartStatus.paymentFailed)
                                ? <div className='btn btn-outline-primary mr-4 align-self-center'
                                    onClick={() => this.redirect(cart._id)}>
                                    <i className="fa fa-redo" />
                                    Retry
                                </div>
                                : ''
                        }
                    </div>
                    <CourierForm visible={this.state.isCourierDetailsModalOpen}
                        closeModal={this.closeCourierDetailsModal}
                        onSubmit={this.completeOrder} />
                    <OrderStatusBar status={cart.status}
                        user={this.props.user}
                        statusChangeTime={cart.statusChangeTime}
                        openPaymentCodeModal={this.openPaymentCodeModal}
                        openCollectionCodeModal={this.openCollectionCodeModal}
                        openCourierDetailsModal={this.openCourierDetailsModal}
                        isDelivery={delivery} />
                    <ServiceList cart={cart}
                                 collectionType={cart.collectionType}
                                 user={this.props.user}
                                 getCart={this.getCart}/>
                    <ErrorMessage message={this.state.errorMessage} clearMessage={this.cleanErrorMessage}/>
                    <div className="total-price">
                        <div><span className={'total'}>Total: ₹ </span><span
                            className='price'>{cart.totalCost}</span></div>
                    </div>
                    <hr />
                    <div className='d-flex'>
                        <div className='w-50' style={{"border":"2px solid #343a40", "borderRadius":"4px"}}>
                            <div className='container p-3'>
                                <h5 className="position_head">COLLECTION INFORMATION</h5>

                                <TextInfoMod lable="Collection Type" data={cart.collectionType.name}/>
                                {
                                    delivery
                                        ? <DeliveryInfo delivery={delivery} />
                                        : <PickupInfo pickup={pickup} />
                                }
                            </div>
                        </div>
                        <PaymentInfo cart={cart}
                            openModal={this.openPaymentFailHistoryModal}
                            closeModal={this.closePaymentFailHistoryModal}
                            visible={this.state.isPaymentFailHistoryModalOpen} />
                    </div>
                    <TextInput visible={this.state.isCancelModalOpen}
                        text={'Enter Reason For Cancellation'}
                        closeModal={this.closeCancelModal}
                        onSubmit={this.cancelCart} />
                    <TextInput visible={this.state.isCollectionCodeModalOpen}
                               text={'Enter Collection Code'}
                               errorMessage={this.state.isCollectionCodeWrong ? collectionCode.wrong : ''}
                               closeModal={this.closeCollectionCodeModal}
                               onSubmit={this.compareCollectionCode}/>
                    <TextInput visible={this.state.isPaymentCodeModalOpen}
                        text={'Enter Payment Code'}
                        errorMessage={this.state.isPaymentCodeWrong ? paymentCode.wrong : ''}
                        onSubmit={this.makePayment}
                        closeModal={this.closePaymentCodeModal} />
                    <ConfirmModal open={this.state.isRefundModalOpen}
                        onYes={this.giveRefund}
                        close={this.closeRefundModal}
                        message={modalMessages.refundCart} />
                </div>
            </div>
        );
    }
}

export default withRouter(OrderInfo);
