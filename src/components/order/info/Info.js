import React from 'react'
import Stapes from "../../service/Stapes";
import NavigationBar from "../../NavigationBar";
import AddressForm from "../../Myprofile/AddressForm";
import {Redirect, withRouter} from "react-router-dom"
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
import {loadSpinner, unloadSpinner} from '../../../helper/spinner';
import $ from "jquery";

const {DELIVERY, PICKUP} = collectionTypeCategory;


class Info extends React.PureComponent {
    constructor(props) {
        super(props);
        this.availableCollectionTypes = props.location.state.availableCollectionTypes;
        this.mounted = true;
        this.state = {
            addresses: [],
            cart: [],
            selectedAddress: -1,
            editAddress: false,
            selectedCollectionTypeIndex: 0,
        };
        this.deleteAddress = deleteAddress.bind(this);
    }

    componentDidMount() {
        getCart(this.setCart);
    }

    componentWillUnmount() {
        this.mounted = false
    }

    setCart = (response) => {
        let index = _.findIndex(this.availableCollectionTypes, (x) => x._id === response.cart.collectionType);
        index = index === -1 ? _.findIndex(this.availableCollectionTypes, (x) => x.category === PICKUP) : index;
        if (this.mounted) {
            this.setState({
                cart: response.cart,
                selectedCollectionTypeIndex: index !== -1 ? index : 0
            })
        }
        this.getAddress();
    };

    getAddress = () => {
        makeCall({jobType: 'GET', urlParams: '/user/address'})
            .then((response) => {
                if (this.mounted) {
                    this.setState(({cart}) => {
                        return {
                            addresses: response.addresses,
                            selectedAddress: cart.delivery ? _.findIndex(response.addresses, (e) => e._id === cart.delivery._id) : -1
                        }
                    })
                }
            })
            .catch((error) => {
                handleError(error);
            })
    };

    updateSelectedAddress = (index) => {
        const cart = this.state.cart;
        cart.delivery = this.state.addresses[index];
        this.setState({
            selectedAddress: index,
            cart: cart,
        })
    };

    openAddressModal = () => {
        this.setState({
            editAddress: true
        })
    };

    closeAddressModal = () => {
        $(this.modal).modal('hide');
        loadSpinner();
        this.setState({
            editAddress: false
        });
        unloadSpinner();
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
    };

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
    };

    handleCollectionTypeChange = ({target}) => {
        let index = target.dataset.index;
        if (!index)
            index = target.parentNode.dataset.index;
        const cart = this.state.cart;
        if (Number(index) !== this.state.selectedCollectionTypeIndex) {
            cart.delivery = undefined;
            cart.pickup = undefined;
        }
        this.setState({
            selectedCollectionTypeIndex: Number(index),
            selectedAddress: -1
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
    };

    redirect = () => {
        this.props.history.push({
            pathname: '/payment'
        });
    };

    handleDeliveryDataSubmit = () => {
        const selectedCollectionType = this.availableCollectionTypes[this.state.selectedCollectionTypeIndex];

        if (selectedCollectionType.category === PICKUP) {
            this.redirect(selectedCollectionType);
            return;
        }

        const address = this.state.addresses[this.state.selectedAddress];
        address._id = undefined;
        makeCall({
            jobType: 'POST',
            urlParams: '/cart/delivery/' + this.availableCollectionTypes[this.state.selectedCollectionTypeIndex]._id,
            params: address
        })
            .then(() => this.redirect(selectedCollectionType))
            .catch((response) => {
                this.closeAddressModal();
                this.onError(response);
            })
    };

    handlePickupDataSubmit = (data) => {
        const selectedCollectionType = this.availableCollectionTypes[this.state.selectedCollectionTypeIndex];
        makeCall({
            jobType: 'POST',
            urlParams: '/cart/pickup/' + selectedCollectionType._id,
            params: data
        })
            .then(() => {
                const cart = this.state.cart;
                cart.pickup = data;
                this.setState({
                    cart: cart
                });
                this.closeAddressModal()
            })
            .catch((response) => {
                this.closeAddressModal();
                this.onError(response);
            })
    };

    render() {
        if (!this.availableCollectionTypes) {
            return <Redirect to='/cart'/>;
        }
        const selectedCollectionType = this.state.selectedCollectionTypeIndex !== -1
            ? this.availableCollectionTypes[this.state.selectedCollectionTypeIndex]
            : undefined;
        const cart = this.state.cart;
        const selectedAddress = cart.delivery ? _.findIndex(this.state.addresses, (e) => e._id === cart.delivery._id) : -1;
        const SelectedCollectionTypeName = selectedCollectionType
            ? selectedCollectionType.name + " (₹" + selectedCollectionType.baseCharge + ")"
            : 'Select';

        let errorMessage = '';
        if (!cart.delivery && !cart.pickup) {
            errorMessage = errorMessages.noCollectionTypes;
        } else if (cart.delivery) {
            errorMessage = selectedAddress < 0 ? errorMessages.noCollectionTypes : '';
        }

        return (
            <div>
                <NavigationBar/>
                <div className='container mb-4'>
                    <Stapes active={2}/>
                    {/* <hr/> */}
                    <div className={'col-sm-10 mt-4'}>
                        <CollectionTypesDropDown label={'Collection Type'} options={this.availableCollectionTypes}
                                                 btnLabel={SelectedCollectionTypeName}
                                                 handleOptionChange={this.handleCollectionTypeChange}/>
                    </div>
                    <hr/>
                    <div className="page-main">
                        <div className="address-box"
                             style={{"paddingLeft": "15px"}}>
                            <div className="address-title">
                                <h4 className="title">
                                    {
                                        selectedCollectionType.category === PICKUP
                                            ? "Collector's Information"
                                            : "Delivery Address"
                                    }
                                </h4>
                            </div>
                            {
                                selectedCollectionType.category === DELIVERY
                                    ? <div className="address-view">
                                        <AddressList addresses={this.state.addresses}
                                                     deleteAddress={this.deleteAddress}
                                                     selected={selectedAddress}
                                                     handleClick={this.updateSelectedAddress}
                                                     openNewAddressModal={this.openAddressModal}/>
                                    </div>
                                    : <PickUpDetails data={cart.pickup}
                                                     openAddressModal={this.openAddressModal}/>
                            }
                            {
                                selectedCollectionType.category === DELIVERY
                                    ? <AddressForm open={this.state.editAddress}
                                                   close={this.closeAddressModal}
                                                   handleSubmit={this.addAddress}/>
                                    : <PickupForm open={this.state.editAddress}
                                                  close={this.closeAddressModal}
                                                  key={cart.pickup ? cart.pickup._id : ''}
                                                  handleSubmit={this.handlePickupDataSubmit}
                                                  data={cart.pickup}/>
                            }
                        </div>
                        <hr/>
                    </div>
                    <ErrorMessage message={this.state.errorMessage}
                                  clearMessage={this.cleanErrorMessage}/>
                    <ErrorMessage
                        message={errorMessage}/>
                    <div className={errorMessage ? 'disabled-link' : ''}
                         onClick={this.handleDeliveryDataSubmit}>
                        <div className={`btn btn-outline-success btn-lg place-order mb-4`}>
                            {"Continue to Payment"}
                            <i className="fa fa-angle-right ml-2"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Info)
