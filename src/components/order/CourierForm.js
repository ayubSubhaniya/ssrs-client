import React from 'react'
import Modal from "react-bootstrap4-modal";
import {handleChange} from "../../helper/StateUpdate";
import {rcartStatus} from "../../constants/status";

class CourierForm extends React.Component{
    constructor(){
        super();
        this.state = {
            courierServiceName: '',
            trackingId: ''
        }
        this.handleChange = handleChange.bind(this);
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                   className={'animated ' + (this.props.visible ? 'fadeIn' : 'fadeOut')}
                   onClickBackdrop={this.props.closeModal}>

                <div className="modal-header">
                    <h5 className="modal-title">Enter Courier Details!</h5>
                    <button type="button" className="close" onClick={this.props.closeModal}><span
                        aria-hidden="true">&times;</span></button>
                </div>

                <div className="modal-body">
                    <form autoComplete='off' onSubmit={(e) => {
                        e.preventDefault();
                        this.props.onSubmit({
                            courierServiceName: this.state.courierServiceName,
                            trackingId: this.state.trackingId,
                            status: rcartStatus.completed
                        })
                    }}>
                        <div className="form-group">
                            <label>Service Name</label>
                            <input className={'form-control'}
                                   name="courierServiceName"
                                   type="text"
                                   value={this.state.courierServiceName}
                                   onChange={this.handleChange}
                                   placeholder={"Enter Courier Service Name"}
                                   aria-describedby="basic-addon"/>
                        </div>
                        <div className="form-group">
                            <label>Tracking ID</label>
                            <input className={'form-control'}
                                   name="trackingId"
                                   type="text"
                                   value={this.state.trackingId}
                                   onChange={this.handleChange}
                                   placeholder={"Enter Tracking ID"}
                                   aria-describedby="basic-addon"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Submit</button>
                    </form>
                </div>
            </Modal>
        )
    }
}

export default CourierForm
