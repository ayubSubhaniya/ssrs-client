import React from 'react'
import Modal from "react-bootstrap4-modal";
import ErrorMessage from "../error/ErrorMessage";

function ForgotPassword(props) {
    return (
        <Modal visible={props.visible}
               className={'animated ' + (props.visible ? 'FadeIn' : 'FadeOut')}
               onClickBackdrop={props.closeModal}>

            <div className="modal-header">
                <h5 className="modal-title">Forgot Password!</h5>
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
                    </div>
                    <ErrorMessage message={props.errorMessage} clearMessage={props.clearErrorMessage}/>
                    <div className={"d-flex justify-content-center"}>
                        <button type="button" className="btn btn-outline-primary mt-3" onClick={props.onSubmit}>Submit</button>
                        <button type="button" className="btn btn-outline-danger mt-3 ml-2" onClick={props.closeModal}>Close</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default ForgotPassword
