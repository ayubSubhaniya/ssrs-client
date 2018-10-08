import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom'
import {cartStatus, orderStatus} from "../../constants/status";
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
                    user: this.props.user
                }
            })
    }

    formatMatched = (match,id) => {
        if(id) {
            const regex = new RegExp(id, 'gi')
            const str = match.replace(regex, `<span class="hl">${id}</span>`)
            return str;
        }else
            return match;
    }

    render() {
        const {cart, ...others} = this.props;
        return (
            <tr onClick={this.redirect}>
                <td className='pt-2 pb-2'>
                    {cart.orders[0].serviceName} <br/>
                    {getDateString(cart.createdOn)}
                    {
                        cart.orders.length > 1
                            ? <div className='more-items'> + {cart.orders.length - 1} More Items</div>
                            : ''
                    } <br/>
                </td>
                <td >{camelCaseToWords(cartStatus[cart.status])}</td>
                <td >{`₹ ${cart.ordersCost}`}</td>

                <td
                    dangerouslySetInnerHTML={{__html: this.formatMatched(cart.orderId,this.props.searchedId)}}>
                </td>
                {
                    isSuperAdmin(others.user)
                        ? <td >{cart.requestedBy}</td>
                        : ''
                }
                <td >{`₹ ${cart.totalCost}`}</td>
            </tr>

        );
    }
}

export default withRouter(CartDetails);
