import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import * as HttpStatus from "http-status-codes";
import NavigationBar from "../NavigationBar";
import Spinner from "../Spinner";
import {handleChange} from "../../helper/StateUpdate";
import CollectionTypeForm from "./CollectionTypeForm";

class CollectionTypeEditForm extends Component {
    constructor(props) {
        super(props);
        if (!props.location.state) {
            return;
        }

        this.collectionType = props.location.state;
        this.state = {
            showSpinner: false,
            name: this.collectionType.name,
            description: this.collectionType.description,
            baseCharge: this.collectionType.baseCharge,
            category: this.collectionType.category,
        };
        this.handleChange = handleChange.bind(this);
    };

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


    updateCollectionType = () => {
        this.setState({
            showSpinner: true
        })
        const that = this;
        const url = domainUrl + '/collectionType/' + this.collectionType._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
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
        this.updateCollectionType()
    }


    render() {
        if (this.props.location.state) {
            return (
                <div>
                    <NavigationBar/>
                    <Header title={"Edit CollectionType"}/>
                    <div className="container container-custom">
                        <CollectionTypeForm state={this.state}
                                            handleChange={this.handleChange}
                                            handleSubmit={this.handleSubmit}
                                            handleCategoryChange={this.handleCategoryChange}/>
                    </div>
                    <Spinner open={this.state.showSpinner}/>
                </div>
            );
        } else {
            return <Redirect to={{
                pathname: "/collectionType"
            }}/>
        }
    }
}

export default withRouter(CollectionTypeEditForm);

