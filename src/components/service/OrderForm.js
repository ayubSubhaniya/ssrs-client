import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import _ from "lodash"
import DropDown from "./DropDown";
import MultiSelectDropDown from "./MultiSelectDropDown";
import {Redirect, withRouter} from "react-router-dom";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import CourierDetailsForm from "./CourierDetailsForm";


class OrderForm extends Component {

    constructor(props) {
        super(props);
        if (props.location.state) {
            this.service = props.location.state.service
            this.state = {
                units: 1,
                comments: '',
                collectionTypeIndex: -1,
                parameters: new Array(this.service.availableParameters.length).fill(false)
            }
        }
    }

    handleChange = ({target}) => {
        if (!target.name)
            return;
        this.setState({
            [target.name]: target.value
        })
    }
    handleCollectionTypeChange = ({target}) => {
        var index = target.dataset.index;
        if (!index)
            index = target.parentNode.dataset.index;
        this.setState({
            collectionTypeIndex: index
        })
    }

    handleParamenterChange = ({target}) => {
        this.setState({
            parameters: _.map(this.state.parameters, (o, i) => i == target.dataset.index ? !o : o)
        })
    }

    getOrderDetails = (state) => {
        const order = {
            serviceId: this.service._id,
            serviceName: this.service.name,
            parameters: _.filter(_.map(state.parameters, (o, i) => o ? this.service.availableParameters[i]._id : -1), (o) => o != -1),
            payment: {
                "paymentType": "offline",
                "isPaymentDone": false,
                "paymentId": ""
            }
        }
        const pickup = {
            "name": "Sagar Savaliya",
            "daiictId": 201501407,
            "contactNo": 9429795959,
            "email": "201501407@daiict.ac.in"
        }
        return {order, pickup};
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.getOrderDetails(this.state));

        const that = this;
        const url = domainUrl + '/order/'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.CREATED) {
                const response = JSON.parse(request.response)
                console.log(response);
                that.props.history.push('/order')
            }
        }
        request.send(JSON.stringify(this.getOrderDetails(this.state)));
    }

    render() {
        if (this.props.location.state) {
            const SelectedCollectionTypeName = this.state.collectionTypeIndex != -1
                ? this.service.collectionTypes[this.state.collectionTypeIndex].name + " (₹" +
                this.service.collectionTypes[this.state.collectionTypeIndex].baseCharge + ")"
                : 'Select'
            const parameterBtnLabel = _.filter(this.state.parameters);
            return (
                <div>
                    <NavigationBar/>
                    <Header title={"Apply For Service"}/>
                    <div className={'container'}>
                        <form autoComplete="on" onSubmit={this.handleSubmit}>
                            <div className={'row'}>
                                <div className="col-sm-12">
                                    <div className="card bg-light mb-3 p-2">
                                        <div className="text-center">
                                            <h1>{this.service.name}</h1>
                                            <p>{this.service.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card bg-light mb-3 p-4">
                                        <div className="form-group form-inline">
                                            <label>Base Charge</label>
                                            {": "}
                                            <input
                                                className={'form-control ml-2'}
                                                type="text"
                                                name="baseCharge"
                                                disabled={true}
                                                value={" ₹ " + this.service.baseCharge}
                                            />
                                        </div>
                                        <div className="form-group form-inline">
                                            <label>Select No. Of Units</label>
                                            {": "}
                                            <input
                                                className={'form-control text-center ml-2'}
                                                type="number"
                                                min={1}
                                                max={this.service.maxUnits}
                                                name="units"
                                                value={this.state.units}
                                                placeholder="Enter Maximum Allowed Unit"
                                                onChange={this.handleChange}
                                                required
                                            />
                                        </div>
                                        <DropDown label={'Collection Type'}
                                                  btnLabel={SelectedCollectionTypeName}
                                                  options={this.service.collectionTypes}
                                                  handleOptionChange={this.handleCollectionTypeChange}/>
                                        <CourierDetailsForm visible={SelectedCollectionTypeName.toString().split(' ')[0]==='Courier'}/>
                                        <MultiSelectDropDown label={'Parameters'}
                                                             btnLabel={"Select"}
                                                             options={this.service.availableParameters}
                                                             handleOptionChange={this.handleParamenterChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="card bg-light mb-3 p-4">
                                        <label>Comments</label>
                                        <textarea
                                            className={'form-control'}
                                            rows="5"
                                            name="comments"
                                            placeholder="Write Comments"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={'w-100 d-flex justify-content-center mt-3'}>
                                    <input
                                        className='submit'
                                        type="submit"
                                        value="Proceed"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return <Redirect to={{
                pathname: "/service"
            }}/>
        }
    }
}

export default withRouter(OrderForm)
