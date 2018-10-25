import React from 'react'

function ParameterForm(props) {
    return <form autoComplete="off" onSubmit={props.handleSubmit}>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label>Parameter Name</label>
                <input
                    className={'form-control'}
                    type="text"
                    name="name"
                    placeholder="Enter Parameter Name"
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
            <label>Parameter Description</label>
            <textarea
                className={'form-control'}
                name="description"
                required={true}
                placeholder="Write Parameter Description"
                value={props.state.description}
                onChange={props.handleChange}>
                            </textarea>
        </div>
        <div className={'d-flex justify-content-center mt-4'}>
            <input
                className='submit'
                type="submit"
                value="Save"/>
        </div>
    </form>
}

export default ParameterForm;
