import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {cartStatus} from "../../constants/status";
import {camelCaseToWords, formatDate} from "../../helper/String";
import {isAdmin} from "../../helper/userType";

class OrderDetails extends Component {
    redirect = () => {
        this.props.history.push({
            pathname: this.props.location.pathname + "/" + this.props.cart._id,
            state: {
                user: this.props.user
            }
        })
    }

    getStatusTime = (statusChangeTime) => {
        let time = []

        if(statusChangeTime.placed.time)
            time.push(new Date(statusChangeTime.placed.time));
        if(statusChangeTime.paymentFailed.time)
            time.push(new Date(statusChangeTime.paymentFailed.time));
        if(statusChangeTime.processingPayment.time)
            time.push(new Date(statusChangeTime.processingPayment.time));

        return new Date(Math.max.apply(null, time));
    }

    getStatusColorClass = (status) => {
        let className = 'badge badge-pill badge-';
        switch(status) {
            case 'placed': className += 'info'; break;
            case 'processing': className += 'primary'; break;
            case 'readyToDeliver': className += 'success'; break;
            case 'readyToPickup': className += 'success'; break;
            case 'completed': className += 'success'; break;
            case 'refunded': className += 'success'; break;
            case 'onHold': className += 'warning'; break;
            case 'processingPayment': className += 'secondary'; break;
            default: className += 'danger';
        }

        return className;
    }

    render() {
        const {cart, index, ...others} = this.props;
        return (
            <tr onClick={this.redirect} className='animated fadeIn'>
                <td data-th="Sr No." className="text-center">
                    {index + 1}
                </td>
                <td data-th="Order No" className="text-center">
                    {cart.orderId}
                </td>
                <td data-th="Service" className='pt-3 pb-3'>
                    {cart.orders[0].serviceName} <br/>
                    {formatDate(this.getStatusTime(cart.statusChangeTime))}
                    {
                        cart.orders.length > 1
                            ? <div className='more-items'> + {cart.orders.length - 1} More Item(s)</div>
                            : ''
                    }
                </td>
                <td data-th="Status" style={{"textAlign": "center"}}>
                    <h4><span className={this.getStatusColorClass(cartStatus[cart.status])}>
                        {camelCaseToWords(cartStatus[cart.status])}</span>
                    </h4>
                </td>
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
