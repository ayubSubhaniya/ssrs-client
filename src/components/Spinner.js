import React from 'react';
import Modal from 'react-bootstrap4-modal';
class Spinner extends React.Component {
    render() {
        return (
            <Modal visible={this.props.open} className={'spinner'} >
                <span className="fa fa-spinner fa-spin fa-3x"></span>
            </Modal>
        );
    }
}

export default Spinner;
