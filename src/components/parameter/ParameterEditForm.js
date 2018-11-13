import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {handleChange} from "../../helper/StateUpdate";
import ParameterForm from "./ParameterForm";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

class ParameterEditForm extends Component {
    constructor(props) {
        super(props);
        if (!props.location.state) {
            return;
        }

        this.parameter = props.location.state;
        this.state = {
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
        makeCall({
            jobType: 'PATCH',
            urlParams: '/parameter/' + this.parameter._id,
            params: this.getParameterFromState()
        })
            .then(() => {
                this.props.history.push('/parameter');
            })
            .catch((error) => {
                handleError(error);
            })
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

