import React from 'react'

function CourierDetailsForm(props) {
    console.log(props);
    return (
        <div className={props.visible?'':'d-none'}>
            <div className={'form-group'}>
                <label>Name: </label>
                <input className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'}>
                <label>Email: </label>
                <input className={'form-control'} type={'email'}/>
            </div>
            <div className={'form-group'}>
                <label>Contact No: </label>
                <input className={'form-control'} type={'tel'}/>
            </div>
            <div className={'form-group'}>
                <label>Address: </label>
                <input className={'form-control'}/>
            </div>
            <div className={'form-group'}>
                <label>City:</label>
                <input className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'}>
                <label>Pincode:</label>
                <input className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'}>
                <label>State:</label>
                <input className={'form-control'} type={'text'}/>
            </div>
            <div className={'form-group'}>
                <label>Country:</label>
                <input className={'form-control'} type={'text'}/>
            </div>
        </div>
    )
}

export default CourierDetailsForm
