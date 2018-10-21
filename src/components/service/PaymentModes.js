import React from 'react'
import {OFFLINE, ONLINE} from "../../constants/constants";

function Mode({text,mode,isChecked,onChange}) {
    return (
        <div className={'form-check mr-4'}>
            <label>
                <input className="form-check-input"
                       type="checkbox"
                       name={mode}
                       checked={isChecked}
                       onChange={onChange}/>
                {text}
            </label>
        </div>
    )
}

function PaymentModes(props) {
    return (
        <div
            className={'form-group col-md-6'}>
            <label>
                Payment Modes
            </label>
            <div className={'bg-white pt-2 d-flex'}>
                <Mode onChange={props.handleChange}
                      mode={OFFLINE}
                      text={'Cash(Offline)'}
                      isChecked={props.paymentModes[OFFLINE]}/>
                <Mode onChange={props.handleChange}
                      mode={ONLINE}
                      text={'Online'}
                      isChecked={props.paymentModes[ONLINE]}/>
            </div>
        </div>
    )
}

export default PaymentModes
