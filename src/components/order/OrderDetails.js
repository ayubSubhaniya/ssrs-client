import React, {Component} from 'react';
import {isStudent} from "../../helper/userType";
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import _ from "lodash"

class OrderDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {order} = this.props
        return (
            <div className="card order-card">
                <div className="card-body">
                    <h4 className="card-title">{order.serviceName}</h4>
                    <p className="card-text"><strong>Order No: </strong>{order._id}</p>
                    <p className="card-text"><strong>Created: </strong>{`${new Date(Date.parse(order.createdOn))}`}</p>
                    <p className="card-text"><strong>Qty: </strong>{`${order.unitsRequested}`}</p>
                    <p className="card-text"><strong>Cost: </strong>{`₹ ${order.totalCost}`}</p>
                    {
                        isStudent(this.props.user)
                            ? <p className="card-text"><strong>Status: </strong>{`${camelCaseToWords(orderStatus[order.status])}`}</p>
                            : (
                                <React.Fragment>
                                    <p className="card-text"><strong>Requested By: </strong>{order.requestedBy}</p>
                                    <form className="form-inline">
                                        <div className='form-group'>
                                            <label htmlFor="last_name"
                                                   className="col-form-label pr-1"><strong>Status:</strong></label>
                                            <div className="pl-0">
                                                <select className="form-control" onClick={(e) =>
                                                    this.props.updateStatus(this.props.index,e.target.value)}>
                                                }
                                                    <option hidden>{camelCaseToWords(orderStatus[order.status])}</option>
                                                    {
                                                        _.map(Object.keys(orderStatus),(key)=>{
                                                            return <option key={key}
                                                                           value={key}>{camelCaseToWords(orderStatus[key])}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </React.Fragment>)
                    }
                </div>
            </div>
        );
    }
}

export default OrderDetails;
