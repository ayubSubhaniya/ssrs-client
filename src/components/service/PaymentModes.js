import React from 'react'
import {COD, DEBITCARD, NETBANKING, PAYTM} from "../../constants/PaymentMode";
import Mode from "./Mode";

function PaymentModes(props) {
    return (
        <div
            className={'form-group col-sm-6'}>
            <label>
                Payment Modes
            </label>
            <div className={'bg-white'}>
                <Mode onChange={props.handleChange}
                      mode={COD}
                      text={'Cash(Offline)'}
                      isChecked={props.paymentModes[COD]}/>
                <Mode onChange={props.handleChange}
                      mode={DEBITCARD}
                      text={'Debit Card'}
                      isChecked={props.paymentModes[DEBITCARD]}/>
                <Mode onChange={props.handleChange}
                      mode={NETBANKING}
                      text={'Netbanking'}
                      isChecked={props.paymentModes[NETBANKING]}/>
                <Mode onChange={props.handleChange}
                      mode={PAYTM}
                      text={'Paytm'}
                      isChecked={props.paymentModes[PAYTM]}/>
            </div>
        </div>
    )
}

export default PaymentModes
