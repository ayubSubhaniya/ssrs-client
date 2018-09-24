import React from 'react'
import Stapes from "../../service/Stapes";
import NavigationBar from "../../NavigationBar";
import CourierForm from "../CourierForm";
import {Link} from "react-router-dom"
import CollectionTypesDropDown from "../../service/CollectionTypesDropDown"
import {asyncFetch} from "../../../helper/FetchData";
import CourierDetails from "../CourierDetails";
import PickUpDetails from "../PickUpDetails";
import PickupForm from "../PickupForm";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAddress: false,
            collectionTypeIndex: -1,
            courier: props.location.state ? props.location.state.courier : undefined,
            pickup: props.location.state ? props.location.state.pickup : undefined,
            isCourierSelected: props.location.state ? props.location.state.courier !== undefined : false
        };

        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount() {
        this.asyncFetch('collectionType');
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
            isCourierSelected:Number(index)===0
        });
    };

    render() {
        console.log(this.state);
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
                            {this.state.isCourierSelected ? <CourierDetails options={this.state.courier}
                                                                            openAddressModal={this.openAddressModal}/> :
                                <PickUpDetails options={this.state.pickup} openAddressModal={this.openAddressModal}/>}
                            {this.state.isCourierSelected ?
                                <CourierForm open={this.state.editAddress} close={this.closeAddressModal} data={this.state.courier}/> :
                                <PickupForm open={this.state.editAddress} close={this.closeAddressModal} data={this.state.pickup}/>}
                        </div>
                        <hr/>
                        </div>
                        <Link to={'/payment'}>
                            <div className='btn place-order submit mb-4'>PLACE ORDER</div>
                        </Link>
                    </div>
                </div>
        );
    }
}

export default Info
