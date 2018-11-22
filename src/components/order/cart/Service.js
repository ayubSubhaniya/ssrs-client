import React, { Component } from 'react';
import _ from "lodash"
import { orderStatus } from "../../../config/configuration";
import EditCartForm from "./EditCartForm";
import DeleteButton from "../../DeleteButton";

class Service extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditModalOpen: false
        }
    }

    openEditModal= () => {
        this.setState({
            isEditModalOpen: true
        })
    }

    closeEditModal= () => {
        this.setState({
            isEditModalOpen: false
        })
    }

    render() {
        const order = this.props.order;
        const service = order.service;
        const parameters = order.parameters;
        return (
            <tr class={order.status === orderStatus.invalidOrder ? "table-danger" : ""}>
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
                <td data-th="Parameters"
                    className="text-center">{parameters.length > 0 ? _.map(parameters, 'name').join(", ") : 'None'}</td>
                <td data-th="Quantity" className="text-center">{order.unitsRequested}</td>
                <td data-th="Service Cost" className="text-center">{`₹ ${order.serviceCost}`}</td>
                <td data-th="Parameter Cost" className="text-center">{`₹ ${order.parameterCost}`}</td>
                <td data-th="Subtotal" className="text-center">{`₹ ${order.totalCost}`}</td>
                <td className="actions">
                    <div className="d-flex">
                        <button type="button"
                                className="btn btn-outline-primary"
                                onClick={this.openEditModal}>
                            Edit
                        </button>
                        <EditCartForm id={order._id}
                                      visible={this.state.isEditModalOpen}
                                      close={this.closeEditModal}
                                      service={service}
                                      parameter={parameters}
                                      units={order.unitsRequested}
                                      comment={order.comment}
                                      index={this.props.index}
                                      updateOrder={this.props.updateOrder}
                                      validityErrors={order.validityErrors} />
                        <DeleteButton handleClick={this.props.deleteOrder}
                                      index={this.props.index} />
                    </div>
                </td>
            </tr>
        );
    }
}

export default Service;
