import React from 'react'
import PaymentModes from "./PaymentModes";
import MultiSelectDropDown from "./MultiSelectDropDown";
import ApllicationSpecificDropDown from "./ApllicationSpecificDropDown";
import FileUpload from '../FileUpload/FileUpload'
import { Link } from "react-router-dom"
import _ from 'lodash'

function Form(props) {
    return (
        <form autoComplete="off" onSubmit={props.handleSubmit}>
            <div className="form-row col-md-12">
                <div className="form-group col-md-6">
                    <label>Service Name</label>
                    <input
                        className={'form-control'}
                        type="text"
                        name="name"
                        placeholder="Enter Service Name"
                        value={props.state.name}
                        onChange={props.handleChange}
                        required />
                </div>
                <div className="form-group col-md-6">
                    <label>Base Charge</label>
                    <input
                        className={'form-control'}
                        type="number"
                        name="baseCharge"
                        min={0}
                        placeholder="Enter Amount (in ₹)"
                        value={props.state.baseCharge}
                        onChange={props.handleChange}
                        required />
                </div>
            </div>
            <div className="form-row col-md-12">
                <div className="form-group col-md-6">
                    <label>Service Description</label>
                    <textarea
                        className={'form-control'}
                        name="description"
                        required={true}
                        placeholder="Write Service Description"
                        value={props.state.description}
                        onChange={props.handleChange}>
                    </textarea>
                </div>
                <PaymentModes
                    paymentModes={props.state.paymentModes}
                    handleChange={props.handlePaymentModeChange} />
                <div className='col-md-6'>
                    <div className="form-group">
                        <label>Maximum Unit</label>
                        <input
                            className={'form-control'}
                            type="number"
                            min={'1'}
                            name="maxUnits"
                            placeholder="Enter Maximum Allowed Unit"
                            value={props.state.maxUnits}
                            onChange={props.handleChange}
                            required />
                    </div>
                </div>
                <div className='col-md-6'>
                    <MultiSelectDropDown label={'Collection Type'}
                        btnLabel={"Select"}
                        options={props.state.collectionType}
                        onSelectAll={props.onSelectAll}
                        onDeselectAll={props.onDeselectAll}
                        name={'collectionType'}
                        handleOptionChange={props.handleArrayUpdate} />
                </div>
                <div className='col-md-6'>
                    <MultiSelectDropDown label={'Parameters'}
                        btnLabel={"Select"}
                        options={props.state.parameter}
                        onSelectAll={props.onSelectAll}
                        onDeselectAll={props.onDeselectAll}
                        name={'parameter'}
                        handleOptionChange={props.handleArrayUpdate} />
                </div>
                <div className="col-md-6">
                    <div className="form-group d-flex mb-0">
                        <label>Is Special Service?</label>
                        <div className="form-group col-md-6 d-flex">
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input className="form-check-input"
                                        style={{ display: "inline" }}
                                        type="radio"
                                        value={true}
                                        name='isSpecialService'
                                        checked={props.state.isSpecialService === 'true'}
                                        onClick={props.changeRadioButtonState} />
                                    Yes
                            </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label">
                                    <input className="form-check-input"
                                        style={{ display: "inline" }}
                                        type="radio"
                                        value={false}
                                        name='isSpecialService'
                                        checked={props.state.isSpecialService === 'false'}
                                        onClick={props.changeRadioButtonState} />
                                    No
                            </label>
                            </div>
                        </div>
                    </div>
                    {
                        props.state.isSpecialService === 'true' ?
                            <div className={'d-flex mt-2 mb-4'}>
                                <div class="card d-flex justify-content-center" style={{
                                    width: "30em",
                                    borderWidth: "2px"
                                }}>
                                    <div class="card-body mx-auto">
                                        <h5 class="card-title">Upload Special Service User List</h5>
                                        <h6 class="card-title">Allowed format: .xlsx (Excel file) </h6>
                                        <p class="card-text"><FileUpload handleSubmit={props.specialServiceFileHandler} /></p>
                                    </div>
                                </div>
                            </div>
                            : ''
                    }
                    {
                        props.state.isSpecialService === 'false' ?
                            <React.Fragment>
                                <ApllicationSpecificDropDown label={'Batches'}
                                    btnLabel={"Select"}
                                    options={props.state.batches}
                                    name={'batches'}
                                    onSelectAll={props.onSelectAll}
                                    onDeselectAll={props.onDeselectAll}
                                    handleOptionChange={props.handleArrayUpdate} />
                                <ApllicationSpecificDropDown label={'User Types'}
                                    btnLabel={"Select"}
                                    options={props.state.userTypes}
                                    name={'userTypes'}
                                    onSelectAll={props.onSelectAll}
                                    onDeselectAll={props.onDeselectAll}
                                    handleOptionChange={props.handleArrayUpdate} />
                                <ApllicationSpecificDropDown label={'User Status'}
                                    btnLabel={"Select"}
                                    options={props.state.userStatus}
                                    name={'userStatus'}
                                    onSelectAll={props.onSelectAll}
                                    onDeselectAll={props.onDeselectAll}
                                    handleOptionChange={props.handleArrayUpdate} />
                                <ApllicationSpecificDropDown label={'Programmes'}
                                    btnLabel={"Select"}
                                    options={props.state.programmes}
                                    name={'programmes'}
                                    onSelectAll={props.onSelectAll}
                                    onDeselectAll={props.onDeselectAll}
                                    handleOptionChange={props.handleArrayUpdate} />
                            </React.Fragment>
                            : ''
                    }
                </div>

            </div>

            <div className={'d-flex justify-content-center mt-4'}>
                <button className="btn btn-outline-success btn-lg mr-3" onSubmit={props.handleSubmit}>
                    <span>Save</span>
                </button>
                <Link to={'/service'}>
                    <button className="btn btn-outline-danger btn-lg">
                        <span>Cancel</span>
                    </button>
                </Link>
            </div>


            {
                (props.state.isSpecialService === 'true')
                    ? <div id="accordion" className="mt-4">
                        <div className="card-header" style={{backgroundColor: "#ffffff", borderRadius: "2px"}}>
                            <a className="collapsed card-link text-dark w-100"
                                data-toggle="collapse"
                                href={"#collapse1"}>
                                <h4>Special Service Users</h4>
                            </a>
                        </div>
                        <div id='collapse1' className="collapse" data-parent="#accordion">
                            <div className="card-body" style={{backgroundColor: "#ffffff", fontSize: "1.15em"}}>
                                {_.values(props.state.specialServiceUsers).join(' | ')}
                            </div>
                        </div>
                    </div>
                    : ''
            }
        </form>
    )
}

export default Form;
