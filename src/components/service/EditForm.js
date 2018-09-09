import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import {syncFetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import {collectionType} from "../../test/CollectionType";
import {getServiceFromState, handleArrayUpdate, handleChange, handlePaymentModeChange} from "../../helper/StateUpdate"
import Form from "./Form";
import _ from "lodash"
import Spinner from "../Spinner";

function setSelecteProperty(arr1, arr2) {
    return _.map(arr1, (x) => {
        if (_.some(arr2, (o) => o._id === x._id))
            x.isSelected = true
        return x;
    })
}


class EditForm extends Component {
    constructor(props) {
        super(props);
        if (!props.location.state) {
            return;
        }
        const allCollectionTypes = syncFetch('collectionType');
        const allParameters = syncFetch("parameter");

        this.service = props.location.state.service;
        this.state = {
            showSpinner: false,
            name: this.service.name,
            description: this.service.description,
            maxUnits: this.service.maxUnits,
            baseCharge: this.service.baseCharge,
            paymentModes: this.service.paymentModes,
            collectionType: setSelecteProperty(allCollectionTypes, this.service.collectionTypes),
            parameter: setSelecteProperty(allParameters,this.service.availableParameters)
        }
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
    }


    updateService = () => {
        this.setState({
            showSpinner: true
        })
        const that = this;
        const url = domainUrl + '/service/' + this.service._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                const response = JSON.parse(request.response)
                console.log(response);
                that.props.history.push('/service');
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify(this.getServiceFromState()));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateService()
    }


    render() {
        if (this.props.location.state) {
            return (
                <div>
                    <NavigationBar/>
                    <Header title={"Edit Service"}/>
                    <div className="container container-custom">
                        <Form state={this.state}
                              handleChange={this.handleChange}
                              handleArrayUpdate={this.handleArrayUpdate}
                              handleSubmit={this.handleSubmit}
                              handleSubmit={this.handleSubmit}
                              handlePaymentModeChange={this.handlePaymentModeChange}/>
                    </div>
                    <Spinner open={this.state.showSpinner}/>
                </div>
            );
        } else {
            return <Redirect to={{
                pathname: "/service"
            }}/>
        }
    }
}

export default withRouter(EditForm);

