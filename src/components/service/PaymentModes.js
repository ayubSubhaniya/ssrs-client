import React from 'react'
import {OFFLINE, ONLINE} from "../../constants/PaymentMode";

function Mode({text,mode,isChecked,onChange}) {
    return (
        <div className={'form-check'}>
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
            className={'form-group col-sm-6'}>
            <label>
                Payment Modes
            </label>
            <div className={'bg-white'}>
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
