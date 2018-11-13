import React from 'react'
import { Link } from "react-router-dom";

class GoToCart extends React.Component {
    render() {
        return (
            <div className={'d-flex justify-content-end mt-5'}>
                <Link to={'/cart'}>
                    <button className="btn btn-outline-dark btn-lg">
                        <span className="mr-2">Go To Cart</span>
                        <i className="fa fa-angle-right"></i>
                    </button>
                </Link>
            </div>
        )
    }
}

export default GoToCart
