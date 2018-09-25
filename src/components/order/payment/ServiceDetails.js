import React, {Component} from 'react';
import _ from "lodash"

class ServiceDetails extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false
        }
    }

    render() {
        const order = this.props.order;
        const service = order.service;
        const parameters = order.parameters;
        return (
            <tr>
                <td data-th="Product">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 className="nomargin">{service.name}</h4>
                            <div><strong>Comment: </strong>{order.comment}</div>
                        </div>
                    </div>
                </td>
                <td data-th="Parameters">{_.map(parameters, 'name').join(", ")}</td>
                <td data-th="Price">{order.serviceCost}</td>
                <td data-th="Quantity" className="text-center">{order.unitsRequested}</td>
                <td data-th="Service Cost" className="text-center">{`₹ ${order.serviceCost}`}</td>
                <td data-th="Parameter Cost" className="text-center">{`₹ ${order.parameterCost}`}</td>
                <td data-th="Subtotal" className="text-center">{`₹ ${order.totalCost}`}</td>
            </tr>
        );
    }
}

export default ServiceDetails;
