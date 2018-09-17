import React from 'react';
import {Link} from "react-router-dom";

function EditButton({parameter,index}) {
    return (
        <Link
            className={'ml-2 mr-2'}
            to={{
            pathname: '/parameter/edit/' + index,
            state: {parameter}
        }}>
            <div className="btn btn-default btn-sm">
                <i className="fa fa-pencil"
                   style={{"fontSize": "24px", "color": "black"}}></i></div>
        </Link>
    );
}

export default EditButton;
