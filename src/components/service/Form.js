import React from 'react'
import PaymentModes from "./PaymentModes";
import MultiSelectDropDownControled from "./MultiSelectDropDownControled";
import ApllicationSpecificDropDown from "./ApllicationSpecificDropDown";

function Form(props) {
    return <form autoComplete="off" onSubmit={props.handleSubmit}>
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
                    required/>
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
                    required/>
            </div>
        </div>
        <div className="form-row col-md-12">
            <div className="form-group col-md-6">
                <label>Service Description</label>
                <textarea
                    className={'form-control'}
                    name="description"
                    placeholder="Write Service Description"
                    value={props.state.description}
                    onChange={props.handleChange}>
            </textarea>
            </div>
            <PaymentModes
                paymentModes={props.state.paymentModes}
                handleChange={props.handlePaymentModeChange}/>
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
                        required/>
                </div>
            </div>
            <div className='col-md-6'>
                <MultiSelectDropDownControled label={'Collection Type'}
                                              btnLabel={"Select"}
                                              options={props.state.collectionType}
                                              name={'collectionType'}
                                              handleOptionChange={props.handleArrayUpdate}/>
            </div>
            <div className='col-md-6'>
                <MultiSelectDropDownControled label={'Parameters'}
                                              btnLabel={"Select"}
                                              options={props.state.parameter}
                                              name={'parameter'}
                                              handleOptionChange={props.handleArrayUpdate}/>
            </div>
            <div className="col-md-6">
                <div className="form-group d-flex mb-0">
                    <label>Is Special Service?</label>
                    <div className="form-group col-md-6 d-flex">
                        <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input className="form-check-input"
                                       style={{display: "inline"}}
                                       type="radio"
                                       value={true}
                                       name='isSpecialService'
                                       checked={props.state.isSpecialService === 'true'}
                                       onClick={props.changeRadioButtonState}/>
                                Yes
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <label className="form-check-label">
                                <input className="form-check-input"
                                       style={{display: "inline"}}
                                       type="radio"
                                       value={false}
                                       name='isSpecialService'
                                       checked={props.state.isSpecialService === 'false'}
                                       onClick={props.changeRadioButtonState}/>
                                No
                            </label>
                        </div>
                    </div>
                </div>
                {
                    props.state.isSpecialService === 'false' ?
                        <div>
                            <div className="form-group d-flex mb-0">
                                <label>Available For Batches:</label>
                                <div className="form-group col-md-6 d-flex">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value={true}
                                                   name='allBatches'
                                                   checked={props.state.allBatches === 'true'}
                                                   onClick={props.changeRadioButtonState}/>
                                            All
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value={false}
                                                   name='allBatches'
                                                   checked={props.state.allBatches === 'false'}
                                                   onClick={props.changeRadioButtonState}/>
                                            Selected
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                props.state.allBatches === 'false'
                                    ? <ApllicationSpecificDropDown label={'Batches'}
                                                                   btnLabel={"Select"}
                                                                   options={props.state.batches}
                                                                   name={'batches'}
                                                                   handleOptionChange={props.handleArrayUpdate}/>
                                    : ''
                            }

                            <div className="form-group d-flex mb-0">
                                <label>Available For UserType:</label>
                                <div className="form-group col-md-6 d-flex">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value={true}
                                                   name='allUserTypes'
                                                   checked={props.state.allUserTypes === 'true'}
                                                   onClick={props.changeRadioButtonState}/>
                                            All
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value={false}
                                                   name='allUserTypes'
                                                   checked={props.state.allUserTypes === 'false'}
                                                   onClick={props.changeRadioButtonState}/>
                                            Selected
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                props.state.allUserTypes === 'false'
                                    ? <ApllicationSpecificDropDown label={'User Types'}
                                                                   btnLabel={"Select"}
                                                                   options={props.state.userTypes}
                                                                   name={'userTypes'}
                                                                   handleOptionChange={props.handleArrayUpdate}/>
                                    : ''
                            }

                            <div className="form-group d-flex mb-0">
                                <label>Available For Programmes:</label>
                                <div className="form-group col-md-6 d-flex">
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value={true}
                                                   name='allProgrammes'
                                                   checked={props.state.allProgrammes === 'true'}
                                                   onClick={props.changeRadioButtonState}/>
                                            All
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value={false}
                                                   name='allProgrammes'
                                                   checked={props.state.allProgrammes === 'false'}
                                                   onClick={props.changeRadioButtonState}/>
                                            Selected
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {
                                props.state.allProgrammes === 'false'
                                    ? <ApllicationSpecificDropDown label={'Programmes'}
                                                                   btnLabel={"Select"}
                                                                   options={props.state.programmes}
                                                                   name={'programmes'}
                                                                   handleOptionChange={props.handleArrayUpdate}/>
                                    : ''
                            }
                        </div>
                        : ''
                }
            </div>

        </div>

        <div className={'d-flex justify-content-center mt-4'}>
            <input
                className='submit'
                type="submit"
                value="Save"
                onSubmit={props.handleSubmit}/>
        </div>
    </form>
}

export default Form;
