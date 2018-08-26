import React from 'react'
import PaymentModes from "./PaymentModes";
import MultiSelectDropDownControled from "./MultiSelectDropDownControled";

function Form(props) {
    return <form autoComplete="off" onSubmit={props.handleSubmit}>
        <div className="form-row">
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
        <div className="form-group">
            <label>Service Description</label>
            <textarea
                className={'form-control'}
                name="description"
                placeholder="Write Service Description"
                value={props.state.description}
                onChange={props.handleChange}>
                            </textarea>
        </div>
        <div className="form-group">
            <label>Maximum Unit</label>
            <input
                className={'form-control'}
                type="number"
                min={'1'}
                max={'1000'}
                name="maxUnits"
                placeholder="Enter Maximum Allowed Unit"
                value={props.state.maxUnits}
                onChange={props.handleChange}
                required/>
        </div>
        <PaymentModes
            paymentModes={props.state.paymentModes}
            handleChange={props.handlePaymentModeChange}/>
        <div className="col-sm-6">
            <MultiSelectDropDownControled label={'Collection Type'}
                                          btnLabel={"Select"}
                                          options={props.state.collectionType}
                                          name={'collectionType'}
                                          handleOptionChange={props.handleArrayUpdate}/>

            <MultiSelectDropDownControled label={'Parameters'}
                                          btnLabel={"Select"}
                                          options={props.state.parameter}
                                          name={'parameter'}
                                          handleOptionChange={props.handleArrayUpdate}/>
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
