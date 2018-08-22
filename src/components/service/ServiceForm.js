import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {COD, DEBITCARD, NETBANKING, PAYTM} from "../../constants/PaymentMode"
import CheckboxMultiSelect from "./CheckboxMultiSelect"
import _ from 'lodash'
import '../../styles/service.css'
import PaymentModes from './PaymentModes'
import {withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import {fetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";

class ServiceForm extends Component {
    constructor(props) {
        super(props);
        const service = props.location.state ? props.location.state.service : undefined;
        this.serviceId = service ? service._id : undefined;
        if (!service && props.location.pathname == ('/service/edit')) {
            props.history.push('/service');
        }

        const defaultState = {
            name: '',
            description: '',
            maxUnits: '',
            baseCharge: '',
            paymentModes: [COD, DEBITCARD, NETBANKING, PAYTM],
            collectionType: [],
            parameter: [],
            other: {
                currentCollectionType: [],
                currentAvailableParameters: []
            }
        }
        this.state = service ? {
                name: service.name,
                description: service.description,
                maxUnits: service.maxUnits,
                baseCharge: service.baseCharge,
                paymentModes: this.changePaymentModeObjectToArray(service.paymentModes),
                collectionType: service.collectionType,
                parameter: service.parameter,
                other: {
                    currentCollectionType: [],
                    currentAvailableParameters: []
                }
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
    handlePaymentModeChange = (event) => {
        this.setState({
            paymentModes: event
        });
    }

    changePaymentModeArrayToObject = (paymentModesArray) => {
        return Object.assign({}, {
            [COD]: false,
            [PAYTM]: false,
            [DEBITCARD]: false,
            [NETBANKING]: false
        }, _.zipObject(paymentModesArray, _.map(paymentModesArray, () => true)));
    }

    changePaymentModeObjectToArray = (paymentModesObject) => {
        return _.keys(_.pickBy(paymentModesObject));
    }

    filterObjectWithNameInArray = (object, array) => {
        return _.pickBy(object, (value) => {
            if (_.some(array, (o) => o === value.name)) {
                return true;
            }
            return false;
        })
    }

    getServiceFromState() {
        const {other, ...service} = this.state;
        service.paymentModes = Object.assign({}, this.changePaymentModeArrayToObject(service.paymentModes));
        service.collectionTypes = _.map(this.filterObjectWithNameInArray(this.state.collectionType, this.state.other.currentCollectionType), '_id');
        service.availableParameters = _.map(this.filterObjectWithNameInArray(this.state.parameter, this.state.other.currentAvailableParameters), '_id');
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
            ;
        };
        request.send(JSON.stringify(this.getServiceFromState()));
    }

    updateService = () => {
        const that = this;
        const url = domainUrl + '/service/' + this.serviceId;
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
        if (this.serviceId) {
            this.updateService()
        } else {
            this.addService()
        }
    }

    getCollectionTypeToggledList = (value) => {
        const index = _.indexOf(this.state.other.currentCollectionType, value);
        if (index > -1) {
            return _.difference(this.state.other.currentCollectionType, [value]);
        }
        return _.concat(this.state.other.currentCollectionType, [value]);
    }

    handleCollectionTypeChange = ({target}) => {
        this.setState({
            other: Object.assign({}, this.state.other, {currentCollectionType: this.getCollectionTypeToggledList(target.dataset.name)})
        })
    }

    getParamterToggledList = (value) => {
        const index = _.indexOf(this.state.other.currentAvailableParameters, value);
        if (index > -1) {
            return _.difference(this.state.other.currentAvailableParameters, [value]);
        }
        return _.concat(this.state.other.currentAvailableParameters, [value]);
    }

    handleAvailabelParametersChange = ({target}) => {
        this.setState({
            other: Object.assign({}, this.state.other, {currentAvailableParameters: this.getParamterToggledList(target.dataset.name)})
        })
    }


    render() {
        const {collectionType, parameter} = this.state
        return (
            <div>
                <NavigationBar/>
                <Header title={this.props.title}/>
                <div className="container container-custom">
                    <form autoComplete="on" onSubmit={this.handleSubmit}>
                        <div className="form-group col-sm-6">
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
                        <div className="form-group col-sm-6">
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
                        <div className="form-group col-sm-12">
                            <label>Service Description</label>
                            <textarea
                                className={'form-control'}
                                name="description"
                                placeholder="Write Service Description"
                                value={this.state.description}
                                onChange={this.handleChange}>
                            </textarea>
                        </div>
                        <div className="form-group col-sm-6">
                            <label>Maximum Unit</label>
                            <input
                                className={'form-control'}
                                type="number"
                                min={'0'}
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

                        <CheckboxMultiSelect
                            label={'Collection Type'}
                            collectionType={collectionType}
                            currentValues={this.state.other.currentCollectionType}
                            handleChange={this.handleCollectionTypeChange}/>
                        <CheckboxMultiSelect
                            label={'Parameters'}
                            collectionType={parameter}
                            currentValues={this.state.other.currentAvailableParameters}
                            handleChange={this.handleAvailabelParametersChange}/>
                        <input
                            className='submit'
                            type="submit"
                            value="Save"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(ServiceForm);

