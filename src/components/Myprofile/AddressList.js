import _ from "lodash";
import React from "react";

function AddressList({addresses, openEditAddressModal, deleteAddress, openNewAddressModal, selected, handleClick}) {
    return (
        <React.Fragment>
            {
                _.map(addresses, (addresse, index) => {
                    return (<div className={'address-bx animated fadeIn' + (selected === index ? ' address-selected' : '')}
                                 onClick={handleClick ? () => handleClick(index) : ''}>
                        <span className='address-cross' onClick={() => deleteAddress(addresse._id, index)}>x</span>
                        <h6 className='mb-2 mt-0'>
                            <strong>{addresse.name}</strong>
                        </h6>
                        <h6 className='mb-2'>
                            {addresse.address.line1} <br/>
                            {addresse.city}<br/>
                            {addresse.state + ", " + addresse.country}<br/>
                            {addresse.pinCode}<br/>
                        </h6>
                        <h6 className='mb-2'>
                            {" " + addresse.contactNo}
                        </h6>
                        <h6 className='mb-2'>
                            <a href={"mailto:" + addresse.email}>{" " + addresse.email}</a>
                        </h6>
                        {
                            openEditAddressModal
                                ? <button type="button" className="btn btn-outline-dark address-edit"
                                          onClick={() => openEditAddressModal(addresse._id, index, addresse)}>
                                    Edit
                                </button>
                                : ''
                        }
                    </div>);
                })
            }
            <div className={'add-bx'} onClick={openNewAddressModal}>
                <div className='add-plus'> +</div>
                <div>Add New Address</div>
            </div>
        </React.Fragment>)
}

export default AddressList
