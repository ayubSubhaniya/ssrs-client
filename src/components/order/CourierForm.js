import React from "react"
import Modal from "react-bootstrap4-modal";
import {domainUrl} from '../../config/configuration'
import HttpStatus from 'http-status-codes'

class CourierForm extends React.Component {
    constructor(props) {
        super(props);
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

    getCourierDetails = () => {
        const courier = {
            name: this.state.name,
            contactNo: this.state.contactNo,
            email: this.state.email,
            address: {
                line1: this.state.address,
                line2: "ads",
                line3: "asdas"
            },
            pinCode: this.state.pinCode,
            state: this.state.state,
            city: this.state.city,
            country: this.state.country
        }
        return courier;
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(this.getCourierDetails(this.state));
        this.props.history.push('/cart')
        const that = this;
        const url = domainUrl + '/order/'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.CREATED) {
                const response = JSON.parse(request.response)
                console.log(response);
                that.props.history.push('/cart')
            }
        }
        // request.send(JSON.stringify(this.getOrderDetails(this.state)));
    }

    render() {
        return (
            <Modal visible={true}>
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
                <input
                    className='submit mb-2'
                    onClick={this.handleSubmit}
                    type="submit"
                    value="Add To Cart"/>
            </Modal>
        );
    }
}

export default CourierForm
