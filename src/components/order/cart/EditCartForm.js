import React, {Component} from 'react'
import _ from "lodash"
import {withRouter} from "react-router-dom";
import MultiSelectDropDownControled from "../../service/MultiSelectDropDownControled";
import {handleArrayUpdate, handleChange} from "../../../helper/StateUpdate"
import {domainUrl} from "../../../config/configuration";
import * as HttpStatus from "http-status-codes";

function setSelecteProperty(arr1, arr2) {
    return _.map(arr1, (x) => {
        if (_.some(arr2, (o) => o._id === x._id))
            x.isSelected = true
        return x;
    })
}

function syncFetch(dataName, key) {
    const url = domainUrl + '/' + dataName
    let fetchedData;
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.withCredentials = true;
    request.onload = function () {
        if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
            try {
                const obj = JSON.parse(request.responseText);
                fetchedData = obj[key];
            } catch (e) {
                console.error(e);
            }
        }
    };
    request.send();
    return fetchedData;
}

class EditCartForm extends Component {
    constructor(props) {
        super(props);
        const availableParameters = _.map(this.props.service.availableParameters,(id) => syncFetch(`parameter/${id}`,'parameter'))
        this.state = {
            units: props.units,
            comments: props.comment,
            parameter: setSelecteProperty(availableParameters, this.props.parameter),
        }
        this.handleChange = handleChange.bind(this)
        this.handleArrayUpdate = handleArrayUpdate.bind(this)
    }

    getOrderDetails = (state) => {
        const order = {
            parameters: _.map(_.filter(state.parameter, ({isSelected}) => isSelected), '_id'),
            unitsRequested: state.units,
            comment: state.comments
        }
        return order;
    }

    getSelectedPrameters = (parameter) => {
        return _.filter(parameter, ({isSelected}) => isSelected);
    }

    handleSubmit = () => {
        console.log(this.getOrderDetails(this.state));
        this.props.updateOrder(this.getOrderDetails(this.state), this.props.index, this.modal);
    }

    render() {
        const {service} = this.props;
        const selectedParamters = this.getSelectedPrameters(this.state.parameter)
        var parameterBtnLabel = _.map(selectedParamters, 'name').join(', ')
        parameterBtnLabel = parameterBtnLabel === '' ? 'Select' : parameterBtnLabel
        parameterBtnLabel = parameterBtnLabel.length > 45 ? `Selected(${selectedParamters.length})` : parameterBtnLabel
        return (
            <div className="modal" ref={modal => this.modal = modal} id={"myModal" + this.props.id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className={'w-100'}>
                                <h5 className="modal-title w-100 text-center">{service.name}</h5>
                                <p className={'w-100 text-center m-0'}>{service.description + " ( Charge: ₹ " + service.baseCharge + " )"}</p>
                            </div>
                        </div>
                        <div className={'modal-body'}>
                            <form autoComplete="on">
                                <div className="card bg-light p-4">
                                    <div className="form-group form-inline">
                                        <label>Select No. Of Units:</label>
                                        <input
                                            className={'form-control text-center ml-2 col-6'}
                                            type="number"
                                            min={1}
                                            max={service.maxUnits}
                                            name="units"
                                            value={this.state.units}
                                            placeholder="Enter Maximum Allowed Unit"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                    <MultiSelectDropDownControled label={'Parameters'}
                                                                  btnLabel={parameterBtnLabel}
                                                                  options={this.state.parameter}
                                                                  name={'parameter'}
                                                                  handleOptionChange={this.handleArrayUpdate}/>
                                    <div className={'form-group'}>
                                        <label>Comments:</label>
                                        <textarea
                                            className={'form-control'}
                                            rows="5"
                                            name="comments"
                                            placeholder="Write Comments"
                                            value={this.state.comments}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default withRouter(EditCartForm)