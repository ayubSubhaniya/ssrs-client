import React, {Component} from 'react'
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import _ from "lodash"

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
                    "_id": "5b71d3939257504ec82ffd71",
                    "name": "Sealed Envelop 1",
                    "description": "Get document in sealed envelop",
                    "createdOn": "2018-08-13T18:53:07.010Z",
                    "createdBy": "201501433"
                },
                {
                    "baseCharge": 70,
                    "isActive": true,
                    "_id": "5b71d3939257504ec82ffd71",
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
                    "_id": "5b71d3d39257504ec82ffd73",
                    "name": "Courier",
                    "description": "Courier is sent through speed post",
                    "createdOn": "2018-08-13T18:54:11.046Z",
                    "createdBy": "201501433"
                },
                {
                    "baseCharge": 300,
                    "isActive": true,
                    "_id": "5b71d3d39257504ec82ffd73",
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
        this.setState({
            [target.name]: target.value
        })
    }
    handleCollectionTypeChange = ({target}) => {
        this.setState({
            collectionTypeIndex: target.dataset.index
        })
    }

    handleParamenterChange = ({target}) => {
        this.setState({
            parameters: _.map(this.state.parameters,(o,i) => i==target.dataset.index?!o:o)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.state);
    }

    render() {
        const SelectedCollectionTypeName = this.state.collectionTypeIndex!=-1
            ? this.service.collectionTypes[this.state.collectionTypeIndex].name + " (₹"  +
            this.service.collectionTypes[this.state.collectionTypeIndex].baseCharge + ")"
            : 'Select'
        return (
            <div>
                <NavigationBar/>
                <Header title={"Apply For Service"}/>
                <div className={'container'}>
                    <form autoComplete="on" onSubmit={this.handleSubmit}>
                        <div className="col-sm-12">
                            <div className="well">
                                <div className="text-center">
                                    <h1>{this.service.name}</h1>
                                    <p>{this.service.description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="well">
                                <div className="form-group form-inline">
                                    <label>Base Charge</label>
                                    {": "}
                                    <input
                                        className={'form-control'}
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
                                        className={'form-control text-center'}
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
                                <div className="form-group">
                                    <label>Collection Type</label>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle form-control" type="button"
                                                data-toggle="dropdown">
                                            {SelectedCollectionTypeName + " "}
                                            <span className="caret"></span></button>
                                        <ul className="dropdown-menu col-sm-12">
                                            {
                                                _.map(this.service.collectionTypes, (o,index) => {
                                                    return (<li className={'padding-x-sm'} style={{"cursor":"pointer"}} onClick={this.handleCollectionTypeChange}>
                                                        <a data-index={index}
                                                           data-toggle="tooltip"
                                                           title={o.description}>
                                                            {o.name + " (₹" + o.baseCharge + ")"} </a>
                                                    </li>)
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Parameters</label>
                                    <div className="dropdown">
                                        <button className="btn dropdown-toggle form-control" type="button"
                                                data-toggle="dropdown">{"Select  "}
                                            <span className="caret"></span></button>
                                        <ul className="dropdown-menu col-sm-12">
                                            <form>
                                                {
                                                    _.map(this.service.availableParameters, (o,index) => {
                                                        return (<li
                                                            className="checkbox padding-left-lg padding-x-sm"
                                                            >
                                                            <label data-toggle="tooltip"
                                                                   title={o.description} style={{"width": '100%'}} >
                                                                <input onClick={this.handleParamenterChange} data-index={index} type="checkbox" value=""/>
                                                                {o.name + " (₹" + o.baseCharge +")"}
                                                                </label>
                                                        </li>)
                                                    })
                                                }
                                            </form>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6">
                            <div className="well">
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
                        <div className="col-sm-6">
                            <input
                                className='submit'
                                type="submit"
                                value="Add To Cart"/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default OrderForm
