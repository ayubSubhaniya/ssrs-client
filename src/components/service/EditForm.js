import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import Header from "../Header";
import {syncFetch} from '../../helper/FetchData'
import NavigationBar from "../NavigationBar";
import {getServiceFromState, handleArrayUpdate, handleChange, handlePaymentModeChange} from "../../helper/StateUpdate"
import Form from "./Form";
import _ from "lodash"
import {makeCall} from "../../helper/caller"

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
        console.log(arr1, arr2)
        if (_.some(arr2, (o) => o === x))
            newElement.isSelected = true
        else
            newElement.isSelected = false
        console.log(newElement)
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
        if (!props.location.state) {
            return;
        }
        const allCollectionTypes = syncFetch('collectionType');
        const allParameters = syncFetch("parameter");

        this.service = props.location.state;
        this.state = {
            isApplicationSpecific: this.service.isApplicationSpecific.toString(),
            isSpecialService: this.service.isSpecialService.toString(),
            name: this.service.name,
            description: this.service.description,
            maxUnits: this.service.maxUnits,
            baseCharge: this.service.baseCharge,
            paymentModes: reducArrayInToObject(this.service.availablePaymentModes),
            batches: this.service.allowedBatches,
            userTypes: this.service.allowedUserTypes,
            programmes: this.service.allowedProgrammes,
            allBatches: _.some(this.service.allowedBatches,(x) => x==='*') ? 'true' : 'false',
            allUserTypes: _.some(this.service.allowedUserTypes,(x) => x==='*') ? 'true' : 'false',
            allProgrammes: _.some(this.service.allowedProgrammes,(x) => x==='*') ? 'true' : 'false',
            collectionType: setSelecteProperty(allCollectionTypes, this.service.collectionTypes),
            parameter: setSelecteProperty(allParameters, this.service.availableParameters)
        }
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
        this.handlePaymentModeChange = handlePaymentModeChange.bind(this);
        this.getServiceFromState = getServiceFromState.bind(this);
    }

    componentDidMount() {
        this.getUserInfoDistinct();
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
            urlParams: '/service/' + this.service._id,
            params: this.getServiceFromState()
        })
            .then(response => this.props.history.push('/service'))
            .catch((error) => {
                console.log(error.statusText);
            })
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
        if (this.props.location.state) {
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
        } else {
            return <Redirect to={{
                pathname: "/service"
            }}/>
        }
    }
}

export default withRouter(EditForm);

