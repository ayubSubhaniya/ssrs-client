import React, {Component} from 'react';
import '../../styles/Address.css';
import _ from 'lodash';
import CourierFrom from './AddressForm.js';
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

let _id = -1;
let id = -1;

function AddressList({addresses, openEditAddressModal, deleteAddress}) {
    return _.map(addresses, (addresse, index) => {
        return (<div className={'address-bx animated fadeIn'}>
            <span className='address-cross' onClick={() => deleteAddress(addresse._id, index)}>x</span>
            <h6 className='mb-2 mt-0'>
                <strong>{addresse.name}</strong>
            </h6>
            <h6 className='mb-2'>
                {addresse.address.line1} <br/>
                {addresse.city}<br/>
                {addresse.state + ", " + addresse.country}<br/>
                {addresse.pinCode}<br/>
            </h6>
            <h6 className='mb-2'>
                {" " + addresse.contactNo}
            </h6>
            <h6 className='mb-2'>
                <a href={"mailto:" + addresse.email}>{" " + addresse.email}</a>
            </h6>
            <button type="button" className="btn btn-outline-dark address-edit"
                    onClick={() => openEditAddressModal(addresse._id, index, addresse)}>
                Edit
            </button>
        </div>);
    });
}

class Address extends Component {
    constructor() {
        super();
        this.state = {
            isEditAddressModalOpen: false,
            isNewAddressModalOpen: false,
            address: [],
            currentAddress: {}
        };
    }

    componentDidMount() {
        this.getAddresses();
    }

    deleteAddress = (id, index) => {
        makeCall({jobType: 'DELETE', urlParams: '/user/address/' + id}).then((response) => {
            this.setState({
                addresses: [...this.state.addresses.slice(0, index), ...this.state.addresses.slice(index + 1)]
            })
        })
            .catch((error) => {
                handleError(error);
            })
    }

    getAddresses = () => {
        makeCall({jobType: 'GET', urlParams: '/user/address'}).then((response) => {
            this.setState({
                addresses: response.addresses
            })
        }).catch((error) => {
            handleError(error);
        })
    }
    postAddress = (newAddress) => {
        makeCall({jobType: 'POST', urlParams: '/user/address', params: newAddress}).then((response) => {
            this.closeNewAddressModal()
            this.setState({
                addresses: [...this.state.addresses, response.address]
            })
        }).catch((error) => {
            handleError(error);
        })
    }
    editAddress = (updatedAdress) => {
        makeCall({jobType: 'PATCH', urlParams: '/user/address/' + _id, params: updatedAdress})
            .then((response) => {
                this.closeEditAddressModal();
                this.setState({
                    addresses: [...this.state.addresses.slice(0, id), response.address, ...this.state.addresses.slice(id + 1)]
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    closeEditAddressModal = () => {
        this.setState({
            isEditAddressModalOpen: false
        });
    }

    openEditAddressModal = (index1, index2, address) => {
        _id = index1;
        id = index2;
        this.setState({
            currentAddress: address
        });
        this.setState({
            isEditAddressModalOpen: true
        });
    }

    openNewAddressModal = () => {
        this.setState({
            isNewAddressModalOpen: true
        })
    }

    closeNewAddressModal = () => {
        this.setState({
            isNewAddressModalOpen: false
        })
    }

    render() {
        return (
            <div class="address-view">
                <AddressList addresses={this.state.addresses}
                             deleteAddress={this.deleteAddress}
                             openEditAddressModal={this.openEditAddressModal}/>
                <div className={'add-bx'} onClick={this.openNewAddressModal}>
                   <div className='add-plus'> + </div>
                    <div>Add New Address</div>
                </div>
                {
                    this.state.isEditAddressModalOpen
                        ? <CourierFrom open={this.state.isEditAddressModalOpen}
                                       data={this.state.currentAddress}
                                       close={this.closeEditAddressModal}
                                       handleSubmit={this.editAddress}/>
                        : ""
                }
                {
                    this.state.isNewAddressModalOpen
                        ? <CourierFrom open={this.state.isNewAddressModalOpen}
                                       close={this.closeNewAddressModal}
                                       handleSubmit={this.postAddress}/>
                        : ""
                }
            </div>
        );
    }
}

export default Address;
