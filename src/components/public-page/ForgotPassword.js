import React from 'react'
import Modal from "react-bootstrap4-modal";

function ForgotPassword(props) {
    return (
        <Modal visible={props.visible}>
            <div className="modal-header">
                <h5 className="modal-title">Forgot Password!</h5>
            </div>

            <div className={"modal-close-btn"}
                 onClick={props.closeModal}>
                <i className="material-icons">close</i>
            </div>
            <div className="modal-body">
                <form>
                    <div className="input-group">
                        <input className={'form-control'}
                               name="daiictId"
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
                    <button type="button" className="btn btn-primary mt-3" onClick={props.onSubmit}>Submit</button>
                </form>
            </div>
        </Modal>
    )
}

export default ForgotPassword
