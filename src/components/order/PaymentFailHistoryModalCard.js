import React, { PureComponent } from 'react';
import { camelCaseToWords } from "../../helper/String";

class PaymentFailHistoryModalCard extends PureComponent {

    render() {
        const dateNtime = this.props.paymentDate.split(' ');
        return (
            <div className="payment-fail-card">
                <div>
                    <span className="mr-3 mb-3"><strong>{"Payment ID:"}</strong></span>{this.props.paymentId}<br/>
                    <span className="mr-3"><strong>{"Gateway:"}</strong></span>{camelCaseToWords(this.props.paymentType)}
                </div>
                <div className="payment-fail-card-right">
                    {dateNtime[0]}<br/>
                    {dateNtime[1]}
                </div>
            </div>
        )
    }
}

export default PaymentFailHistoryModalCard;

