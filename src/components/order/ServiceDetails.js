import React, {Component} from 'react';
import _ from "lodash"
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {isSuperAdmin} from "../../helper/userType";

class ServiceDetails extends Component {
    constructor() {
        super();
    }

    render() {
        const order = this.props.order;
        const service = order.service;
        const parameters = order.parameters;
        return (
            <tr style={{'cursor': 'default'}}>
                <td data-th="Service">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 className="nomargin">{service.name}</h4>
                            {
                                order.comment
                                    ? (<div><strong>Comment: </strong>{order.comment}</div>) : ''
                            }
                        </div>
                    </div>
                </td>
                {
                    <td data-th="Status" className="text-center">{camelCaseToWords(orderStatus[order.status])}
                        {
                            order.status === 40 && isSuperAdmin(this.props.user) ?
                                (<div onClick={() => this.props.statusUpdateToReady(order._id)}>(<span
                                    className={'link'}>Update</span>)</div>)
                                : ''
                        }
                    </td>
                }
                <td data-th="Parameters" className="text-center">{parameters.length>0?_.map(parameters, 'name').join(", "):'None'}</td>
                <td data-th="Quantity" className="text-center">{order.unitsRequested}</td>
                <td data-th="Service Cost" className="text-center">{`₹ ${order.serviceCost}`}</td>
                <td data-th="Parameter Cost" className="text-center">{`₹ ${order.parameterCost}`}</td>
                <td data-th="Subtotal" className="text-center">{`₹ ${order.totalCost}`}</td>
            </tr>
        );
    }
}

export default ServiceDetails;
