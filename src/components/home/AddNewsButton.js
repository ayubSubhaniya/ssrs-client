import React from 'react';

function AddNewsButton(props) {
    return (
        <div className={'d-flex justify-content-end mt-3 mb-3'}>
            <button className="btn btn-outline-dark" onClick={props.openAddModal}>
                + Add News
            </button>
        </div>
    );
}

export default AddNewsButton;
