import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import _ from "lodash"
import DropDown from "../DropDown";
import MultiSelectDropDown from "./MultiSelectDropDown";

class OrderForm extends Component {

    constructor() {
        super();
        this.service = {
            "_id": "5b784c77022737551781ed8b",
            "name": "Transcript",
            "description": "Get Full Transcript",
            "createdOn": "2018-08-18T16:42:31.881Z",
            "createdBy": "201501433",
            "isActive": true,
            "maxUnits": 10,
            "baseCharge": 30,
            "availableParameters": [
                {
                    "baseCharge": 50,
                    "isActive": true,
                    "_id": "5b71d3939257504ec82ffd71",
                    "name": "Sealed Envelop",
                    "description": "Get document in sealed envelop",
                    "createdOn": "2018-08-13T18:53:07.010Z",
                    "createdBy": "201501433"
                },
                {
                    "baseCharge": 60,
                    "isActive": true,
                    "_id": "5b71d3939257504c82ffd71",
                    "name": "Sealed Envelop 1",
                    "description": "Get document in sealed envelop",
                    "createdOn": "2018-08-13T18:53:07.010Z",
                    "createdBy": "201501433"
                },
                {
                    "baseCharge": 70,
                    "isActive": true,
                    "_id": "5b71d393925754ec82ffd71",
                    "name": "Sealed Envelop 2",
                    "description": "Get document in sealed envelop",
                    "createdOn": "2018-08-13T18:53:07.010Z",
                    "createdBy": "201501433"
                }
            ],
            "specialServiceUsers": [],
            "paymentModes": {
                "debitCard": true,
                "netBanking": false,
                "paytm": true,
                "cashOnDelivery": true
            },
            "collectionTypes": [
                {
                    "baseCharge": 100,
                    "isActive": true,
                    "_id": "5b71d3d3957504ec82ffd73",
                    "name": "Courier",
                    "description": "Courier is sent through speed post",
                    "createdOn": "2018-08-13T18:54:11.046Z",
                    "createdBy": "201501433"
                },
                {
                    "baseCharge": 300,
                    "isActive": true,
                    "_id": "5b71d3d39257504ec82fd73",
                    "name": "On Campus",
                    "description": "Courier is sent through speed post",
                    "createdOn": "2018-08-13T18:54:11.046Z",
                    "createdBy": "201501433"
                }
            ]
        }
        this.state = {
            units: 1,
            comments: '',
            collectionTypeIndex: -1,
            parameters: new Array(this.service.availableParameters.length).fill(false)
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

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
    }

    render() {
        const SelectedCollectionTypeName = this.state.collectionTypeIndex != -1
            ? this.service.collectionTypes[this.state.collectionTypeIndex].name + " (₹" +
            this.service.collectionTypes[this.state.collectionTypeIndex].baseCharge + ")"
            : 'Select'
        const parameterBtnLabel = _.filter(this.state.parameters);
        console.log(parameterBtnLabel)
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
                                            value={this.service.baseCharge + " ₹"}
                                        />
                                    </div>
                                    <div className="form-group form-inline">
                                        <label>Select No. Of Units</label>
                                        {": "}
                                        <input
                                            className={'form-control text-center ml-2'}
                                            type="number"
                                            min={0}
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
                                        type="number"
                                        min={0}
                                        max={10}
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
    }
}

export default OrderForm
