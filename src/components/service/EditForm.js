import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import PaymentModes from './PaymentModes'
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import {fetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import MultiSelectDropDownControled from "./MultiSelectDropDownControled";
import {collectionType} from "../../test/CollectionType";
import {getServiceFromState, handleArrayUpdate, handleChange, handlePaymentModeChange} from "../../helper/StateUpdate"

class EditForm extends Component {
    constructor(props) {
        super(props);
        if (props.location.state) {
            this.service = props.location.state.service;
            this.state = {
                name: this.service.name,
                description: this.service.description,
                maxUnits: this.service.maxUnits,
                baseCharge: this.service.baseCharge,
                paymentModes: this.service.paymentModes,
                collectionType: this.service.collectionTypes,
                parameter: this.service.availableParameters
            }
        }
        this.fetch = fetch.bind(this);
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
        this.fetch("collectionType");
        this.fetch("parameter");
    }


    updateService = () => {
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
            ;
        };
        request.send(JSON.stringify(this.getServiceFromState()));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateService()
    }


    render() {
        if (this.props.location.state) {
            const {collectionType, parameter} = this.state
            return (
                <div>
                    <NavigationBar/>
                    <Header title={"Edit Service"}/>
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
        }else{
          return <Redirect to={{
                pathname: "/service"
            }}/>
        }
    }
}

export default withRouter(EditForm);

