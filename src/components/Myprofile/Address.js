import React, {Component} from 'react';
import '../../styles/Address.css';
import _ from 'lodash';
import CourierFrom from './AddressForm.js';
import {makeCall} from "../../helper/caller";

let _id = -1;
let id = -1;

class Address extends Component {
    constructor(props) {
        super();
        this.state = {
            visible: false,
            open: false,
            data: [],
            d: {}
        };
    }

    getList(data) {
        return _.map(data, (data, index) => {
            return (<div className={'address-bx animated fadeIn'}>
                <h6>
                    <strong>Collector's Name:</strong>{" " + data.name}
                </h6>
                <h6>
                    <strong>Collector's Contact No. </strong>{" " + data.contactNo}
                </h6>
                <h6>
                    <strong>Collector's email: </strong><a href={"mailto:" + data.email}>{" " + data.email}</a>
                </h6>
                <h6>
                    <strong>Address:</strong>{" " + data.address.line1 + ", " + data.city + " - " + data.pinCode + ", " + data.state + ", " + data.country}
                </h6>
                <button type="button" class="btn btn-light" onClick={() => this.openModal(data._id, index, data)}>Edit
                </button>
                <button type="button" class="btn btn-light ml-4"
                        onClick={() => this.deleteAddress(data._id, index)}>Delete
                </button>
            </div>);
        });
    }

    deleteAddress = (id, index) => {
        makeCall({jobType: 'DELETE', urlParams: '/user/address/' + id}).then((response) => {
            this.setState({
                data: [...this.state.data.slice(0, index), ...this.state.data.slice(index + 1)]
            })
        })
    }

    getAddresses = () => {
        makeCall({jobType: 'GET', urlParams: '/user/address'}).then((response) => {
            this.setState({
                data: response.addresses
            })
        })
    }
    postAddress = (newAddress) => {
        makeCall({jobType: 'POST', urlParams: '/user/address', params: newAddress}).then((response) => {
            this.closeModal()
            this.setState({
                data: [...this.state.data, response.address]
            })
        })
    }
    editAddress = (updatedAdress) => {
        makeCall({jobType: 'PATCH', urlParams: '/user/address/' + _id, params: updatedAdress})
            .then((response) => {
                this.closeModal();
                this.setState({
                    data: [...this.state.data.slice(0, id), response.address, ...this.state.data.slice(id + 1)]
                })
            })
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    openModal(index1, index2, data) {
        _id = index1;
        id = index2;
        this.setState({
            d: data
        });
        this.setState({
            visible: true
        });
    }

    openM() {
        this.setState({
            open: true
        })
    }

    closeM() {
        this.setState({
            open: false
        })
    }

    componentDidMount() {
        this.getAddresses();
    }

    render() {
        return (
            <div class="address-view">
                {this.getList(this.state.data)}
                <div className={'add-bx'} onClick={() => this.openM()}>
                    +
                    <br/>
                    Add Address
                </div>
                {this.state.visible ?
                    <CourierFrom open={this.state.visible} data={this.state.d} close={() => this.closeModal()}
                                 handleSubmit={this.editAddress}/> : ""}
                <CourierFrom open={this.state.open} close={() => this.closeM()} handleSubmit={this.postAddress}/>
            </div>
        );
    }
}

export default Address;
