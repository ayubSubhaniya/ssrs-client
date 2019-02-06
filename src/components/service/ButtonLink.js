import React from 'react'
import {Link} from "react-router-dom";

class ButtonLink extends React.PureComponent {
    render() {
        return (
            <div className={'d-flex justify-content-center mt-5'}>
                <Link to={'/service/add'}>
                    <button className="btn btn-outline-dark btn-lg">
                    <span>Add New Service</span>
                    </button>
                </Link>
            </div>
        )
    }
}

export default ButtonLink
