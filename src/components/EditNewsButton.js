import React from 'react';

function EditNewsButton(props) {

    return (
        <button className="btn btn-default btn-light btn-sm">
            <i className="fa fa-pencil"
               style={{"fontSize": "24px", "color": "black"}} onClick={props.openEditModal}></i></button>
    );
}

export default EditNewsButton;
