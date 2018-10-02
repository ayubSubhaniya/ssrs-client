import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {isSuperAdmin} from "../../helper/userType";

function getDateString(date) {
    const dateObj = new Date(Date.parse(date))
    return dateObj.toLocaleDateString() + " " + dateObj.toLocaleTimeString();
}

class CartDetails extends Component {
    constructor(props) {
        super(props);
    }

    redirect = () => {
        this.props.history.push({
                pathname: this.props.location.pathname + "/" + this.props.cart._id,
                state: {
                    cart: this.props.cart
                }
            })
    }

    render() {
        const {cart, ...others} = this.props;
        return (
            <tr onClick={this.redirect}>
                <td className="column1">
                    {cart.orders[0].serviceName} <br/>
                    {getDateString(cart.createdOn)}
                    {
                        cart.orders.length > 1
                            ? <div className='more-items'> + {cart.orders.length - 1} More Items</div>
                            : ''
                    } <br/>
                </td>
                <td className="column2">{camelCaseToWords(orderStatus[cart.status])}</td>
                <td className="column3">{`₹ ${cart.ordersCost}`}</td>

                <td className="column4">{`${cart._id}`}</td>
                {
                    isSuperAdmin(others.user)
                        ? <td className="column5">{cart.requestedBy}</td>
                        : ''
                }
                <td className="column6">{`₹ ${cart.totalCost}`}</td>
            </tr>

        );
    }
}

export default withRouter(CartDetails);
