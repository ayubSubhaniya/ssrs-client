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
import MultiSelectDropDown from "./MultiSelectDropDown";
import {collectionType} from "../../test/CollectionType";

class ServiceForm extends Component {
    constructor(props) {
        super(props);
        this.service = props.location.state ? props.location.state.service : undefined;
        if (!this.service && props.location.pathname == ('/service/edit')) {
            props.history.replace('/service');
        }

        console.log(this.service);
        const defaultState = {
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
        this.state = this.service ? {
                name: this.service.name,
                description: this.service.description,
                maxUnits: this.service.maxUnits,
                baseCharge: this.service.baseCharge,
                paymentModes: this.service.paymentModes,
                collectionType: this.service.collectionTypes,
                parameter: this.service.parameter
            }
            : defaultState;
        this.fetch = fetch.bind(this);
        this.fetch("collectionType");
        this.fetch("parameter");
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }
    handlePaymentModeChange = ({target}) => {
        const paymentModes = this.state.paymentModes
        paymentModes[target.name] = !paymentModes[target.name]
        this.setState({
            paymentModes
        });
    }

    handleArrayUpdate = ({target}) => {
        const newArray = this.state[target.name];
        newArray[target.dataset.index].isActive = !newArray[target.dataset.index].isActive
        this.setState({
            [target.name]: newArray
        })
    }
    getServiceFromState() {
        const {other, ...service} = this.state;
        service.collectionTypes = _.map(_.filter(this.state.collectionType, ({isActive}) => isActive), '_id');
        service.availableParameters = _.map(_.filter(this.state.parameter, ({isActive}) => isActive), '_id');
        delete service.parameter;
        delete service.collectionType;
        console.log(service);
        return service;
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
        if (this.service) {
            this.updateService()
        } else {
            this.addService()
        }
    }


    render() {
        const {collectionType, parameter} = this.state
        return (
            <div>
                <NavigationBar/>
                <Header title={this.props.title}/>
                <div className="container bg-light p-5">
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
                            <MultiSelectDropDown label={'Collection Type'}
                                                 btnLabel={"Select"}
                                                 options={collectionType}
                                                 name={'collectionType'}
                                                 handleOptionChange={this.handleArrayUpdate}/>

                            <MultiSelectDropDown label={'Parameters'}
                                                 btnLabel={"Select"}
                                                 options={parameter}
                                                 name={'parameter'}
                                                 handleOptionChange={this.handleArrayUpdate}/>
                        </div>
                        <input
                            className='submit'
                            type="submit"
                            value="Save"
                            onSubmit={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(ServiceForm);

