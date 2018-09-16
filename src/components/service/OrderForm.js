import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import _ from "lodash"
import CollectionTypesDropDown from "./CollectionTypesDropDown";
import MultiSelectDropDown from "./MultiSelectDropDown";
import {Redirect, withRouter} from "react-router-dom";
import PaymentModesDropDown from "./PaymentModesDropDown";
import {COD} from "../../constants/PaymentMode";
import {camelCaseToWords} from "../../helper/String";
import {domainUrl} from '../../config/configuration'
import HttpStatus from 'http-status-codes'

class OrderForm extends Component {

    constructor(props) {
        super(props);
        if (props.location.state) {
            this.service = props.location.state.service,
                this.pickupIndex = _.findIndex(this.service.collectionTypes,(x) => x.name==='Pickup')
            this.state = {
                units: 1,
                comments: '',
                collectionTypeIndex: this.pickupIndex,
                parameters: new Array(this.service.availableParameters.length).fill(false),
                paymentMode: COD,
                name: '',
                email: '',
                contactNo: '',
                daiictId: '',
                address: '',
                state: '',
                city: '',
                pincode: '',
                country: ''
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


    handlePaymentModeChange = ({target}) => {
        this.setState({
            paymentMode: target.dataset.value
        })
    }

    getOrderDetails = (state) => {
        const order = {
            serviceId: this.service._id,
            serviceName: this.service.name,
            parameters: _.filter(_.map(state.parameters, (o, i) => o ? this.service.availableParameters[i]._id : -1), (o) => o != -1),
            payment: {
                "paymentType": this.state.paymentMode,
                "isPaymentDone": false,
                "paymentId": ""
            }
        }
        const pickup = {
            "name": this.state.name,
            "daiictId": this.state.daiictId,
            "contactNo": this.state.contactNo,
            "email": this.state.email
        }
        const courier = {
            "name": this.state.name,
            "contactNo": this.state.contactNo,
            "email": this.state.email,
            'address': {
                line1:this.state.address,
                line2: "ads",
                line3: "asdas"
            },
            'pinCode': this.state.pincode,
            'state': this.state.state,
            'city': this.state.city,
            'country': this.state.country
        }
        return this.pickupIndex==this.state.collectionTypeIndex
            ? {order,pickup}
            : {order,courier};
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
                                            <label>Base Charge:</label>
                                            <input
                                                className={'form-control ml-2'}
                                                type="text"
                                                name="baseCharge"
                                                disabled={true}
                                                value={" ₹ " + this.service.baseCharge}
                                            />
                                        </div>
                                        <div className="form-group form-inline">
                                            <label>Select No. Of Units:</label>
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
                                        <div className={'form-group form-inline'}>
                                            <label>Name:</label>
                                            <input name="name"
                                                   value={this.state.name}
                                                   onChange={this.handleChange}
                                                   className={'form-control w-75 ml-2'} type={'text'}/>
                                        </div>
                                        <div className={'form-group form-inline'}>
                                            <label>DA-IICT ID:</label>
                                            <input name="daiictId"
                                                   value={this.state.daiictId}
                                                   onChange={this.handleChange}
                                                   className={'form-control w-75 ml-2'} type={'text'}/>
                                        </div>
                                        <div className={'form-group form-inline'}>
                                            <label>Email: </label>
                                            <input name='email'
                                                   value={this.state.email}
                                                   onChange={this.handleChange}
                                                   className={'form-control w-75 ml-2'} type={'email'}/>
                                        </div>
                                        <div className={'form-group form-inline'}>
                                            <label>Contact No: </label>
                                            <input name='contactNo'
                                                   value={this.state.contactNo}
                                                   onChange={this.handleChange}
                                                   className={'form-control w-50 ml-2'} type={'tel'}/>
                                        </div>
                                        <CollectionTypesDropDown label={'Collection Type'}
                                                                 btnLabel={SelectedCollectionTypeName}
                                                                 options={this.service.collectionTypes}
                                                                 handleOptionChange={this.handleCollectionTypeChange}/>
                                        <MultiSelectDropDown label={'Parameters'}
                                                             btnLabel={"Select"}
                                                             options={this.service.availableParameters}
                                                             handleOptionChange={this.handleParamenterChange}/>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="card bg-light mb-3 p-4">
                                        <PaymentModesDropDown btnLabel={camelCaseToWords(this.state.paymentMode)}
                                                              options={Object.keys(_.pickBy(this.service.paymentModes))}
                                                              handleOptionChange={this.handlePaymentModeChange}/>

                                        <div
                                            className={SelectedCollectionTypeName.toString().split(' ')[0] === 'Courier' ? '' : 'd-none'}>
                                            <div className={'form-group'}>
                                                <label>Address: </label>
                                                <input name='address'
                                                       className={'form-control'}
                                                       onChange={this.handleChange}/>
                                            </div>
                                            <div className={'form-group'}>
                                                <label>City:</label>
                                                <input name='city'
                                                       className={'form-control'}
                                                       type={'text'}
                                                       onChange={this.handleChange}/>
                                            </div>
                                            <div className={'form-group'}>
                                                <label>Pincode:</label>
                                                <input name='pincode'
                                                       className={'form-control'}
                                                       type={'text'}
                                                       onChange={this.handleChange}/>
                                            </div>
                                            <div className={'form-group'}>
                                                <label>State:</label>
                                                <input name='state'
                                                       className={'form-control'}
                                                       type={'text'}
                                                       onChange={this.handleChange}/>
                                            </div>
                                            <div className={'form-group'}>
                                                <label>Country:</label>
                                                <input name='country'
                                                       className={'form-control'}
                                                       type={'text'}
                                                       onChange={this.handleChange}/>
                                            </div>
                                        </div>

                                        <div className={'form-group'}>
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
