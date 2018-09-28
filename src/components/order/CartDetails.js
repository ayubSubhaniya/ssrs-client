import React, {Component} from 'react';
import _ from "lodash";
import {isStudent} from "../../helper/userType";
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import OrderList from "./OrderList";

class CartDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {cart,...others} = this.props
        console.log(others);
        return (
            <div className="card cart-card">
                <div className="card-body">
                    {/*<h4 className="card-title">{order.serviceName}</h4>*/}
                    <p className="card-text"><strong>Order No: </strong>{cart._id}</p>
                    <p className="card-text"><strong>Order Date: </strong>{`${new Date(Date.parse(cart.createdOn))}`}</p>
                    <p className="card-text"><strong>Collection Type: </strong>{`${cart.collectionType}`}</p>
                    <p className="card-text"><strong>Total Cost: </strong>{`₹ ${cart.totalCost}`}</p>
                    <p className="card-text"><strong>Status: </strong>{`${camelCaseToWords(orderStatus[cart.status])}`}</p>
                    {
                        isStudent(this.props.user)
                            ? ''
                            : <p className="card-text"><strong>Requested By: </strong>{cart.requestedBy}</p>
                    }
                    {/*<a href="#" className="card-link">Status</a>*/}
                    <OrderList orders={cart.orders}
                               {...others}/>
                </div>
            </div>
        );
    }
}

export default CartDetails;
