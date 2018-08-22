import React, {Component} from 'react'
import {ButtonToolbar, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {COD, DEBITCARD, NETBANKING, PAYTM} from "../../constants/PaymentMode";

function PaymentModes(props) {
    return (
        <div
            className={'form-group col-sm-6'}>
            <label>
                Payment Mode
            </label>
            <ButtonToolbar>
                <ToggleButtonGroup
                    type="checkbox"
                    defaultValue={props.paymentModes}
                    onChange={props.handleChange}>
                    <ToggleButton
                        value={COD}>
                        Cash(Offline)
                    </ToggleButton>
                    <ToggleButton
                        value={DEBITCARD}>
                        Debit Card
                    </ToggleButton>
                    <ToggleButton
                        value={NETBANKING}>
                        Netbanking
                    </ToggleButton>
                    <ToggleButton
                        value={PAYTM}>
                        Paytm
                    </ToggleButton>
                </ToggleButtonGroup>
            </ButtonToolbar>
        </div>
    )
}

export default PaymentModes
