import React, {Component} from 'react';
import '../../styles/Address.css';
import CourierFrom from './AddressForm.js';
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import AddressList from "./AddressList"

let _id = -1;
let id = -1;


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
                             openNewAddressModal={this.openNewAddressModal}
                             openEditAddressModal={this.openEditAddressModal}/>
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
