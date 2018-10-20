import React, {Component} from 'react';
import {OFFLINE, ONLINE} from "../../constants/PaymentMode"
import {withRouter} from "react-router-dom";
import Header from "../Header";
import {syncFetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import {collectionType} from "../../test/CollectionType";
import {getServiceFromState, handleArrayUpdate, handleChange, handlePaymentModeChange} from "../../helper/StateUpdate"
import Form from "./Form";
import {makeCall} from "../../helper/caller";

class NewServiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            maxUnits: '',
            baseCharge: '',
            paymentModes: {
                [OFFLINE]: true,
                [ONLINE]: true
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
        makeCall({
            jobType: 'POST',
            urlParams: '/service/',
            params: this.getServiceFromState()
        })
            .then(response => this.props.history.push('/service'))
            .catch((error) => {
                console.log(error.statusText);
            });
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
            </div>
        );
    }
}

export default withRouter(NewServiceForm);

