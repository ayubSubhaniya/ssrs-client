import React from 'react'
import Stapes from "../../service/Stapes";
import {Link} from "react-router-dom";

class Info extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='container'>
                <Stapes active={2}/>
                <h3>Show Order Information Here</h3>
                <Link to={'/payment'}>
                    <div className="btn btn-success">
                        {"Place Order "}
                        <i className="fa fa-angle-right"></i>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Info
