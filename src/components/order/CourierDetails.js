import React, {Component} from 'react';

class CourierDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.options;
        console.log(data);
        if (data){
            return (
                <div className="address">
                    <p className={'item-address'}><strong>{data.name}</strong></p>
                    <p className={'item-address'}>{data.contactNo}</p>
                    <p className={'item-address'}>{" " + data.email}</p>
                    <p className={'item-address'}>{" " + data.address.line1 + ", " + data.address.line2 + ", " + data.address.line3 +
                        ", " + data.city + " - " + data.pinCode + ", " + data.state + ", " + data.country}</p>
                    <p className="item-address address-edit-btn" onClick={this.openAddressModal}>EDIT</p>
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

export default CourierDetails;
