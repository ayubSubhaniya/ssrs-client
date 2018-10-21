import React from 'react'
import Modal from "react-bootstrap4-modal";
import {handleChange} from "../../helper/StateUpdate";

class TextInputModal extends React.Component{
    constructor(){
        super();
        this.state = {
            data: ''
        }
        this.handleChange = handleChange.bind(this);
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                   className={'animated ' + (this.props.visible ? 'fadeIn' : 'fadeOut')}
                   onClickBackdrop={this.props.closeModal}>

                <div className="modal-header">
                    <h5 className="modal-title">{this.props.text + "!"}</h5>
                    <button type="button" className="close" onClick={this.props.closeModal}><span
                        aria-hidden="true">&times;</span></button>
                </div>

                <div className="modal-body">
                    <form autoComplete='off' onSubmit={(e) => {
                        e.preventDefault();
                        this.props.onSubmit(this.state.data)
                    }}>
                        <div className="input-group">
                            <input className={'form-control'}
                                   name="data"
                                   type="text"
                                   value={this.state.data}
                                   onChange={this.handleChange}
                                   placeholder={this.props.text}
                                   aria-describedby="basic-addon"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default TextInputModal
