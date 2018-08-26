import React from 'react'
import {Link} from "react-router-dom";

function ApplyButton({service}) {
    return (
        <Link to={{
            pathname: '/service/order',
            state: {service}
        }}>
            <div className={'btn btn-info btn-large'}>
                Apply
            </div>
        </Link>
    )
}

export default ApplyButton
