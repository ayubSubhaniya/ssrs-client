import React from 'react'
import {Link} from "react-router-dom";

class ApplyButton extends React.Component {
    render() {
        const {service,index} = this.props;
        return (
            <Link to={{
                pathname: '/service/order/' + index,
                state: {service}
            }}>
                <div className={'btn btn-info btn-large'}>
                    Apply
                </div>
            </Link>
        )
    }
}

export default ApplyButton
