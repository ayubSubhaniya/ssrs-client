import React from 'react'

function DeleteButton({openConfirmationModal}) {
    return (
        <button className="btn btn-danger btn-sm ml-2"
                    onClick={openConfirmationModal}
                    style={{"fontSize": "20px", "color": "black"}}>
        <i className="fa fa-trash-o"></i>
    </button>)
}

export default DeleteButton
