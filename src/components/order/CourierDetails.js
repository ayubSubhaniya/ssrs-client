import React, {Component} from 'react';
import _ from 'lodash'

class CourierDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        return (
            <div className='d-flex flex-wrap'>
                {_.map(data, (data, i) => {
                    return (
                        <div key={data._id}
                             data-index={i}
                             onClick={() => this.props.handleClick(i)}
                             className={"address " + (this.props.selected == i ? 'address-selected' : '')}>
                            <p className={'item-address'}><strong>{data.name}</strong></p>
                            <p className={'item-address'}>{data.contactNo}</p>
                            <p className={'item-address'}>{" " + data.email}</p>
                            <p className={'item-address'}>{" " + data.address.line1 +
                            ", " + data.city + " - " + data.pinCode + ", " + data.state + ", " + data.country}</p>
                            {/*<p className="item-address address-edit-btn" onClick={this.props.openAddressModal}>EDIT</p>*/}
                        </div>
                    )
                })}
                <div className="empty-box" onClick={this.props.openAddressModal}>
                    <span className="icon-add">+</span> Add Address
                </div>
            </div>
        )
    }
}

export default CourierDetails;
