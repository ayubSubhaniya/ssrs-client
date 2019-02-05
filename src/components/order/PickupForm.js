import React from "react"
import Modal from "react-bootstrap4-modal";

class PickupForm extends React.Component {
    constructor(props) {
        super(props);
        let {data} = props;
        if (data === undefined) {
            data = {};
        }
        this.state = {
            name: data.name ? data.name : '',
            daiictId: data.daiictId ? data.daiictId : '',
            email: data.email ? data.email : '',
            contactNo: data.contactNo ? data.contactNo : '',
            showSpinner: false
        }
    }

    getPickupDetails = () => {
        const pickup = {
            name: this.state.name,
            daiictId: this.state.daiictId !== '' ? this.state.daiictId : undefined,
            contactNo: this.state.contactNo,
            email: this.state.email,
        }
        return pickup;
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    render() {
        return (
            <Modal visible={this.props.open}>
                <form autoComplete="off" onSubmit={(e) => {
                    e.preventDefault();
                    this.props.handleSubmit(this.getPickupDetails())
                }}>
                    <div className={'modal-body'}>
                        <div className={'form-group'}>
                            <label>Name:</label>
                            <input name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   required='true'
                                   className={'form-control'} type={'text'}/>
                        </div>
                        <div className={'form-group'}>
                            <label>DA-IICT ID: </label>
                            <input name='daiictId'
                                   value={this.state.daiictId}
                                   onChange={this.handleChange}
                                   className={'form-control'} type={'tel'}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Email: </label>
                            <input name='email'
                                   value={this.state.email}
                                   required='true'
                                   onChange={this.handleChange}
                                   className={'form-control'} type={'email'}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Contact No: </label>
                            <input name='contactNo'
                                   value={this.state.contactNo}
                                   onChange={this.handleChange}
                                   required='true'
                                   pattern="[0-9]{10}"
                                   className={'form-control'} type={'tel'}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.props.close}>Close</button>
                        <button type="submit" className="btn btn-primary">Save
                        </button>
                    </div>
                </form>
            </Modal>
        );
    }
}

export default PickupForm;
