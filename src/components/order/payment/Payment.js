import React from 'react'
import NavigationBar from "../../NavigationBar";
import Stapes from "../../service/Stapes";
import {Link, Redirect} from "react-router-dom";
import {domainUrl, errorMessages} from "../../../config/configuration";
import * as HttpStatus from "http-status-codes";
import {asyncFetch} from "../../../helper/FetchData";
import CartDetails from "./CartDetails";
import Spinner from "../../Spinner";
import ErrorMessage from "../../error/ErrorMessage";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            paymentType: 0,
            isPaymentDone: false,
            errorMessage: '',
        };
    }

    getPaymentDetails = (state) => {
        const paymentDetails = {
            paymentType: state.paymentType,
        };
        return paymentDetails;
    };

    cleanErrorMessage=()=>{
        this.setState({
            errorMessage:''
        })
    };

    pay = () => {
        const that = this;
        that.setState({
            showSpinner : true
        });
        const url = domainUrl + '/cart/addPayment';
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                that.setState({
                    isPaymentDone: true
                });
            } else if (this.status === HttpStatus.PRECONDITION_FAILED){
                that.setState({
                    errorMessage: request.responseText
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR){
                that.setState({
                    errorMessage: errorMessages.internalServerError
                })
            } else if (this.status === HttpStatus.FORBIDDEN){
                that.setState({
                    errorMessage: errorMessages.forbidden
                })
            } else if (this.status === HttpStatus.NOT_FOUND){
                that.setState({
                    errorMessage: "cart not found"
                })
            } else if (this.status === HttpStatus.BAD_REQUEST){
                that.setState({
                    errorMessage: request.responseText
                })
            } else {
                that.setState({
                    errorMessage: errorMessages.somethingsWrong
                })
            }
            that.setState({
                showSpinner : true
            });
        };

        request.send(JSON.stringify(this.getPaymentDetails(this.state)));
    };

    render() {
        if (this.state.isPaymentDone) {
            return (
                <Redirect to={{
                    pathname: "/order"
                }}/>
            )
        }
        return (
            <div>
                <NavigationBar/>
                <div className={'container'}>
                    <Stapes active={3}/>
                    <CartDetails/>
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
                                <div className='tab-payment'>Offline</div>
                                <div className='tab-payment'>Debit Card</div>
                                <div className='tab-payment tab-payment-active'>Net Banking</div>
                                <div className='tab-payment'>Paytm</div>
                            </div>
                            <div className='payment-method-body'>
                                <div className="btn btn-success m-4 p-4" onClick={this.pay}>
                                    {"Pay "}
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
