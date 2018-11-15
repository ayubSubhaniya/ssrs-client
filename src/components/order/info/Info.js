import React from 'react'
import Stapes from "../../service/Stapes";
import NavigationBar from "../../NavigationBar";
import AddressForm from "../../Myprofile/AddressForm";
import {withRouter} from "react-router-dom"
import CollectionTypesDropDown from "../../service/CollectionTypesDropDown"
import AddressList from "../../Myprofile/AddressList";
import PickUpDetails from "../PickUpDetails";
import PickupForm from "../PickupForm";
import {errorMessages} from '../../../config/configuration'
import * as HttpStatus from 'http-status-codes'
import ErrorMessage from "../../error/ErrorMessage";
import {makeCall} from "../../../helper/caller";
import _ from "lodash"
import {collectionTypeCategory} from "../../../constants/constants";
import {deleteAddress, getCart} from "../../../helper/FetchData";
import {handleError} from "../../../helper/error";

const {DELIVERY, PICKUP} = collectionTypeCategory


class Info extends React.Component {
    constructor(props) {
        super(props);
        this.avilableCollectionTypes = props.location.state.avilableCollectionTypes;
        this.id = props.location.state.id;
        this.state = {
            addresses: [],
            cart: [],
            selectedAddress: -1,
            editAddress: false,
            collectionTypes: this.avilableCollectionTypes,
            selectedCollectionTypeIndex: 0,
            isCollectionTypeInfoProvided: false
        };
        this.deleteAddress = deleteAddress.bind(this);
    }

    componentDidMount() {
        this.getAddress();
        getCart(this.setCart);
    }

    setCart = (response) => {
        let index = _.findIndex(this.avilableCollectionTypes, (x) => x._id === response.cart.collectionType)
        index = index == -1 ? _.findIndex(this.avilableCollectionTypes, (x) => x.category === PICKUP) : index;
        this.setState({
            cart: response.cart,
            selectedCollectionTypeIndex: index != -1 ? index : 0,
            isCollectionTypeInfoProvided: Boolean(response.cart.collectionType)
        })
    }

    getAddress = () => {
        makeCall({jobType: 'GET', urlParams: '/user/address'}).then((response) => {
            this.setState({
                addresses: response.addresses
            })
        })
            .catch((error) => {
                handleError(error);
            })
    }

    updateSelectedAddress = (index) => {
        const cart = this.state.cart;
        cart.delivery = this.state.addresses[index];
        this.setState({
            selectedAddress: index,
            cart: cart,
            isCollectionTypeInfoProvided: true
        })
    }

    openAddressModal = () => {
        this.setState({
            editAddress: true
        })
    };
    closeAddressModal = () => {
        this.setState({
            editAddress: false
        })
    };

    cleanErrorMessage = () => {
        this.setState({
            errorMessage: ''
        })
    };

    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message
        })
    }

    addAddress = (newAddress) => {
        makeCall({
            jobType: 'POST',
            urlParams: '/user/address',
            params: newAddress
        })
            .then((response) => {
                this.closeAddressModal();
                this.setState({
                    addresses: [...this.state.addresses, response.address]
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    handleCollectionTypeChange = ({target}) => {
        let index = target.dataset.index;
        if (!index)
            index = target.parentNode.dataset.index;
        this.setState({
            selectedCollectionTypeIndex: Number(index)
        });
    };

    onError = (response) => {
        if (response.status === HttpStatus.PRECONDITION_FAILED) {
            this.setErrorMessage(response.statusText);
        } else if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.setErrorMessage(errorMessages.internalServerError);
        } else if (response.status === HttpStatus.FORBIDDEN) {
            this.setErrorMessage(errorMessages.forbidden);
        } else if (response.status === HttpStatus.NOT_FOUND) {
            this.setErrorMessage('Cart not found');
        } else {
            this.setErrorMessage(errorMessages.somethingsWrong);
        }
    }

    redirect = (data) => {
        this.props.history.push({
            pathname: '/payment'
        });
    }

    handleDeliveryDataSubmit = () => {
        const selectedCollectionType = this.state.collectionTypes[this.state.selectedCollectionTypeIndex];

        if (selectedCollectionType.category === PICKUP) {
            this.redirect(selectedCollectionType)
            return;
        }

        const address = this.state.addresses[this.state.selectedAddress];
        address._id = undefined;
        makeCall({
            jobType: 'POST',
            urlParams: '/cart/delivery/' + this.state.collectionTypes[this.state.selectedCollectionTypeIndex]._id,
            params: address
        })
            .then(() => this.redirect(selectedCollectionType))
            .catch((response) => {
                this.closeAddressModal();
                this.onError(response);
            })
    };

    handlePickupDataSubmit = (data) => {
        const selectedCollectionType = this.state.collectionTypes[this.state.selectedCollectionTypeIndex];
        makeCall({
            jobType: 'POST',
            urlParams: '/cart/pickup/' + selectedCollectionType._id,
            params: data
        })
            .then((response) => {
                const cart = this.state.cart;
                cart.pickup = data;
                this.setState({
                    cart: cart,
                    isCollectionTypeInfoProvided: true
                })
                this.closeAddressModal()
            })
            .catch((response) => {
                this.closeAddressModal()
                this.onError(response);
            })
    };

    render() {
        const selectedCollectionType = this.state.selectedCollectionTypeIndex !== -1
            ? this.state.collectionTypes[this.state.selectedCollectionTypeIndex]
            : undefined
        const SelectedCollectionTypeName = selectedCollectionType
            ? selectedCollectionType.name + " (₹" + selectedCollectionType.baseCharge + ")"
            : 'Select';
        return (
            <div>
                <NavigationBar/>
                <div className='container mb-4'>
                    <Stapes active={2}/>
                    <hr/>
                    <div className={'col-sm-6'}>
                        <CollectionTypesDropDown label={'Collection Type'} options={this.state.collectionTypes}
                                                 btnLabel={SelectedCollectionTypeName}
                                                 handleOptionChange={this.handleCollectionTypeChange}/>
                    </div>
                    <hr/>
                    <div className="page-main">
                        <div className="address-box">
                            <div className="address-title">
                                <h3 className="title">
                                    Recipient information
                                </h3>
                            </div>
                            {
                                selectedCollectionType.category === DELIVERY
                                    ? <div className="address-view">
                                        <AddressList addresses={this.state.addresses}
                                                     selected={this.state.selectedAddress}
                                                     deleteAddress={this.deleteAddress}
                                                     selected={this.state.selectedAddress}
                                                     handleClick={this.updateSelectedAddress}
                                                     openNewAddressModal={this.openAddressModal}/>
                                    </div>
                                    : <PickUpDetails data={this.state.cart.pickup}
                                                     openAddressModal={this.openAddressModal}/>
                            }
                            {
                                selectedCollectionType.category === DELIVERY
                                    ? <AddressForm open={this.state.editAddress}
                                                   close={this.closeAddressModal}
                                                   handleSubmit={this.addAddress}/>
                                    : <PickupForm open={this.state.editAddress}
                                                  close={this.closeAddressModal}
                                                  handleSubmit={this.handlePickupDataSubmit}
                                                  data={this.state.cart.pickup}/>
                            }
                        </div>
                        <hr/>
                    </div>
                    <ErrorMessage message={this.state.errorMessage}
                                  clearMessage={this.cleanErrorMessage}/>
                    <ErrorMessage
                        message={this.state.isCollectionTypeInfoProvided ? '' : errorMessages.noCollectionTypes}/>
                    <div className={this.state.isCollectionTypeInfoProvided ? '' : 'disabled-link'}
                         onClick={this.handleDeliveryDataSubmit}>
                        <div className='btn place-order submit mb-4'>PLACE ORDER</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Info)
