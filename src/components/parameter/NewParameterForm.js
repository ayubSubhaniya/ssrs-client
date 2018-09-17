import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import NavigationBar from "../NavigationBar";
import Spinner from "../Spinner";
import {handleChange} from "../../helper/StateUpdate";
import ParameterForm from "./ParameterForm";

class NewParameterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSpinner: false,
            name: '',
            description: '',
            baseCharge: '',
        };
        this.handleChange = handleChange.bind(this);
    }

    getParameterFromState = () => {
        return {
            name: this.state.name,
            description: this.state.description,
            baseCharge: this.state.baseCharge,
        };
    };


    addParameter = () => {
        this.setState({
            showSpinner: true
        })
        const that = this;
        const url = domainUrl + '/parameter/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.CREATED) {
                const response = JSON.parse(request.response)

                that.props.history.push('/parameter');
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify(this.getParameterFromState()));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.addParameter()
    }


    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={"Add New Parameter"}/>
                <div className="container container-custom">
                    <ParameterForm state={this.state}
                                   handleChange={this.handleChange}
                                   handleSubmit={this.handleSubmit}/>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default withRouter(NewParameterForm);

