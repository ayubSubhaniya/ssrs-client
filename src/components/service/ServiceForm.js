import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {ButtonToolbar, ToggleButtonGroup, ToggleButton, DropdownButton, Checkbox} from 'react-bootstrap'
import {COD, PAYTM, DEBITCARD, NETBANKING} from "../../constants/PaymentMode"
import CheckboxMultiSelect from "./CheckboxMultiSelect"
import _ from 'lodash'
import '../../styles/service.css'
import PaymentModes from './PaymentModes'
import {
    withRouter
} from "react-router-dom";
import Header from "../Header";

/*
collectionType = [
            {
                "_id": "5b680b0609940b21b0da28ff",
                "baseCharge": 100,
                "name": "Sealed Envelop",
                "description": "Document in sealed envelop",
                "createdOn": "2018-08-06T08:47:02.500+0000",
                "createdBy": 201501433,
            }
        ]
 */

class ServiceForm extends Component {
    constructor(props) {
        super(props);
        const service = props.location.state ? props.location.state.service : undefined;
        this.serviceId = service._id;
        console.log(props.location)
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
        this.fetch("collectionType");
        this.fetch("parameter");
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handlemaxUnitsChange = (event) => {
        this.setState({
            maxUnits: event.target.value
        })
    }
    handlebaseChargeChange = (event) => {
        this.setState({
            baseCharge: event.target.value
        })
    }
    handlePaymentModeChange = (event) => {
        this.setState({
            paymentModes: event
        });
    }


    fetch(dataName) {
        const that = this;
        const url = domainUrl + '/' + dataName
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 202) {
                try {
                    const obj = JSON.parse(request.responseText);
                    console.log(obj);
                    that.setState({
                        [dataName]: obj[dataName]
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            ;
        };
        request.send();
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
        delete service.collectionType;``
        console.log(service);
        return service;
    }

    addService(){

    }

    handleSubmit = (event) => {
        const that = this;
        event.preventDefault();
        const url = domainUrl + '/service/'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == 201) {
                const response = JSON.parse(request.response)
                console.log(response);
                that.props.history.push('/service');
            }
            ;
        };
        request.send(JSON.stringify(this.getServiceFromState()));
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
                <Header title={this.props.title}/>
                <div className="service-form-container">
                    <form autoComplete="on" className={'service-form'} onSubmit={this.handleSubmit}>
                        <div className={'dual margin-b'}>
                            <div className={'field margin-r'}>
                                <label>Service Name</label>
                                <input
                                    className={'input'}
                                    type="text"
                                    name="serviceName"
                                    placeholder="Enter Service Name"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}/>
                            </div>
                            <div
                                className={'field'}>
                                <label>
                                    Base Charge
                                </label>
                                <input
                                    className={'input'}
                                    type="text"
                                    name="baseCharge"
                                    placeholder="Enter Amount (₹)"
                                    value={this.state.baseCharge}
                                    onChange={this.handlebaseChargeChange}
                                />
                            </div>
                        </div>
                        <div className={'field margin-b'}>
                            <label>
                                Service Description
                            </label>
                            <textarea
                                className={'input'}
                                name="subject"
                                placeholder="Write Service Description"
                                value={this.state.description}
                                onChange={this.handleDescriptionChange}>
                            </textarea>
                        </div>
                        <div className={'field margin-b width-half'}>
                            <label>Maximum Unit</label>
                            <input
                                className={'input'}
                                type="text"
                                name="firstname"
                                placeholder="Enter Maximum Allowed Unit"
                                value={this.state.maxUnits}
                                onChange={this.handlemaxUnitsChange}/>
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

                        <div className={'field margin-t'}>
                            <input
                                className='submit'
                                type="submit"
                                value="Save"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(ServiceForm);

