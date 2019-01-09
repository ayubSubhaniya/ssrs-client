import React, {Component} from 'react'
import _ from "lodash"
import MultiSelectDropDown from "../../service/MultiSelectDropDown";
import {withRouter} from "react-router-dom";
import {domainUrl, errorMessages, infoMessages} from '../../../config/configuration'
import * as HttpStatus from "http-status-codes";
import $ from "jquery";
import ErrorMessage from "../../error/ErrorMessage";
import { withAlert } from "react-alert";

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            units: 1,
            comments: '',
            parameters: new Array(props.service.availableParameters.length).fill(false),
            errorMessage: ''
        }
    }

    cleanErrorMessage=()=>{
        this.setState({
            errorMessage:''
        })
    };


    handleChange = ({target}) => {
        if (!target.name)
            return;
        this.setState({
            [target.name]: target.value
        })
    }

    handleParamenterChange = ({target}) => {
        this.setState({
            parameters: _.map(this.state.parameters, (o, i) => i == target.dataset.index ? !o : o)
        })
    };

    getSelectedPrameters = (parameters) => {
        return _.filter(_.map(parameters, (o, i) => o ? this.props.service.availableParameters[i] : -1), (o) => o != -1)
    };

    getOrderDetails = (state) => {
        const order = {
            service: this.props.service._id,
            parameters: _.map(this.getSelectedPrameters(state.parameters), '_id'),
            unitsRequested: this.state.units,
            comment: this.state.comments===''?undefined:this.state.comments
        };
        return {order};
    };

    handleSubmit = (e) => {
        e.preventDefault()

        const that = this;
        const url = domainUrl + '/order/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.CREATED) {
                const response = JSON.parse(request.response);
                $(that.modal).modal('hide');
                // alert("Order added to the cart!");
                that.props.alert.success(infoMessages.orderAddedToCart);
            } else if (this.status === HttpStatus.PRECONDITION_FAILED){
                that.setState({
                    errorMessage: request.responseText
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR){
                that.setState({
                    errorMessage: errorMessages.internalServerError
                })
            } else if (this.status === HttpStatus.FORBIDDEN){
                that.setState({
                    errorMessage: errorMessages.forbidden
                })
            } else {
                that.setState({
                    errorMessage: errorMessages.somethingsWrong
                })
            }
        }
        request.send(JSON.stringify(this.getOrderDetails(this.state)));
    }
    render() {
        const {service} = this.props;
        const selectedParamters = this.getSelectedPrameters(this.state.parameters)
        var parameterBtnLabel = _.map(selectedParamters, 'name').join(', ')
        parameterBtnLabel = parameterBtnLabel === '' ? 'Select' : parameterBtnLabel
        parameterBtnLabel = parameterBtnLabel.length > 45 ? `Selected(${selectedParamters.length})` : parameterBtnLabel
        return (
            <div>
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
                                        <MultiSelectDropDown label={'Parameters'}
                                                             btnLabel={parameterBtnLabel}
                                                             options={service.availableParameters}
                                                             handleOptionChange={this.handleParamenterChange}/>
                                        <div className={'form-group'}>
                                            <label>Comments:</label>
                                            <textarea
                                                className={'form-control'}
                                                rows="5"
                                                name="comments"
                                                placeholder="Write Comments"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <ErrorMessage message={this.state.errorMessage} clearMessage={this.cleanErrorMessage}/>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-outline-success" onClick={this.handleSubmit}>Add To Cart</button>
                                <button type="button" className="btn btn-outline-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )
    }
}

export default withAlert(withRouter(OrderForm))