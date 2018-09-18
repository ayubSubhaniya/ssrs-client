import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import NavigationBar from "../NavigationBar";
import Spinner from "../Spinner";
import {handleChange} from "../../helper/StateUpdate";
import ParameterForm from "./ParameterForm";

class ParameterEditForm extends Component {
    constructor(props) {
        super(props);
        if (!props.location.state) {
            return;
        }

        this.parameter = props.location.state;
        this.state = {
            showSpinner: false,
            name: this.parameter.name,
            description: this.parameter.description,
            baseCharge: this.parameter.baseCharge,
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


    updateParameter = () => {
        this.setState({
            showSpinner: true
        })
        const that = this;
        const url = domainUrl + '/parameter/' + this.parameter._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
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
        this.updateParameter()
    }


    render() {
        if (this.props.location.state) {
            return (
                <div>
                    <NavigationBar/>
                    <Header title={"Edit Parameter"}/>
                    <div className="container container-custom">
                        <ParameterForm state={this.state}
                              handleChange={this.handleChange}
                              handleSubmit={this.handleSubmit}/>
                    </div>
                    <Spinner open={this.state.showSpinner}/>
                </div>
            );
        } else {
            return <Redirect to={{
                pathname: "/parameter"
            }}/>
        }
    }
}

export default withRouter(ParameterEditForm);

