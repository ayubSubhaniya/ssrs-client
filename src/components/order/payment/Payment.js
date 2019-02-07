import React from 'react'
import NavigationBar from "../../NavigationBar";
import Stapes from "../../service/Stapes";
import {errorMessages, infoMessages} from "../../../config/configuration";
import * as HttpStatus from "http-status-codes";
import CartDetails from "./CartDetails";
import ErrorMessage from "../../error/ErrorMessage";
import {paymentMode} from '../../../constants/constants'
import {payOffline, payOnline} from "../../../helper/FetchData";
import {Redirect} from "react-router-dom";
import {withAlert} from 'react-alert';

class Payment extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: "0",
            isPaymentDone: false,
            errorMessage: ''
        };
        this.payOnline = payOnline.bind(this);
        this.payOffline = payOffline.bind(this);
        const path = props.location.pathname.split('/');
        this.id = path.length>2 ? path[2] : '';
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


    render() {
        if (this.state.isPaymentDone) {
            this.props.alert.success(infoMessages.orderPlaced);
            return (
                <Redirect to={{
                    pathname: "/order",
                }}/>
            )
        }
        return (
            <div>
                <NavigationBar/>
                <div className={'container'}>
                    <Stapes active={3}/>
                    <CartDetails/>
                    
                    <ErrorMessage message={this.state.errorMessage} clearMessage={this.cleanErrorMessage}/>
                    <div className={'payment-operation'}>
                        <div className="bank-title">
                            <div className="title-wrap">
                                <strong><h4 className="title">Available Payment Methods</h4></strong>
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
                            </div>
                            <div className='payment-method-body'>
                                <div className={`${this.state.paymentType !== "0" ? 'd-none' : ''}`}>
                                    <button className="btn btn-outline-primary btn-lg m-4" onClick={() => this.payOffline(this.id)}>
                                        {"Pay Offline"}
                                    </button>
                                </div>
                                <div className={`${this.state.paymentType !== "1" ? 'd-none' : ''}`}>
                                    <button className="btn btn-outline-primary btn-lg m-4" onClick={() => this.payOnline(this.id)}>
                                        {"Pay with Eazypay"}
                                    </button>

                                    <p className="ml-4" style={{"fontStyle": "italic", "fontSize":"12px"}}>
                                        {"(Note: Do not use "}
                                        <strong>{"back/refresh"}</strong>
                                        {" button once you select this option.)"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAlert(Payment)
