import React, {Component} from 'react';

class PickUpDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.options;
        if (data){
            return (
                <div className="address">
                    <p className={'item-address'}><strong>{data.name}</strong></p>
                    <p className={'item-address'}>{data.daiictId}</p>
                    <p className={'item-address'}>{data.contactNo}</p>
                    <p className={'item-address'}>{" " + data.email}</p>
                    <p className="item-address address-edit-btn" onClick={this.props.openAddressModal}>EDIT</p>
                </div>
            )
        } else {
            return (
                <div className="empty-box" onClick={this.props.openAddressModal}>
                    <span className="icon-add">+</span> Add Address
                </div>
            )
        }
    }
}

export default PickUpDetails;
