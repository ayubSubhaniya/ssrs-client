import React from 'react';
import {Link} from "react-router-dom";

function AddNewsButton(props) {
    return (
        <div className={'d-flex justify-content-center mt-3'}>
            <button className="btn btn-default btn-light btn-sm" onClick={props.openAddModal}>
                <i className="fa fa-plus"
                   style={{"fontSize": "24px", "color": "black"}}/>Add News
            </button>
        </div>
    );
}

export default AddNewsButton;
