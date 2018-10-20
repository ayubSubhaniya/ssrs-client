import React, {Component} from 'react';
import _ from "lodash"

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
                <td data-th="Parameters" className="text-center">{parameters.length>0?_.map(parameters, 'name').join(", "):'None'}</td>
                <td data-th="Price" className="text-center">{order.serviceCost}</td>
                <td data-th="Quantity" className="text-center">{order.unitsRequested}</td>
                <td data-th="Service Cost" className="text-center">{`₹ ${order.serviceCost}`}</td>
                <td data-th="Parameter Cost" className="text-center">{`₹ ${order.parameterCost}`}</td>
                <td data-th="Subtotal" className="text-center">{`₹ ${order.totalCost}`}</td>
            </tr>
        );
    }
}

export default ServiceDetails;
