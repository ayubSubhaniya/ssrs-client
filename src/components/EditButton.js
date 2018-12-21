import React from 'react';
import {Link} from "react-router-dom";

function EditButton({data, path}) {
    return (
        <Link
            className={'ml-2 mr-2'}
            to={{
                pathname: path,
                state: data
            }}>
            <button className="btn btn-outline-primary">
            <span>Edit</span>
            </button>
        </Link>
    );
}

export default EditButton;
