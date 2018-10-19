import React from 'react'
import ConfirmModal from "./ConfirmModal";

class DeleteButton extends React.Component {
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
        const {index} = this.props;
        return (
            <button className="btn btn-danger btn-sm ml-2"
                    data-index={index}
                    style={{"fontSize": "20px", "color": "black"}}
                    onClick={this.openConfirmationModal}>
                <i className="fa fa-trash-o"
                   data-index={index}></i>
                <ConfirmModal open={this.state.isModalOpen}
                              onYes={(event) => this.onYes(index, event)}
                              close={this.closeConfirmationModal}/>
            </button>
        );
    }
}

export default DeleteButton
