import React from 'react'
import NavigationBar from "../../NavigationBar";
import Stapes from "../../service/Stapes";
import {Link, Redirect} from "react-router-dom";
import {domainUrl} from "../../../config/configuration";
import HttpStatus from "http-status-codes";
import {asyncFetch} from "../../../helper/FetchData";
import CartDetails from "./CartDetails";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentType: 0,
            isPaymentDone: false
        };
    }

    getPaymentDetails = (state) => {
        const paymentDetails = {
            paymentType: state.paymentType,
        };
        return paymentDetails;
    };

    pay = () => {
        const that = this;
        const url = domainUrl + '/cart/addPayment';
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                console.log(response);
                that.setState({
                    isPaymentDone: true
                });
            }
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
