import React from "react"
import Modal from "react-bootstrap4-modal";
import {domainUrl} from '../../config/configuration'
import HttpStatus from 'http-status-codes'

class CourierForm extends React.Component {
    constructor(props) {
        super(props);
        let {data} = props;
        if (data===undefined){
            data={};
        }
        this.state = {
            name: data.name?data.name:'',
            email: data.email?data.email:'',
            contactNo: data.contactNo?data.contactNo:'',
            address: data.address?data.address:'',
            city: data.city?data.city:'',
            pinCode: data.pinCode?data.pinCode:'',
            state: data.state?data.state:'',
            country: data.country?data.country:''
        }
    }

    getCourierDetails = () => {
        const courier = {
            name: this.state.name,
            contactNo: this.state.contactNo,
            email: this.state.email,
            address: {
                line1: this.state.address,
                line2: undefined,
                line3: undefined
            },
            pinCode: this.state.pinCode,
            state: this.state.state,
            city: this.state.city,
            country: this.state.country
        };
        return courier;
    };

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    };


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

                        <div className={'form-group'}>
                            <label>Address: </label>
                            <input name='address'
                                   className={'form-control'}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>City:</label>
                            <input name='city'
                                   className={'form-control'}
                                   type={'text'}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Pincode:</label>
                            <input name='pinCode'
                                   className={'form-control'}
                                   type={'text'}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>State:</label>
                            <input name='state'
                                   className={'form-control'}
                                   type={'text'}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Country:</label>
                            <input name='country'
                                   className={'form-control'}
                                   type={'text'}
                                   onChange={this.handleChange}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={this.props.close}>Close</button>
                    <button type="submit" className="btn btn-primary" onClick={() => this.props.handleSubmit(this.getCourierDetails())}>Save</button>
                </div>
            </Modal>
        );
    }
}

export default CourierForm
