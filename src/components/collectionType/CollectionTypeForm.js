import React from 'react'

function CollectionTypeForm(props) {
    return <form autoComplete="off" onSubmit={props.handleSubmit}>
        <div className="form-row">
            <div className="form-group col-md-6">
                <label>CollectionType Name</label>
                <input
                    className={'form-control'}
                    type="text"
                    name="name"
                    placeholder="Enter CollectionType Name"
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
            <label>CollectionType Description</label>
            <textarea
                className={'form-control'}
                name="description"
                placeholder="Write CollectionType Description"
                value={props.state.description}
                onChange={props.handleChange}>
                            </textarea>
        </div>
        <div className="form-group">
            <label>CollectionType Category</label>
            <div className="col-9" style={{display: 'flex'}}>

                <div className="form-check form-check-inline">

                    <label className="form-check-label">

                        <input className="form-check-input"

                               style={{display: "inline"}}

                               type="radio"

                               value="Pickup"

                               checked={props.state.category === "Pickup"}

                               onClick={(e)=>{
                                   e.target.checked = true;
                                   props.handleCategoryChange(e);
                               }}

                        />

                        Pickup

                    </label>

                </div>

                <div className="form-check form-check-inline">

                    <label className="form-check-label">

                        <input className="form-check-input"

                               style={{display: "inline"}}

                               type="radio"

                               value="Delivery"

                               checked={props.state.category === "Delivery"}

                               onClick={props.handleCategoryChange}/>

                        Delivery

                    </label>

                </div>

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

export default CollectionTypeForm;
