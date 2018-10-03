import React from 'react'
import Stapes from "../../service/Stapes";
import NavigationBar from "../../NavigationBar";
import CourierForm from "../CourierForm";
import {Link} from "react-router-dom"
import CollectionTypesDropDown from "../../service/CollectionTypesDropDown"
import {asyncFetch, syncFetch} from "../../../helper/FetchData";
import CourierDetails from "../CourierDetails";
import PickUpDetails from "../PickUpDetails";
import PickupForm from "../PickupForm";
import _ from "lodash"
import Spinner from "../../Spinner";
import {domainUrl} from '../../../config/configuration'
import HttpStatus from 'http-status-codes'

class Info extends React.Component {
    constructor(props) {
        super(props);
        const {avilableCollectionTypes} = props.location.state;
        console.log(avilableCollectionTypes);
        const cart = syncFetch('cart');
        if(avilableCollectionTypes.length===1) {
            this.state = {
                showSpinner: false,
                editAddress: false,
                collectionType: avilableCollectionTypes,
                collectionTypeIndex: 0,
                courier: avilableCollectionTypes[0].name=='Courier' ? cart.courier : undefined,
                pickup: avilableCollectionTypes[0].name=='Pickup' ? cart.pickup : undefined,
                isCourierSelected: avilableCollectionTypes[0].name==='Courier'
            };
        }else{
            const selectedCollectionType = cart.courier ? 'Courier' : 'Pickup';
            this.state = {
                showSpinner: false,
                editAddress: false,
                collectionType: avilableCollectionTypes,
                collectionTypeIndex: _.findIndex(avilableCollectionTypes, (x) => x.name === selectedCollectionType),
                courier: cart ? cart.courier : undefined,
                pickup: cart ? cart.pickup : undefined,
                isCourierSelected: cart ? cart.courier !== undefined : false
            };
        }
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

    handleCollectionTypeChange = ({target}) => {
        let index = target.dataset.index;
        if (!index)
            index = target.parentNode.dataset.index;
        this.setState({
            collectionTypeIndex: Number(index),
            isCourierSelected: Number(index) === 0
        });
    };

    handleCourierDataSubmit = (data) => {
        const that = this;
        const url = domainUrl + '/cart/courier';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.CREATED) {
                const response = JSON.parse(request.response);
                that.setState({
                    pickup: undefined,
                    courier: response.courier,
                    editAddress: false
                })
            }
        };
        request.send(JSON.stringify(data));
    };

    handlePickupDataSubmit = (data) => {
        const that = this;
        const url = domainUrl + '/cart/pickup';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.CREATED) {
                const response = JSON.parse(request.response);
                that.setState({
                    courier: undefined,
                    pickup: response.pickup,
                    editAddress: false
                })
            }
        };
        request.send(JSON.stringify(data));
    };

    render() {
        const SelectedCollectionTypeName = this.state.collectionTypeIndex !== -1
            ? this.state.collectionType[this.state.collectionTypeIndex].name + " (₹" +
            this.state.collectionType[this.state.collectionTypeIndex].baseCharge + ")"
            : 'Select';
        const placeButtonAvailable = this.state.courier || this.state.pickup;
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
                                    ? <CourierDetails data={this.state.courier}
                                                      openAddressModal={this.openAddressModal}/>
                                    : <PickUpDetails data={this.state.pickup}
                                                     openAddressModal={this.openAddressModal}/>
                            }
                            {
                                this.state.isCourierSelected
                                    ? <CourierForm open={this.state.editAddress}
                                                   close={this.closeAddressModal}
                                                   handleSubmit={this.handleCourierDataSubmit}
                                                   data={this.state.courier}/>
                                    : <PickupForm open={this.state.editAddress}
                                                  close={this.closeAddressModal}
                                                  handleSubmit={this.handlePickupDataSubmit}
                                                  data={this.state.pickup}/>}
                        </div>
                        <hr/>
                    </div>
                    <Link to={'/payment'} className={placeButtonAvailable?'':'disabled-link'}>
                        <div className='btn place-order submit mb-4'>PLACE ORDER</div>
                    </Link>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default Info
