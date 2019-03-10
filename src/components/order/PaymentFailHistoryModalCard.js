import React, {PureComponent} from 'react';
import {camelCaseToWords} from "../../helper/String";

class PaymentFailHistoryModalCard extends PureComponent {

    render() {
        return(
            <div className="payment-fail-card">
                <h6>{this.props.paymentId}</h6>
                <h6>{this.props.paymentDate}</h6>
                <h6>{camelCaseToWords(this.props.paymentType)}</h6>
                
            </div>
        )
    }
}

export default PaymentFailHistoryModalCard;

