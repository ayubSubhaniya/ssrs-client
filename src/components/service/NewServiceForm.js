import React, {Component} from 'react';
import {defaultService} from "../../constants/constants"
import {withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {
    getServiceFromState,
    handleArrayUpdate,
    handleChange,
    handlePaymentModeChange,
    setIsSelected
} from "../../helper/StateUpdate"
import Form from "./Form";
import {makeCall} from "../../helper/caller";
import _ from 'lodash'
import {handleError} from "../../helper/error";
import {errorMessages, infoMessages} from "../../config/configuration";
import {withAlert} from 'react-alert'

class NewServiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = defaultService;
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
    }

    componentDidMount() {
        this.getUserInfoDistinct();
        this.getAllParameter();
        this.getAllCollectionType();
    }

    getAllCollectionType = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/collectionType'
        })
            .then((response) => {
                this.setState({
                    collectionType: response.collectionType
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    getAllParameter = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/parameter'
        })
            .then((response) => {
                this.setState({
                    parameter: response.parameter
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    addService = () => {
        makeCall({
            jobType: 'POST',
            urlParams: '/service/',
            params: this.getServiceFromState()
        })
            .then(() => this.props.history.push('/service'))
            .catch((error) => {
                handleError(error);
            })
    }

    getUserInfoDistinct = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/userInfo/distinct'
        })
            .then((response) => {
                this.setState({
                    batches: _.map(response.batches, (o) => ({name: o, isSelected: true})),
                    userTypes: _.map(response.userTypes, (o) => ({name: o, isSelected: true})),
                    programmes: _.map(response.programmes, (o) => ({name: o, isSelected: true})),
                    userStatus: _.map(response.userStatus, (o) => ({name: o, isSelected: true}))
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.getServiceFromState().collectionTypes.length > 0) {
            this.addService();
            this.props.alert.success(infoMessages.serviceAdded);
        }
        else {
            this.props.alert.error(errorMessages.collectionTypeReq);
        }
    }

    specialServiceFileHandler = (data) => {
        let arr = []
        for (let i=0; i<data.length; i++) {
            if (data[i]['specialServiceUsers'])
                arr.push(data[i]['specialServiceUsers']);
        }

        if (arr.length > 0) {
            arr.sort();
            this.setState({
                specialServiceUsers: arr
            })
            this.props.alert.success('List uploaded successfully.')
        }
        else {
            this.props.alert.error('Error in upload. Please check the file.');
        }
    }

    changeRadioButtonState = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onDeselectAll = ({target}) => {
        this.setState({
            [target.dataset.name]: setIsSelected(this.state[target.dataset.name], false)
        })
    }

    onSelectAll = ({target}) => {
        this.setState({
            [target.dataset.name]: setIsSelected(this.state[target.dataset.name], true)
        })
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
                          onSelectAll={this.onSelectAll}
                          onDeselectAll={this.onDeselectAll}
                          handleSubmit={this.handleSubmit}
                          changeRadioButtonState={this.changeRadioButtonState}
                          specialServiceFileHandler={this.specialServiceFileHandler}
                          handlePaymentModeChange={this.handlePaymentModeChange}/>
                </div>
            </div>
        );
    }
}

export default withAlert(withRouter(NewServiceForm));

