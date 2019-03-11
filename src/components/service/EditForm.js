import React, {PureComponent} from 'react';
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
import _ from "lodash"
import {makeCall} from "../../helper/caller"
import {defaultService} from "../../constants/constants";
import {handleError} from "../../helper/error";
import {errorMessages, infoMessages} from "../../config/configuration";
import {withAlert} from 'react-alert'

function setSelectedProperty(arr1, arr2) {
    return _.map(arr1, (x) => {
        if (_.some(arr2, (o) => o._id === x._id))
            x.isSelected = true;
        return x;
    })
}

function setSelectedPropertyByName(arr1, arr2) {
    return _.map(arr1, (x) => {
        const newElement = {name: x};
        newElement.isSelected = _.some(arr2, (o) => o === x);
        return newElement;
    })
}

function reduceArrayInToObject(params) {
    return _.reduce(params, function (obj, param) {
        obj[param] = true;
        return obj;
    }, {});
}

class EditForm extends PureComponent {
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
        this.getService();
    }

    getAllCollectionType = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/collectionType'
        })
            .then((response) => {
                this.setState({
                    collectionType: setSelectedProperty(response.collectionType, this.state.collectionType)
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

    getAllParameter = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/parameter'
        })
            .then((response) => {
                this.setState({
                    parameter: setSelectedProperty(response.parameter, this.state.parameter)
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

    setService = (service) => {
        this.setState({
            isSpecialService: service.isSpecialService.toString(),
            name: service.name,
            description: service.description,
            maxUnits: service.maxUnits,
            baseCharge: service.baseCharge,
            paymentModes: reduceArrayInToObject(service.availablePaymentModes),
            batches: service.allowedBatches,
            userTypes: service.allowedUserTypes,
            programmes: service.allowedProgrammes,
            userStatus: service.allowedUserStatus,
            allBatches: _.some(service.allowedBatches, (x) => x === '*') ? 'true' : 'false',
            allUserTypes: _.some(service.allowedUserTypes, (x) => x === '*') ? 'true' : 'false',
            allProgrammes: _.some(service.allowedProgrammes, (x) => x === '*') ? 'true' : 'false',
            collectionType: service.collectionTypes,
            parameter: service.availableParameters,
            specialServiceUsers: service.specialServiceUsers
        })
    };

    getService = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/service/extraInfo/' + this.props.match.params.id
        })
            .then(({service, extraInfo}) => {
                this.setService(service);
                const {collectionType, parameter, distinctValues} = extraInfo;
                this.setState({
                    collectionType: setSelectedProperty(collectionType, this.state.collectionType),
                    parameter: setSelectedProperty(parameter, this.state.parameter),
                    batches: setSelectedPropertyByName(distinctValues.batches, this.state.batches),
                    userTypes: setSelectedPropertyByName(distinctValues.userTypes, this.state.userTypes),
                    userStatus: setSelectedPropertyByName(distinctValues.userStatus, this.state.userStatus),
                    programmes: setSelectedPropertyByName(distinctValues.programmes, this.state.programmes)
                })
            })
            .catch((error) => {
                handleError(error);
            })

    };

    getUserInfoDistinct = () => {
        makeCall({
            jobType: "GET",
            urlParams: '/userInfo/distinct'
        })
            .then((response) => {
                this.setState({
                    batches: setSelectedPropertyByName(response.batches, this.state.batches),
                    userTypes: setSelectedPropertyByName(response.userTypes, this.state.userTypes),
                    userStatus: setSelectedPropertyByName(response.userStatus, this.state.userStatus),
                    programmes: setSelectedPropertyByName(response.programmes, this.state.programmes)
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

    updateService = () => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/service/' + this.props.match.params.id,
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
            this.updateService();
            this.props.alert.success(infoMessages.savedSuccess);
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
                <Header title={"Edit Service"}/>
                <div className="container container-custom">
                    <Form state={this.state}
                          handleChange={this.handleChange}
                          handleArrayUpdate={this.handleArrayUpdate}
                          handleSubmit={this.handleSubmit}
                          onSelectAll={this.onSelectAll}
                          onDeselectAll={this.onDeselectAll}
                          changeRadioButtonState={this.changeRadioButtonState}
                          specialServiceFileHandler={this.specialServiceFileHandler}
                          handlePaymentModeChange={this.handlePaymentModeChange}/>
                </div>
            </div>
        );
    }
}

export default withAlert(withRouter(EditForm));

