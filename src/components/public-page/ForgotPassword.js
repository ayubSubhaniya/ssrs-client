import React from 'react'
import Modal from "react-bootstrap4-modal";
import ErrorMessage from "../error/ErrorMessage";

function ForgotPassword(props) {
    return (
        <Modal visible={props.visible}
               className={'animated ' + (props.visible ? 'rotateIn' : 'rotateOut')}
               onClickBackdrop={props.closeModal}>

            <div className="modal-header">
                <h5 className="modal-title">Forgot Password!</h5>
                <button type="button" className="close" onClick={props.closeModal}><span
                    aria-hidden="true">&times;</span></button>
            </div>

            <div className="modal-body">
                <form>
                    <div className="input-group">
                        <input className={'form-control'}
                               name="forgotPasswordOfID"
                               type="text"
                               value={props.value}
                               onChange={props.handleChange}
                               placeholder={"Enter DA-IICT ID"}
                               aria-describedby="basic-addon"/>
                        <div className="input-group-append">
                                                            <span className="input-group-text"
                                                                  id="basic-addon">@daiict.ac.in</span>
                        </div>
                    </div>
                    <ErrorMessage message={props.errorMessage} clearMessage={props.clearErrorMessage}/>
                    <button type="button" className="btn btn-primary mt-3" onClick={props.onSubmit}>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ForgotPassword
