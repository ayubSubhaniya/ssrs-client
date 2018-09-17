import React from 'react';
import {Link} from "react-router-dom";

function EditButton({collectionType,index}) {
    return (
        <Link
            className={'ml-2 mr-2'}
            to={{
            pathname: '/collectionType/edit/' + index,
            state: {collectionType}
        }}>
            <div className="btn btn-default btn-sm">
                <i className="fa fa-pencil"
                   style={{"fontSize": "24px", "color": "black"}}></i></div>
        </Link>
    );
}

export default EditButton;
