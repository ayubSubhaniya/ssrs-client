import React from 'react'
import NavigationBar from "../../NavigationBar";
import Stapes from "../../service/Stapes";
import {Redirect} from "react-router-dom";
import {errorMessages} from "../../../config/configuration";
import * as HttpStatus from "http-status-codes";
import CartDetails from "./CartDetails";
import ErrorMessage from "../../error/ErrorMessage";
import {DEBITCARD, NETBANKING, PAYTM, OFFLINE, ONLINE, paymentMode} from '../../../constants/constants'
import {makeCall} from "../../../helper/caller";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            paymentType: "0",
            isPaymentDone: false,
            errorMessage: '',
        };
    }

    changePaymentType = ({target}) => {
        this.setState({
            paymentType: target.dataset.type
        })
    }

    getPaymentDetails = (state) => {
        const paymentDetails = {
            paymentType: paymentMode[state.paymentType],
        };
        return paymentDetails;
    };

    cleanErrorMessage = () => {
        this.setState({
            errorMessage: ''
        })
    };

    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        })
    }

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
    }

    payOffline = () => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/cart/addPayment',
            params: {
                paymentType: OFFLINE
            }
        })
            .then((response) => {
                this.setState({
                    isPaymentDone: true
                });
            })
            .catch((error) => this.onError(error))
    };

    payOnline = () => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/cart/addPayment',
            params: {
                paymentType: ONLINE
            }
        })
            .then((response) => {
                this.setState({
                    isPaymentDone: true
                });
            })
            .catch((error) => this.onError(error))
    };

    render() {
        if (this.state.isPaymentDone) {
            return (
                <Redirect to={{
                    pathname: "/order"
                }}/>
            )
        }
        const collectionType = this.props.location.state;
        return (
            <div>
                <NavigationBar/>
                <div className={'container'}>
                    <Stapes active={3}/>
                    <CartDetails collectionType={collectionType}/>
                    <hr/>
                    <ErrorMessage message={this.state.errorMessage} clearMessage={this.cleanErrorMessage}/>
                    <div className={'payment-operation'}>
                        <div className="bank-title">
                            <div className="title-wrap">
                                <h2 className="title">Choose your payment method</h2>
                            </div>
                        </div>
                        <div className='payment'>
                            <div className='payment-method-tabs'>
                                <div data-type="0"
                                     onClick={this.changePaymentType}
                                     className={`tab-payment ${this.state.paymentType === "0" ? 'tab-payment-active' : ''}`}>{"Offline"}
                                </div>
                                <div data-type="1"
                                     onClick={this.changePaymentType}
                                     className={`tab-payment ${this.state.paymentType === "1" ? 'tab-payment-active' : ''}`}>
                                    {"Online"}
                                </div>
                                <div data-type="2"
                                     onClick={this.changePaymentType}
                                     className={`tab-payment ${this.state.paymentType === "2" ? 'tab-payment-active' : ''}`}>Net
                                    Banking
                                </div>
                                <div data-type="3"
                                     onClick={this.changePaymentType}
                                     className={`tab-payment ${this.state.paymentType === "3" ? 'tab-payment-active' : ''}`}>Paytm
                                </div>
                            </div>
                            <div className='payment-method-body'>
                                <div className={`${this.state.paymentType !== "0" ? 'd-none' : ''}`}>
                                    <div className="btn btn-success m-4 p-4" onClick={this.payOffline}>
                                        {"Pay Offline"}
                                    </div>
                                   </div>
                                <div className={`${this.state.paymentType !== "1" ? 'd-none' : ''}`}>
                                    <div className="btn btn-success m-4 p-4" onClick={this.payOnline}>
                                        {"Pay Online    "}
                                    </div>
                                </div>
                                <div className={`${this.state.paymentType !== "2" ? 'd-none' : ''}`}>
                                    {NETBANKING}
                                </div>
                                <div className={`${this.state.paymentType !== "3" ? 'd-none' : ''}`}>
                                    {DEBITCARD}
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment
