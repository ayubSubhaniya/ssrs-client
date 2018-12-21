import _ from "lodash";
import React from "react";

function AddressList({ addresses, openEditAddressModal, deleteAddress, openNewAddressModal, selected, handleClick }) {
    return (
        <React.Fragment>
            {
                _.map(addresses, (address, index) => {
                    return (
                        <div className={'address-bx animated fadeIn' + (selected === index ? ' address-selected' : '')}
                            onClick={handleClick ? () => handleClick(index) : ''}>
                            <span className='address-cross' onClick={() => deleteAddress(address._id, index)}>&times;</span>
                            <h6 className='mb-2 mt-0'>
                                <strong>{address.name}</strong>
                            </h6>
                            <h6 className='mb-2'>

                                {
                                    address.address.line1.length > 34
                                        ? <div>
                                            <span className='address-line1'>{address.address.line1.substring(0, 34)}</span> <br />
                                            <span className='address-line2'>{address.address.line1.substring(34)}</span>   <br />
                                        </div>
                                        : <div>
                                            <span>{address.address.line1}</span> <br />
                                        </div>
                                }


                                {address.city}<br />
                                {address.state + ", " + address.country}<br />
                                {address.pinCode}<br />
                            </h6>
                            <h6 className='mb-2'>
                                {" " + address.contactNo}
                            </h6>
                            <h6 className='mb-2'>
                                <a href={"mailto:" + address.email}>{" " + address.email}</a>
                            </h6>
                            {
                                openEditAddressModal
                                    ?   <button type="button" className="btn btn-outline-dark address-edit"
                                            onClick={() => openEditAddressModal(address._id, index, address)}>
                                            Edit
                                        </button>
                                    :   ''
                            }
                        </div>
                    );
                })
            }
            <div className={'add-bx'} onClick={openNewAddressModal}>
                <div className='add-plus'> +</div>
                <div>Add New Address</div>
            </div>
        </React.Fragment>)
}

export default AddressList
