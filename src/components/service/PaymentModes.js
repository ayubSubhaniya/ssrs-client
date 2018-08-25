import React from 'react'
import {COD, DEBITCARD, NETBANKING, PAYTM} from "../../constants/PaymentMode";

function PaymentModes(props) {
    return (
        <div
            className={'form-group col-sm-6'}>
            <label>
                Payment Modes
            </label>
            <div className={'bg-white'}>
                <div className={'form-check'}>
                    <label>
                        <input className="form-check-input"
                               type="checkbox"
                               name={COD}
                               checked={props.paymentModes[COD]}
                               onChange={props.handleChange}/>
                        Cash(Offline)
                    </label>
                </div>
                <div className={'form-check'}>
                    <label>
                        <input className="form-check-input"
                               type="checkbox"
                               name={DEBITCARD}
                               onChange={props.handleChange}
                               checked={props.paymentModes[DEBITCARD]}
                        />
                        Debit Card
                    </label>
                </div>
                <div className={'form-check'}>
                    <label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name={NETBANKING}
                            checked={props.paymentModes[NETBANKING]}
                            onChange={props.handleChange}/>
                        Netbanking
                    </label>
                </div>
                <div className={'form-check'}>
                    <label>
                        <input className="form-check-input"
                               type="checkbox"
                               name={PAYTM}
                               checked={props.paymentModes[PAYTM]}
                               onChange={props.handleChange}/>
                        Paytm
                    </label>
                </div>
            </div>
        </div>
    )
}

export default PaymentModes
