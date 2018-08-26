import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {COD, DEBITCARD, NETBANKING, PAYTM} from "../../constants/PaymentMode"
import _ from 'lodash'
import PaymentModes from './PaymentModes'
import {withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import {fetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import MultiSelectDropDownControled from "./MultiSelectDropDownControled";
import {collectionType} from "../../test/CollectionType";
import {handleChange, handleArrayUpdate, handlePaymentModeChange, getServiceFromState} from "../../helper/StateUpdate"

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
        const {collectionType, parameter} = this.state
        return (
            <div>
                <NavigationBar/>
                <Header title={"Add New Service"}/>
                <div className="container container-custom">
                    <form autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Service Name</label>
                                <input
                                    className={'form-control'}
                                    type="text"
                                    name="name"
                                    placeholder="Enter Service Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Base Charge</label>
                                <input
                                    className={'form-control'}
                                    type="text"
                                    name="baseCharge"
                                    placeholder="Enter Amount (₹)"
                                    value={this.state.baseCharge}
                                    onChange={this.handleChange}
                                    required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Service Description</label>
                            <textarea
                                className={'form-control'}
                                name="description"
                                placeholder="Write Service Description"
                                value={this.state.description}
                                onChange={this.handleChange}>
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label>Maximum Unit</label>
                            <input
                                className={'form-control'}
                                type="number"
                                min={'1'}
                                max={'1000'}
                                name="maxUnits"
                                placeholder="Enter Maximum Allowed Unit"
                                value={this.state.maxUnits}
                                onChange={this.handleChange}
                                required/>
                        </div>
                        <PaymentModes
                            paymentModes={this.state.paymentModes}
                            handleChange={this.handlePaymentModeChange}/>
                        <div className="col-sm-6">
                            <MultiSelectDropDownControled label={'Collection Type'}
                                                          btnLabel={"Select"}
                                                          options={collectionType}
                                                          name={'collectionType'}
                                                          handleOptionChange={this.handleArrayUpdate}/>

                            <MultiSelectDropDownControled label={'Parameters'}
                                                          btnLabel={"Select"}
                                                          options={parameter}
                                                          name={'parameter'}
                                                          handleOptionChange={this.handleArrayUpdate}/>
                        </div>
                        <div className={'d-flex justify-content-center mt-4'}>
                            <input
                                className='submit'
                                type="submit"
                                value="Save"
                                onSubmit={this.handleSubmit}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(NewServiceForm);

