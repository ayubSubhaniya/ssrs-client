import React from 'react';
import {Link} from "react-router-dom";

function EditButton({service}) {
    return (
        <Link to={{
            pathname: '/service/edit',
            state: {service}
        }}>
            <div className="btn btn-default btn-sm">
                <i className="fa fa-pencil"
                   style={{"fontSize": "24px", "color": "black"}}></i></div>
        </Link>
    );
}

export default EditButton;
