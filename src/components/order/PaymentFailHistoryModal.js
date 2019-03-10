import React from 'react';
import Modal from 'react-bootstrap4-modal';
import _ from 'lodash';
import PaymentFailHistoryModalCard from './PaymentFailHistoryModalCard';


class PaymentFailHistoryModal extends React.PureComponent {

    render() {
        const paymentFailHistoryList = this.props.inputList;
        return (
            <Modal visible={this.props.openModal}>
                <div className="modal-header" id='order_position'>
                    <div className={'w-100'}>
                        <h5 className="modal-title w-100 text-center">{"Payment Fail History"}</h5>
                    </div>
                </div>
                <div className="modal-body payment-fail">
                {
                    _.map(paymentFailHistoryList, (o) => <PaymentFailHistoryModalCard 
                                                            paymentId={o.paymentId}
                                                            paymentDate={o.paymentDate}
                                                            paymentType={o.paymentType} />)
                }
                </div>
                <div className="modal-footer"></div>
            </Modal>
        )
    }
}

export default PaymentFailHistoryModal;