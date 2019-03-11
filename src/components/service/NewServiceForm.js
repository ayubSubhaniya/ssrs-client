import React, {PureComponent} from 'react';
import {defaultService} from "../../constants/constants"
import {withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {
    getServiceFromState,
    handleArrayUpdate,
    handleChange,
    handlePaymentModeChange,
    setIsSelected,
    specialServiceFileHandler
} from "../../helper/StateUpdate"
import Form from "./Form";
import {makeCall} from "../../helper/caller";
import _ from 'lodash'
import {handleError} from "../../helper/error";
import {errorMessages, infoMessages} from "../../config/configuration";
import {withAlert} from 'react-alert'

class NewServiceForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = defaultService;
        this.handleChange = handleChange.bind(this);
        this.handleArrayUpdate = handleArrayUpdate.bind(this);
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
        this.specialServiceFileHandler = specialServiceFileHandler.bind(this);
    }

    componentDidMount() {
        this.getServiceInfo()
    }

    getServiceInfo = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/service/extraInfo'
        })
            .then(({extraInfo}) => {
                const {collectionType, parameter, distinctValues} = extraInfo;
                this.setState({
                    collectionType: collectionType,
                    parameter: parameter,
                    batches: _.map(distinctValues.batches, (o) => ({name: o, isSelected: true})),
                    userTypes: _.map(distinctValues.userTypes, (o) => ({name: o, isSelected: true})),
                    programmes: _.map(distinctValues.programmes, (o) => ({name: o, isSelected: true})),
                    userStatus: _.map(distinctValues.userStatus, (o) => ({name: o, isSelected: true}))
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

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
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.getServiceFromState().collectionTypes.length > 0) {
            this.addService();
            this.props.alert.success(infoMessages.serviceAdded);
        } else {
            this.props.alert.error(errorMessages.collectionTypeReq);
        }
    };

    changeRadioButtonState = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    };

    onDeselectAll = ({target}) => {
        this.setState({
            [target.dataset.name]: setIsSelected(this.state[target.dataset.name], false)
        })
    };

    onSelectAll = ({target}) => {
        this.setState({
            [target.dataset.name]: setIsSelected(this.state[target.dataset.name], true)
        })
    };

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

