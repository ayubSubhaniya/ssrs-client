import React from 'react'
import Stapes from "../../service/Stapes";
import NavigationBar from "../../NavigationBar";
import CourierForm from "../CourierForm";
import {Link} from "react-router-dom"
import CollectionTypesDropDown from "../../service/CollectionTypesDropDown"

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAddress: false,
            collectionTypeIndex: -1
        }
    }

    openAddressModal = () => {
        this.setState({
            editAddress: true
        })
    }
    closeAddressModal = () => {
        this.setState({
            editAddress: false
        })
    }

    render() {
        const SelectedCollectionTypeName = this.state.collectionTypeIndex != -1
            ? this.service.collectionTypes[this.state.collectionTypeIndex].name + " (₹" +
            this.service.collectionTypes[this.state.collectionTypeIndex].baseCharge + ")"
            : 'Select'
        return (
            <div>
                <NavigationBar/>
                <div className='container mb-4'>
                    <Stapes active={2}/>
                    <hr/>
                    <div className={'col-sm-6'}>
                    <CollectionTypesDropDown label={'Collection Type'}
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
                            <div className="address">
                                <p className={'item-address'}><strong>Sagar Savaliya</strong></p>
                                <p className={'item-address'}>7043515704</p>
                                <p className={'item-address'}>{" " + "sagarsavaliya407@gmail.com"}</p>
                                <p className={'item-address'}>H-301, DA-IICT, Near indroda circle, Gandhinagar, 382007 ,
                                    Gujarat , 382007, GANDHI NAGAR, GUJARAT </p>
                                <p className="item-address address-edit-btn" onClick={this.openAddressModal}>EDIT</p>
                            </div>

                            {/*<div className="empty-box" onClick={this.openAddressModal}>*/}
                                {/*<span className="icon-add">+</span> Add Address*/}
                            {/*</div>*/}
                            <CourierForm open={this.state.editAddress} close={this.closeAddressModal}/>
                        </div>
                        <hr/>
                        <div className="total-price">Total: ₹ <span className='price'>1,499</span>
                        </div>
                        <Link to={'/payment'}>
                        <div className='btn place-order submit mb-4'>PLACE ORDER</div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info
