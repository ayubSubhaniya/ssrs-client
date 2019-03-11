import React from 'react';
import Modal from 'react-bootstrap4-modal';
import _ from 'lodash';
import PaymentFailHistoryModalCard from './PaymentFailHistoryModalCard';


class PaymentFailHistoryModal extends React.PureComponent {

    render() {
        const paymentFailHistoryList = this.props.inputList;
        return (
            <Modal visible={this.props.visible}>
                <div className="modal-header payment-fail-header">
                    <div>
                        <h5 className="modal-title">{"Payment Fail History"}</h5>
                    </div>
                    <div>
                        <button className="btn btn-outline-dark btn-sm" onClick={this.props.closeModal}>
                            <strong className="m-1">X</strong>
                        </button>
                    </div>
                </div>
                <div className="modal-body payment-fail-body">
                {
                    _.map(paymentFailHistoryList, (o) => <PaymentFailHistoryModalCard 
                                                            paymentId={o.paymentId}
                                                            paymentDate={o.paymentDate}
                                                            paymentType={o.paymentType} />)
                }
                </div>
                <div className="modal-footer payment-fail-footer"></div>
            </Modal>
        )
    }
}

export default PaymentFailHistoryModal;