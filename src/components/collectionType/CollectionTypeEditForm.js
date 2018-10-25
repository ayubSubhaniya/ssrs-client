import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {handleChange} from "../../helper/StateUpdate";
import CollectionTypeForm from "./CollectionTypeForm";
import {makeCall} from "../../helper/caller";

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
        makeCall({
            jobType: 'PATCH',
            urlParams: '/collectionType/' + this.collectionType._id,
            params: this.getCollectionTypeFromState()
        })
            .then(() => {
                this.props.history.push('/collectionType');
            })

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

