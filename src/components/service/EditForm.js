import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Header from "../Header";
import NavigationBar from "../NavigationBar";
import {getServiceFromState, handleArrayUpdate, handleChange, handlePaymentModeChange} from "../../helper/StateUpdate"
import Form from "./Form";
import _ from "lodash"
import {makeCall} from "../../helper/caller"
import {defaultService} from "../../constants/constants";

function setSelecteProperty(arr1, arr2) {
    return _.map(arr1, (x) => {
        if (_.some(arr2, (o) => o._id === x._id))
            x.isSelected = true
        return x;
    })
}

function setSelectedPropertyByName(arr1, arr2) {
    return _.map(arr1, (x) => {
        const newElement = {name: x}
        if (_.some(arr2, (o) => o === x))
            newElement.isSelected = true
        else
            newElement.isSelected = false
        return newElement;
    })
}

function reducArrayInToObject(params) {
    return _.reduce(params, function (obj, param) {
        obj[param] = true;
        return obj;
    }, {});
}

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.location.pathname.split('/')[3];
        this.state = defaultService;
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
    }

    componentDidMount() {
        this.getService();
    }

    getAllCollectionType = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/collectionType'
        })
            .then((response) => {
                this.setState({
                    collectionType: setSelecteProperty(response.collectionType, this.state.collectionType)
                })
            })
    }

    getAllParameter = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/parameter'
        })
            .then((response) => {
                this.setState({
                    parameter: setSelecteProperty(response.parameter, this.state.parameter)
                })
            })
    }

    setService = (service) => {
        this.setState({
            isSpecialService: service.isSpecialService.toString(),
            name: service.name,
            description: service.description,
            maxUnits: service.maxUnits,
            baseCharge: service.baseCharge,
            paymentModes: reducArrayInToObject(service.availablePaymentModes),
            batches: service.allowedBatches,
            userTypes: service.allowedUserTypes,
            programmes: service.allowedProgrammes,
            allBatches: _.some(service.allowedBatches, (x) => x === '*') ? 'true' : 'false',
            allUserTypes: _.some(service.allowedUserTypes, (x) => x === '*') ? 'true' : 'false',
            allProgrammes: _.some(service.allowedProgrammes, (x) => x === '*') ? 'true' : 'false',
            collectionType: service.collectionTypes,
            parameter: service.availableParameters
        })
    }

    getService = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/service/' + this.id
        })
            .then((response) => {
                this.setService(response.service);
                this.getAllCollectionType();
                this.getAllParameter();
                this.getUserInfoDistinct();
            })
    }

    getUserInfoDistinct = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/userInfo/distinct'
        })
            .then((response) => {
                this.setState({
                    batches: setSelectedPropertyByName(response.batches, this.state.batches),
                    userTypes: setSelectedPropertyByName(response.userTypes, this.state.userTypes),
                    programmes: setSelectedPropertyByName(response.programmes, this.state.programmes)
                })
            })
    }


    updateService = () => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/service/' + this.id,
            params: this.getServiceFromState()
        })
            .then(() => this.props.history.push('/service'))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.updateService()
    }

    changeRadioButtonState = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={"Edit Service"}/>
                <div className="container container-custom">
                    <Form state={this.state}
                          handleChange={this.handleChange}
                          handleArrayUpdate={this.handleArrayUpdate}
                          handleSubmit={this.handleSubmit}
                          changeRadioButtonState={this.changeRadioButtonState}
                          handlePaymentModeChange={this.handlePaymentModeChange}/>
                </div>
            </div>
        );
    }
}

export default withRouter(EditForm);

