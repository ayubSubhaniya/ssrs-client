import React, {PureComponent} from 'react';
import {withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {handleChange} from "../../helper/StateUpdate";
import CollectionTypeForm from "./CollectionTypeForm";
import {collectionTypeCategory} from "../../constants/constants";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

class NewCollectionTypeForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            baseCharge: '',
            category: collectionTypeCategory.PICKUP,
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
        makeCall({
            jobType: 'POST',
            urlParams: '/collectionType/',
            params: this.getCollectionTypeFromState()
        })
            .then(() => {
                this.props.history.push('/collectionType');
            })
            .catch((error) => {
                handleError(error);
            })
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
            </div>
        );
    }
}

export default withRouter(NewCollectionTypeForm);

