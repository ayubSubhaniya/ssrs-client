import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import NavigationBar from "../NavigationBar";
import Spinner from "../Spinner";
import {handleChange} from "../../helper/StateUpdate";
import CollectionTypeForm from "./CollectionTypeForm";

class NewCollectionTypeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSpinner: false,
            name: '',
            description: '',
            baseCharge: '',
            category: '',
        };
        this.handleChange = handleChange.bind(this);
    }

    handleCategoryChange = (e) => {
        this.setState({
            category: e.target.value
        });
    };

    getCollectionTypeFromState = () => {
        return {
            name: this.state.name,
            description: this.state.description,
            baseCharge: this.state.baseCharge,
            category: this.state.category,
        };
    };


    addCollectionType = () => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/collectionType/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.CREATED) {
                const response = JSON.parse(request.response)

                that.props.history.push('/collectionType');
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify(this.getCollectionTypeFromState()));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.addCollectionType()
    }


    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={"Add New CollectionType"}/>
                <div className="container container-custom">
                    <CollectionTypeForm state={this.state}
                                        handleChange={this.handleChange}
                                        handleSubmit={this.handleSubmit}
                                        handleCategoryChange={this.handleCategoryChange}/>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default withRouter(NewCollectionTypeForm);

