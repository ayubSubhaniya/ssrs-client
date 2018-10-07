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
import {domainUrl, errorMessages} from '../../../config/configuration'
import * as HttpStatus from 'http-status-codes'
import ErrorMessage from "../../error/ErrorMessage";

class Info extends React.Component {
    constructor(props) {
        super(props);
        const {avilableCollectionTypes} = props.location.state;

        const cart = syncFetch('cart');
        if(avilableCollectionTypes.length===1) {
            this.state = {
                showSpinner: false,
                editAddress: false,
                collectionType: avilableCollectionTypes,
                collectionTypeIndex: 0,
                courier: avilableCollectionTypes[0].name=='Courier' ? cart.courier : undefined,
                pickup: avilableCollectionTypes[0].name=='Pickup' ? cart.pickup : undefined,
                isCourierSelected: avilableCollectionTypes[0].name==='Courier',
                errorMessage: '',
                isCollectionTypeInfoProvided:avilableCollectionTypes[0].name==='Courier'?cart.courier!==undefined:cart.pickup!==undefined
            };
        }else{
            const selectedCollectionType = cart.courier ? 'Courier' : 'Pickup';
            const collectionTypeIndex = _.findIndex(avilableCollectionTypes, (x) => x.name === selectedCollectionType);
            this.state = {
                showSpinner: false,
                editAddress: false,
                collectionType: avilableCollectionTypes,
                collectionTypeIndex,
                courier: cart ? cart.courier : undefined,
                pickup: cart ? cart.pickup : undefined,
                isCourierSelected: cart ? cart.courier !== undefined : false,
                errorMessage: '',
                isCollectionTypeInfoProvided:avilableCollectionTypes[collectionTypeIndex].name==='Courier'?cart.courier!==undefined:cart.pickup!==undefined
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

    cleanErrorMessage=()=>{
        this.setState({
            errorMessage:''
        })
    };

    doNothing=()=>{

    };

    handleCollectionTypeChange = ({target}) => {
        let index = target.dataset.index;
        if (!index)
            index = target.parentNode.dataset.index;

        const isCourierSelected = this.state.collectionType[Number(index)].name==='Courier';
        this.setState({
            collectionTypeIndex: Number(index),
            isCourierSelected,
            isCollectionTypeInfoProvided:isCourierSelected?this.state.courier!==undefined:this.state.pickup!==undefined
        });
    };

    handleCourierDataSubmit = (data) => {
        const that = this;
        that.setState({
           showSpinner : true
        });

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
                    editAddress: false,
                    isCollectionTypeInfoProvided:true
                })
            } else if (this.status === HttpStatus.PRECONDITION_FAILED){
                that.setState({
                    errorMessage: request.responseText
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR){
                that.setState({
                    errorMessage: errorMessages.internalServerError
                })
            } else if (this.status === HttpStatus.FORBIDDEN){
                that.setState({
                    errorMessage: errorMessages.forbidden
                })
            } else if (this.status === HttpStatus.NOT_FOUND){
                that.setState({
                    errorMessage: "cart not found"
                })
            } else {
                that.setState({
                    errorMessage: errorMessages.somethingsWrong
                })
            }
            that.setState({
                showSpinner : false
            });
        };
        request.send(JSON.stringify(data));
    };

    handlePickupDataSubmit = (data) => {
        const that = this;
        that.setState({
            showSpinner : true
        });
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
                    editAddress: false,
                    isCollectionTypeInfoProvided:true
                })
            } else if (this.status === HttpStatus.PRECONDITION_FAILED){
                that.setState({
                    errorMessage: request.responseText
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR){
                that.setState({
                    errorMessage: errorMessages.internalServerError
                })
            } else if (this.status === HttpStatus.FORBIDDEN){
                that.setState({
                    errorMessage: errorMessages.forbidden
                })
            } else if (this.status === HttpStatus.NOT_FOUND){
                that.setState({
                    errorMessage: "cart not found"
                })
            } else {
                that.setState({
                    errorMessage: errorMessages.somethingsWrong
                })
            }
            that.setState({
                showSpinner : false
            });
        };
        request.send(JSON.stringify(data));
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
                    <ErrorMessage message={this.state.errorMessage} clearMessage={this.cleanErrorMessage}/>
                    <ErrorMessage message={this.state.isCollectionTypeInfoProvided?'':errorMessages.noCollectionTypes} />
                    <Link to={'/payment'} className={this.state.isCollectionTypeInfoProvided?'':'disabled-link'}>
                        <div className='btn place-order submit mb-4'>PLACE ORDER</div>
                    </Link>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default Info
