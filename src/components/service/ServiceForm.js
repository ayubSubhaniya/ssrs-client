import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {ButtonToolbar, ToggleButtonGroup, ToggleButton, DropdownButton, Checkbox} from 'react-bootstrap'
import {COD, PAYTM, DEBITCARD, NETBANKING} from "../../constants/PaymentMode"
import CheckboxMultiSelect from "./CheckboxMultiSelect"
import _ from 'lodash'
import '../../styles/service.css'
import {Service} from "../../test/Services";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
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
        const service = props.location.state?props.location.state.service:undefined;
        console.log(props.location)
        if(!service && props.location.pathname==('/service/edit')){
            props.history.push('/service');
        }
        this.paymentMode = {
            [COD]: false,
            [PAYTM]: false,
            [DEBITCARD]: false,
            [NETBANKING]: false
        }
        const defaultState = {
            name:'',
            description: '',
            maxUnits: '',
            baseCharge: '',
            paymentMode: [COD, DEBITCARD, NETBANKING, PAYTM],
            collectionType: [],
            parameter: []
        }
        this.state = service ? {
            _id: service._id,
            name:service.name,
            description: service.description,
            maxUnits: service.maxUnits,
            baseCharge: service.baseCharge,
            paymentMode: this.changePaymentModeObjectToArray(service.paymentMode),
            collectionType: service.collectionType,
            parameter: service.parameter
        }
        : defaultState;
        this.fetchCollectioType();
        this.fetchParameter();
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
            paymentMode: event
        });
    }
    fetchCollectioType = () => {
        const that = this;
        const url = domainUrl + '/collectionType'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 202) {
                try {
                    const obj = JSON.parse(request.responseText);
                    that.setState({
                        collectionType: obj
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            ;
        };
        request.send();
    }

    fetchParameter = () => {
        const that = this;
        const url = domainUrl + '/parameter'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == 202) {
                try {
                    const obj = JSON.parse(request.responseText);
                    that.setState({
                        parameter: obj
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            ;
        };
        request.send();
    }

    changePaymentModeArrayToObject = (paymentModeArray) => {
        return Object.assign({}, this.paymentMode, _.zipObject(paymentModeArray, _.map(paymentModeArray, () => true)));
    }

    changePaymentModeObjectToArray = (paymentModeObject) => {
        return _.keys(_.pickBy(paymentModeObject));
    }


    getServiceFromState() {
        var service = Object.assign({}, this.state);
        service.paymentMode = Object.assign({}, this.changePaymentModeArrayToObject(service.paymentMode));
        return service;
    }

    handleSubmit = (event) => {
        // this.props.history.push('/service')
        console.log(this.getServiceFromState());
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
                this.props.history.push('/service');
            }
            ;
        };
        request.send(JSON.stringify(this.getServiceFromState()));
    }

    render() {
        const {collectionType, parameter} = this.state
        return (
            <div>
                <Header title={this.props.title}/>
                <div className="service-form-container">
                    <form className={'service-form'} onSubmit={this.handleSubmit}>
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
                        <div className={'dual margin-b'}>
                            <div className={'field margin-r'}>
                                <label>Maximum Unit</label>
                                <input
                                    className={'input'}
                                    type="text"
                                    name="firstname"
                                    placeholder="Enter Maximum Allowed Unit"
                                    value={this.state.maxUnits}
                                    onChange={this.handlemaxUnitsChange}/>
                            </div>
                        </div>

                        <div
                            className={'field margin-b'}>
                            <label>
                                Payment Mode
                            </label>
                            <ButtonToolbar>
                                <ToggleButtonGroup
                                    type="checkbox"
                                    defaultValue={this.state.paymentMode}
                                    onChange={this.handlePaymentModeChange}>
                                    <ToggleButton
                                        value={COD}>
                                        Cash(Offline)
                                    </ToggleButton>
                                    <ToggleButton
                                        value={DEBITCARD}>
                                        Debit Card
                                    </ToggleButton>
                                    <ToggleButton
                                        value={NETBANKING}>
                                        Netbanking
                                    </ToggleButton>
                                    <ToggleButton
                                        value={PAYTM}>
                                        Paytm
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </ButtonToolbar>
                        </div>
                        <CheckboxMultiSelect label={'Collection Type'} collectionType={collectionType}/>
                        <CheckboxMultiSelect label={'Parameters'} collectionType={parameter}/>

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

