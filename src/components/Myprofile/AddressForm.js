import React from "react"
import Modal from "react-bootstrap4-modal";

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        let {data} = props;
        if(data) {
            this.state = {
                name: data.name,
                email: data.email,
                contactNo: data.contactNo,
                address: data.address.line1,
                city: data.city,
                pinCode: data.pinCode,
                state: data.state,
                country: data.country
            }
        }else{
            this.state = {
                name: '',
                email: '',
                contactNo: '',
                address: '',
                city: '',
                pinCode: '',
                state: '',
                country: ''
            }
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
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        this.props.handleSubmit(this.getCourierDetails())
                    }}>
                        <div className={'modal-body'}>
                        
                        <div className={'form-group'} id="position_address">
                            <label>Name:</label>
                            <input name="name"
                                   value={this.state.name}
                                   onChange={this.handleChange}
                                   required='true'
                                   className={'form-control'} type={'text'}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Email: </label>
                            <input name='email'
                                   value={this.state.email}
                                   onChange={this.handleChange}
                                   required='true'
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

                        <div className={'form-group'}>
                            <label>Address: </label>
                            <input name='address'
                                   className={'form-control'}
                                   value={this.state.address}
                                   required='true'
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>City:</label>
                            <input name='city'
                                   className={'form-control'}
                                   type={'text'}
                                   required='true'
                                   value={this.state.city}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Pincode:</label>
                            <input name='pinCode'
                                   className={'form-control'}
                                   type={'text'}
                                   value={this.state.pinCode}
                                   required='true'
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>State:</label>
                            <input name='state'
                                   className={'form-control'}
                                   value={this.state.state}
                                   type={'text'}
                                   required='true'
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={'form-group'}>
                            <label>Country:</label>
                            <input name='country'
                                   className={'form-control'}
                                   type={'text'}
                                   value={this.state.country}
                                   required='true'
                                   onChange={this.handleChange}/>
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

export default AddressForm
