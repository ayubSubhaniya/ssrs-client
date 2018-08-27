import React from 'react';
import {Link} from "react-router-dom";

function EditButton({service,index}) {
    return (
        <Link to={{
            pathname: '/service/edit/' + index,
            state: {service}
        }}>
            <div className="btn btn-default btn-sm">
                <i className="fa fa-pencil"
                   style={{"fontSize": "24px", "color": "black"}}></i></div>
        </Link>
    );
}

export default EditButton;
