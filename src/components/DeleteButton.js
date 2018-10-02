import React from 'react'

function DeleteButton({openConfirmationModal,index}) {
    return (
        <button className="btn btn-danger btn-sm ml-2"
                data-index={index}
                style={{"fontSize": "20px", "color": "black"}}
                onClick={openConfirmationModal}>
        <i className="fa fa-trash-o"
           data-index={index}></i>
    </button>)
}

export default DeleteButton
