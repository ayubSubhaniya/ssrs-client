import React from "react"
import Modal from "react-bootstrap4-modal";
import {domainUrl} from '../../config/configuration'
import HttpStatus from 'http-status-codes'

class PickupForm extends React.Component {
    constructor(props) {
        super(props);
        let {data} = props;
        if (data===undefined){
            data={};
        }
        this.state = {
            name: data.name?data.name:'',
            daiictId:data.daiictId?data.daiictId:'',
            email: data.email?data.email:'',
            contactNo: data.contactNo?data.contactNo:'',
        }
    }

    getPickupDetails = () => {
        const pickup = {
            name: this.state.name,
            daiictId: this.state.daiictId!=''?this.state.daiictId:undefined,
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
                <div className={'modal-body'}>
                    <form autoComplete="on">
                        <div className={'form-group'}>
                            <label>Name:</label>
                            <input name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}
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
                                   onChange={this.handleChange}
                                   className={'form-control'} type={'email'}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Contact No: </label>
                            <input name='contactNo'
                                   value={this.state.contactNo}
                                   onChange={this.handleChange}
                                   className={'form-control'} type={'tel'}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={this.props.close}>Close</button>
                    <button type="submit" className="btn btn-primary" onClick={() => this.props.handleSubmit(this.getPickupDetails())}>Save</button>
                </div>
            </Modal>
        );
    }
}

export default PickupForm;
