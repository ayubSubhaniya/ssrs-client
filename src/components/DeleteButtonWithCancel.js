import React from 'react'
import ConfirmModal from "./ConfirmModal";

class DeleteButtonWithCancel extends React.Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false
        }
    }

    openConfirmationModal = () => {
        this.setState({
            isModalOpen: true
        })
    }

    closeConfirmationModal = () => {
        this.setState({
            isModalOpen: false
        })
    }

    onYes = (index, event) => {
        this.props.handleClick(index, event);
        this.closeConfirmationModal();
    }

    render() {
        const { index, message } = this.props;
        return (
            <div id="delete_button">
                <button className="btn btn-outline-danger"
                    data-index={index}
                    style={{width: '70px'}}
                   
                    
                    onClick={this.openConfirmationModal}>
                    Cancel
                </button>
                <ConfirmModal open={this.state.isModalOpen}
                    onYes={(event) => this.onYes(index, event)}
                    close={this.closeConfirmationModal}
                    message={message} />
            </div>
        );
    }
}

export default DeleteButtonWithCancel
