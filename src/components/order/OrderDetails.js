import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {cartStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {isAdmin} from "../../helper/userType";
import {formatDate} from "../../helper/String";

class OrderDetails extends Component {
    constructor(props) {
        super(props);
    }

    redirect = () => {
        this.props.history.push({
            pathname: this.props.location.pathname + "/" + this.props.cart._id,
            state: {
                user: this.props.user
            }
        })
    }

    formatMatched = (match, id) => {
        if (id) {
            const regex = new RegExp(id, 'gi')
            const str = match.replace(regex, `<span class="hl">${id}</span>`)
            return str;
        } else
            return match;
    }

    render() {
        const {cart, ...others} = this.props;
        return (
            <tr onClick={this.redirect}>
                <td data-th="Order No" className="text-center"
                    dangerouslySetInnerHTML={{__html: this.formatMatched(cart.orderId, this.props.searchedId)}}>
                </td>
                <td data-th="Service" className='pt-3 pb-3'>
                    {cart.orders[0].serviceName} <br/>
                    {formatDate(cart.statusChangeTime.placed.time)}
                    {
                        cart.orders.length > 1
                            ? <div className='more-items'> + {cart.orders.length - 1} More Items</div>
                            : ''
                    }
                </td>
                <td data-th="Status" className="text-center">{camelCaseToWords(cartStatus[cart.status])}</td>
                <td data-th="Price" className="text-center">{`₹ ${cart.ordersCost}`}</td>

                {
                    isAdmin(others.user)
                        ? <td data-th="Requested By" className="text-center">{cart.requestedBy}</td>
                        : ''
                }
                <td data-th="Order Total" className="text-center">{`₹ ${cart.totalCost}`}</td>
            </tr>

        );
    }
}

export default withRouter(OrderDetails);
