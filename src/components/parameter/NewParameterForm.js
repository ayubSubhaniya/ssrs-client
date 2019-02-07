import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {handleChange} from "../../helper/StateUpdate";
import ParameterForm from "./ParameterForm";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

class NewParameterForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
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
        makeCall({
            jobType: 'POST',
            urlParams: '/parameter/',
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
            </div>
        );
    }
}

export default withRouter(NewParameterForm);

