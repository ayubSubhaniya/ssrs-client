import React from 'react';
import Modal from 'react-bootstrap4-modal';

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal visible={this.props.open} >
                <div className="modal-header">
                    <h5 className="modal-title">Confirmation!</h5>
                </div>
                <div className="modal-body">
                    <p>Are you sure?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={this.props.close}>
                        No
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.props.onYes}>
                        Yes
                    </button>
                </div>
            </Modal>
        );
    }
}

export default ConfirmModal;
