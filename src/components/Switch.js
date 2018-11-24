import React from 'react';
import ConfirmModal from "./ConfirmModal";

class Switch extends React.Component {

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
        const {index, isChecked, isDisabled, message} = this.props
        return (
            <label className="switch ml-2 mr-2 mb-0">
                <input type="checkbox"
                       checked={isChecked}
                       onChange={this.openConfirmationModal}
                       disabled={isDisabled}/>
                <span className="slider round"></span>
                <ConfirmModal open={this.state.isModalOpen}
                              onYes={(event) => this.onYes(this.props.index, event)}
                              close={this.closeConfirmationModal}
                              message={message}/>
            </label>
        );
    }
}

export default Switch;
