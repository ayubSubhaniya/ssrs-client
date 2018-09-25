import React, {Component} from 'react';
import _ from "lodash";
import {isStudent} from "../../helper/userType";

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

function filterName(x) {
    return _.map(x, o => capitalize(o.name)).join(", ")
}

class OrderDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {order} = this.props
        console.log(order);
        return (
            <div className="card order-card">
                <div className="card-body">
                    <h4 className="card-title">{order.serviceName}</h4>
                    <p className="card-text"><strong>Order No: </strong>{order._id}</p>
                    <p className="card-text"><strong>Created: </strong>{`${new Date(Date.parse(order.createdOn))}`}</p>
                    <p className="card-text"><strong>Cost: </strong>{`₹ ${order.totalCost}`}</p>
                    <p className="card-text"><strong>Status: </strong>{`₹ ${order.status}`}</p>
                    {
                        isStudent(this.props.user)
                        ? ''
                        : <p className="card-text"><strong>Requested By: </strong>{order.requestedBy}</p>
                    }
                    <a href="#" className="card-link">Status</a>
                </div>
            </div>
        );
    }
}

export default OrderDetails;
