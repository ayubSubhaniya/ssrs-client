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
            <button className="btn btn-default btn-light btn-sm">
                <i className="fa fa-pencil"
                   style={{"fontSize": "24px", "color": "black"}}></i></button>
        </Link>
    );
}

export default EditButton;
