import React, {PureComponent} from 'react';

class PickUpDetails extends PureComponent {

    render() {
        const data = this.props.data;
        if (data){
            return (
                <div className="address-bx animated fadeIn">
                    <p className={'item-address'}><strong>{data.name}</strong></p>
                    <p className={'item-address'}>{data.daiictId}</p>
                    <p className={'item-address'}>{data.contactNo}</p>
                    <p className={'item-address'}>{" " + data.email}</p>
                    <button type="button" className="btn btn-outline-dark address-edit"
                            onClick={this.props.openAddressModal}>
                        Edit
                    </button>
                </div>
            )
        } else {
            return (
                <div className={'add-bx'} onClick={this.props.openAddressModal}>
                    <div className='add-plus'> +</div>
                    <div> Add Collection Info</div>
                </div>
            )
        }
    }
}

export default PickUpDetails;
