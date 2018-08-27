import React from 'react'
import {Link} from "react-router-dom";

class ApplyButton extends React.Component {
    render() {
        const {service,index} = this.props;
        return (
            <Link
                className={'ml-2 mr-2'}
                to={{
                pathname: '/service/order/' + index,
                state: {service}
            }}>
                <div className={'btn btn-success btn-large'}>
                    Apply
                </div>
            </Link>
        )
    }
}

export default ApplyButton
