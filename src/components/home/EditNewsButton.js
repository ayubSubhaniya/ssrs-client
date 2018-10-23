import React from 'react';

function EditNewsButton(props) {
    return (
        <button className="btn btn-outline-primary"
                data-index={props.index}
                data-message={props.message}
                onClick={props.openEditModal}
                style={{"fontSize": "13px"}}>
                Edit
        </button>
    );
}

export default EditNewsButton;
