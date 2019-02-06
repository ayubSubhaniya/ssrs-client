import React from 'react'
import ConfirmModal from "./ConfirmModal";

class DeleteButton extends React.PureComponent {
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
            <div>
                <button className="btn btn-outline-danger ml-2"
                    data-index={index}
                    style={{ "textAlign": "justify", "fontSize": "12px", "fontWeight": "550" }}
                    onClick={this.openConfirmationModal}>
                    X
                </button>
                <ConfirmModal open={this.state.isModalOpen}
                    onYes={(event) => this.onYes(index, event)}
                    close={this.closeConfirmationModal}
                    message={message} />
            </div>
        );
    }
}

export default DeleteButton
