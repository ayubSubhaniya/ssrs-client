import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {COD, DEBITCARD, NETBANKING, PAYTM} from "../../constants/PaymentMode"
import {withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import {fetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import {collectionType} from "../../test/CollectionType";
import {handleChange, handleArrayUpdate, handlePaymentModeChange, getServiceFromState} from "../../helper/StateUpdate"
import Form from "./Form";

class NewServiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            maxUnits: '',
            baseCharge: '',
            paymentModes: {
                [COD]: true,
                [DEBITCARD]: true,
                [NETBANKING]: true,
                [PAYTM]: true
            },
            collectionType: [],
            parameter: []
        }
        this.fetch = fetch.bind(this);
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
        this.fetch("collectionType");
        this.fetch("parameter");
    }

    addService = () => {
        const that = this;
        const url = domainUrl + '/service/'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.CREATED) {
                const response = JSON.parse(request.response)
                console.log(response);
                that.props.history.push('/service');
            }
        }
        request.send(JSON.stringify(this.getServiceFromState()));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.addService()
    }


    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={"Add New Service"}/>
                <div className="container container-custom">
                    <Form state={this.state}
                          handleChange={this.handleChange}
                          handleArrayUpdate={this.handleArrayUpdate}
                          handleSubmit={this.handleSubmit}
                          handleSubmit={this.handleSubmit}
                          handlePaymentModeChange={this.handlePaymentModeChange} />
                </div>
            </div>
        );
    }
}

export default withRouter(NewServiceForm);

