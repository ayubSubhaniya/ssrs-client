import React, {Component} from 'react';
import _ from "lodash"
import {syncFetch} from "../../../helper/FetchData";

class Service extends Component {
    render() {
        const order = this.props.order;
        console.log(order);
        return (
            <tr>
                <td data-th="Product">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 className="nomargin">{order.serviceName}</h4>
                            <div><strong>Comment: </strong>{order.comment}</div>
                        </div>
                    </div>
                </td>
                <td data-th="Parameters">{_.map(order.parameters, 'name').join(", ")}</td>
                <td data-th="Price">{order.serviceCost}</td>
                <td data-th="Quantity" className="text-center">{order.unitsRequested}</td>
                <td data-th="Subtotal" className="text-center">{order.totalCost}</td>
                <td className="actions" data-th="">
                    <div className="btn btn-info btn-sm"
                         onClick={() => this.props.openOrderForm(syncFetch('service')[0])}>
                        <i className="fa fa-pencil"></i>
                    </div>
                    <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
                </td>
            </tr>
        );
    }
}

export default Service;
