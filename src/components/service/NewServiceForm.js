import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {DEBITCARD, NETBANKING, OFFLINE, PAYTM} from "../../constants/PaymentMode"
import {withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import {syncFetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import {collectionType} from "../../test/CollectionType";
import {getServiceFromState, handleArrayUpdate, handleChange, handlePaymentModeChange} from "../../helper/StateUpdate"
import Form from "./Form";
import Spinner from "../Spinner";

class NewServiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            name: '',
            description: '',
            maxUnits: '',
            baseCharge: '',
            paymentModes: {
                [OFFLINE]: true,
                [DEBITCARD]: true,
                [NETBANKING]: true,
                [PAYTM]: true
            },
            collectionType: syncFetch("collectionType"),
            parameter: syncFetch("parameter")
        }
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
    }

    addService = () => {
        const that = this;
        this.setState({
            showSpinner: true
        })
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
            that.setState({
                showSpinner: true
            })
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
                          handlePaymentModeChange={this.handlePaymentModeChange}/>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default withRouter(NewServiceForm);

