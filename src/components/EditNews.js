import React from 'react'
import Modal from "react-bootstrap4-modal";

class EditNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message
        };
    }

    handleChange = (e) => {
        this.setState({
            message: e.target.value
        })
    };

    render() {
        return (
            <Modal visible={this.props.visible}
                   className={'animated ' + (this.props.visible ? 'rotateIn' : 'rotateOut')}
                   onClickBackdrop={this.props.closeModal}>

                <div className="modal-header">
                    <h5 className="modal-title">Edit News!</h5>
                    <button type="button" className="close" onClick={this.props.closeModal}><span
                        aria-hidden="true">&times;</span></button>
                </div>

                <div className="modal-body">
                    <form>
                        <div className="input-group">
                            <input className={'form-control'}
                                   name="message"
                                   type="text"
                                   value={this.state.message}
                                   onChange={this.handleChange}
                                   placeholder={"Enter modified News"}
                                   aria-describedby="basic-addon"/>
                            <div className="input-group-append">
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary mt-3" onClick={() => {
                            this.props.closeModal();
                            this.props.onUpdate(this.state.message)
                        }}>Save
                        </button>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default EditNews
