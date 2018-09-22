import React, {Component} from 'react'
import _ from "lodash"
import MultiSelectDropDown from "./MultiSelectDropDown";
import {withRouter} from "react-router-dom";
import {domainUrl} from '../../config/configuration'
import HttpStatus from 'http-status-codes'
import Modal from "react-bootstrap4-modal";

class OrderForm extends Component {
    constructor(props) {
        super(props);
        props.service;
        this.state = {
            units: 1,
            comments: '',
            parameters: new Array(props.service.availableParameters.length).fill(false),
        }
    }

    componentDidMount() {
        window.addEventListener('keydown',(e) => {
            if(e.keyCode==27){
                this.props.closeModal();
            }
        })
    }

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
    }

    getSelectedPrameters = (parameters) => {
        return _.filter(_.map(parameters, (o, i) => o ? this.props.service.availableParameters[i] : -1), (o) => o != -1)
    }

    getOrderDetails = (state) => {
        const order = {
            serviceId: this.props.service._id,
            parameters: _.map(this.getSelectedPrameters(state.parameters), '_id'),
            unitsRequested: this.state.units,
            comment: this.state.comments
        }
        return order;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.getOrderDetails(this.state));
        this.props.closeModal();
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
                that.props.closeModal();
            }
        }
        // request.send(JSON.stringify(this.getOrderDetails(this.state)));
    }

    render() {
        const {service} = this.props;
            const selectedParamters = this.getSelectedPrameters(this.state.parameters)
            var parameterBtnLabel = _.map(selectedParamters, 'name').join(', ')
            parameterBtnLabel = parameterBtnLabel === '' ? 'Select' : parameterBtnLabel
            parameterBtnLabel = parameterBtnLabel.length > 45 ? `Selected(${selectedParamters.length})` : parameterBtnLabel
            return (
                <Modal visible={true} onClickBackdrop={this.props.closeModal}>
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
                                            className={'form-control text-center ml-2'}
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
                        </form>
                    </div>
                    <div className="modal-footer">
                        <input
                            className='submit'
                            onClick={this.handleSubmit}
                            type="submit"
                            value="Add To Cart"/>
                    </div>
                </Modal>
            )
    }
}

export default withRouter(OrderForm)
