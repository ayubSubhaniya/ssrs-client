import React from 'react';

function EditNewsButton(props) {
    return (
        <button className="btn btn-default btn-light btn-sm"
                data-index={props.index}
                data-message={props.message}
                onClick={props.openEditModal}>
            <i className="fa fa-pencil"
               style={{"fontSize": "24px", "color": "black"}}
               data-index={props.index}
               data-message={props.message}></i>
        </button>
    );
}

export default EditNewsButton;
