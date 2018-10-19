import React from 'react'
import Stapes from "../../service/Stapes";
import NavigationBar from "../../NavigationBar";
import CourierForm from "../CourierForm";
import {Link} from "react-router-dom"
import CollectionTypesDropDown from "../../service/CollectionTypesDropDown"
import {syncFetch} from "../../../helper/FetchData";
import CourierDetails from "../CourierDetails";
import PickUpDetails from "../PickUpDetails";
import PickupForm from "../PickupForm";
import _ from "lodash"
import {errorMessages} from '../../../config/configuration'
import * as HttpStatus from 'http-status-codes'
import ErrorMessage from "../../error/ErrorMessage";
import {makeCall} from "../../../helper/caller";

class Info extends React.Component {
    constructor(props) {
        super(props);
        const {avilableCollectionTypes} = props.location.state;

        const cart = syncFetch('cart');
        if (avilableCollectionTypes.length === 1) {
            this.state = {
                addresses: [],
                selectedAddress: 0,
                showSpinner: false,
                editAddress: false,
                collectionType: avilableCollectionTypes,
                collectionTypeIndex: 0,
                courier: avilableCollectionTypes[0].name == 'Courier' ? cart.courier : undefined,
                pickup: avilableCollectionTypes[0].name == 'Pickup' ? cart.pickup : undefined,
                isCourierSelected: avilableCollectionTypes[0].name === 'Courier',
                errorMessage: '',
                isCollectionTypeInfoProvided: avilableCollectionTypes[0].name === 'Courier' ? cart.courier !== undefined : cart.pickup !== undefined
            };
        } else {
            const selectedCollectionType = cart.courier ? 'Courier' : 'Pickup';
            const collectionTypeIndex = _.findIndex(avilableCollectionTypes, (x) => x.name === selectedCollectionType);
            this.state = {
                addresses: [],
                selectedAddress: 0,
                showSpinner: false,
                editAddress: false,
                collectionType: avilableCollectionTypes,
                collectionTypeIndex,
                courier: cart ? cart.courier : undefined,
                pickup: cart ? cart.pickup : undefined,
                isCourierSelected: cart ? cart.courier !== undefined : false,
                errorMessage: '',
                isCollectionTypeInfoProvided: avilableCollectionTypes[collectionTypeIndex].name === 'Courier' ? cart.courier !== undefined : cart.pickup !== undefined
            };
        }
    }

    componentDidMount() {
        this.getAddress();
    }

    getAddress = () => {
        makeCall({jobType: 'GET', urlParams: '/user/address'}).then((response) => {
            this.setState({
                addresses: response.addresses
            })
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
            .catch((error) => console.log(error));
    }

    handleCollectionTypeChange = ({target}) => {
        let index = target.dataset.index;
        if (!index)
            index = target.parentNode.dataset.index;

        const isCourierSelected = this.state.collectionType[Number(index)].name === 'Courier';
        this.setState({
            collectionTypeIndex: Number(index),
            isCourierSelected,
            isCollectionTypeInfoProvided: isCourierSelected ? this.state.courier !== undefined : this.state.pickup !== undefined
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

    handleCourierDataSubmit = (index) => {
        const address = this.state.addresses[index];
        address._id = undefined;
        makeCall({
            jobType: 'POST',
            urlParams: '/cart/courier',
            params: address
        })
            .then((response) => {
                this.setState({
                    pickup: undefined,
                    courier: response.courier,
                    editAddress: false,
                    isCollectionTypeInfoProvided: true,
                    selectedAddress: index
                })
            })
            .catch((response) => {
                this.closeAddressModal();
                this.onError(response);
            })
    };

    handlePickupDataSubmit = (data) => {
        makeCall({jobType: 'POST', urlParams: '/cart/pickup', params: data}).then((response) => {
            this.setState({
                courier: undefined,
                pickup: response.pickup,
                editAddress: false,
                isCollectionTypeInfoProvided: true
            }).catch((response) => {
                this.setState({
                    editAddress: false
                })
                this.onError(response);
            })
        })
    };

    render() {
        const SelectedCollectionTypeName = this.state.collectionTypeIndex !== -1
            ? this.state.collectionType[this.state.collectionTypeIndex].name + " (₹" +
            this.state.collectionType[this.state.collectionTypeIndex].baseCharge + ")"
            : 'Select';
        return (
            <div>
                <NavigationBar/>
                <div className='container mb-4'>
                    <Stapes active={2}/>
                    <hr/>
                    <div className={'col-sm-6'}>
                        <CollectionTypesDropDown label={'Collection Type'} options={this.state.collectionType}
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
                                this.state.isCourierSelected
                                    ? <CourierDetails data={this.state.addresses}
                                                      selected={this.state.selectedAddress}
                                                      handleClick={this.handleCourierDataSubmit}
                                                      openAddressModal={this.openAddressModal}/>
                                    : <PickUpDetails data={this.state.pickup}
                                                     openAddressModal={this.openAddressModal}/>
                            }
                            {
                                this.state.isCourierSelected
                                    ? <CourierForm open={this.state.editAddress}
                                                   close={this.closeAddressModal}
                                                   handleSubmit={this.addAddress} />
                                    : <PickupForm open={this.state.editAddress}
                                                  close={this.closeAddressModal}
                                                  handleSubmit={this.handlePickupDataSubmit}
                                                  data={this.state.pickup}/>}
                        </div>
                        <hr/>
                    </div>
                    <ErrorMessage message={this.state.errorMessage}
                                  clearMessage={this.cleanErrorMessage}/>
                    <ErrorMessage
                        message={this.state.isCollectionTypeInfoProvided ? '' : errorMessages.noCollectionTypes}/>
                    <Link to={'/payment'} className={this.state.isCollectionTypeInfoProvided ? '' : 'disabled-link'}>
                        <div className='btn place-order submit mb-4'>PLACE ORDER</div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Info
