import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom'

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
                <td className="column1">{getDateString(cart.createdOn)}</td>
                <td className="column2">{cart._id}</td>
                <td className="column3">
                    {cart.orders[0].serviceName} <br/>
                    {
                        cart.orders.length > 1
                            ? <div className='more-items'> + {cart.orders.length - 1} More Items</div>
                            : ''
                    }
                </td>
                <td className="column4">{`₹ ${cart.totalCost}`}</td>
                <td className="column5">{cart.orders[0].unitsRequested}</td>
                <td className="column6">{`₹ ${cart.totalCost}`}</td>
            </tr>

        );
    }
}

export default withRouter(CartDetails);
