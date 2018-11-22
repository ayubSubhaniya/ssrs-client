import React, {Component} from 'react';
import _ from "lodash"
import {orderStatus, rorderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {makeCall} from "../../helper/caller";
import {isAdmin, isStudent} from "../../helper/userType";
import TextInput from "./TextInput";
import EditCartForm from "./cart/EditCartForm";
import $ from "jquery";
import {handleError} from "../../helper/error";

class ServiceDetails extends Component {
    constructor() {
        super();
        this.state = {
            isHoldModalOpen: false,
            isEditModalOpen: false,
            isCancelModalOpen: false
        }
    }

    openHoldModal = () => {
        this.setState({
            isHoldModalOpen: true
        })
    }

    openEditModal = () => {
        this.setState({
            isEditModalOpen: true
        })
    }

    closeEditModal = () => {
        this.setState({
            isEditModalOpen: false
        })
    }

    closeHoldModal = () => {
        this.setState({
            isHoldModalOpen: false
        })
    }

    openCancelModal = () => {
        this.setState({
            isCancelModalOpen: true
        })
    }

    closeCancelModal = () => {
        this.setState({
            isCancelModalOpen: false
        })
    }


    statusUpdateToReady = (id) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/order/changeStatus/' + id,
            params: {
                status: rorderStatus.ready
            }
        })
            .then((response) => {
                this.props.getCart()
            })
            .catch((error) => {
                handleError(error);
            })
    }


    hold = (reason, id) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/order/changeStatus/' + id,
            params: {
                status: rorderStatus.onHold,
                reason: reason
            }
        })
            .then(() => {
                this.props.getCart();
                this.closeHoldModal();
            })
            .catch((error) => {
                handleError(error);
            })
    }

    cancel = (reason, id) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/order/cancelOrder/' + id,
            params: {
                cancelReason: reason
            }
        })
            .then(() => {
                this.props.getCart();
                this.closeCancelModal();
            })
            .catch((error) => {
                handleError(error);
            })
    }

    edit = (editedOrder, index, modal) => {
        const oldOrder = this.props.order;
        makeCall({
            jobType: 'PATCH',
            urlParams: '/order/' + oldOrder._id,
            params: {
                comment: editedOrder.comment
            }
        })
            .then((response) => {
                $(modal).modal('hide');
                this.props.getCart();
            })
            .catch((error) => {
                handleError(error);
            })
    };

    render() {
        const order = this.props.order;
        const service = order.service;
        const parameters = order.parameters;
        return (
            <React.Fragment>
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
                    <td data-th="Status" className="text-center">
                        {camelCaseToWords(orderStatus[order.status])}
                    </td>
                    <td data-th="Parameters"
                        className="text-center">{parameters.length > 0 ? _.map(parameters, 'name').join(", ") : 'None'}</td>
                    <td data-th="Quantity" className="text-center">{order.unitsRequested}</td>
                    <td data-th="Service Cost" className="text-center">{`₹ ${order.serviceCost}`}</td>
                    <td data-th="Parameter Cost" className="text-center">{`₹ ${order.parameterCost}`}</td>
                    <td data-th="Subtotal" className="text-center">{`₹ ${order.totalCost}`}</td>
                </tr>
                <tr>
                    <td colSpan={7} className='border-top-0'>
                        <div className='d-flex justify-content-between align-content-center'>
                            <div className='w-50'>
                                {
                                    order.status === rorderStatus.onHold
                                        ? <span>
                                        <strong>Hold Reason: </strong>
                                            {order.holdReason}
                                    </span>
                                        : ''
                                }
                                {
                                    order.status === rorderStatus.cancelled
                                        ? <div>
                                            <strong>Cancellation Reason: </strong>
                                            {order.cancelReason}
                                        </div>
                                        : ''
                                }
                            </div>
                            <div className=''>
                                {
                                    order.status === rorderStatus.processing && isAdmin(this.props.user)
                                        ? (<div className='btn btn-outline-success mr-3'
                                                onClick={() => this.statusUpdateToReady(order._id)}>
                                            Ready
                                        </div>)
                                        : ''
                                }
                                {
                                    order.status === rorderStatus.processing && isAdmin(this.props.user)
                                        ? (<div className='btn btn-outline-warning mr-3'
                                                onClick={this.openHoldModal}>
                                            Hold
                                        </div>)
                                        : ''
                                }
                                {
                                    order.status === rorderStatus.processing && order.status === rorderStatus.onHold && isAdmin(this.props.user)
                                        ? (<div className='btn btn-outline-danger mr-3'
                                                onClick={this.openCancelModal}>
                                            Cancel
                                        </div>)
                                        : ''
                                }
                                {
                                    order.status === rorderStatus.onHold && isStudent(this.props.user)
                                        ? <button type="button"
                                                  className="btn btn-outline-primary"
                                                  onClick={this.openEditModal}>
                                            Edit
                                        </button>
                                        : ''
                                }
                            </div>
                        </div>
                    </td>
                </tr>
                <EditCartForm id={order._id}
                              visible={this.state.isEditModalOpen}
                              close={this.closeEditModal}
                              service={service}
                              parameter={parameters}
                              units={order.unitsRequested}
                              comment={order.comment}
                              index={this.props.index}
                              hide={true}
                              updateOrder={this.edit}/>
                <TextInput visible={this.state.isHoldModalOpen}
                           text={'Enter Reason Holding Of Order'}
                           closeModal={this.closeHoldModal}
                           onSubmit={(data) => this.hold(data, order._id)}/>
                <TextInput visible={this.state.isCancelModalOpen}
                           text={'Enter Reason Cancellation'}
                           closeModal={this.closeCancelModal}
                           onSubmit={(data) => this.cancel(data, order._id)}/>
            </React.Fragment>
        );
    }
}

export default ServiceDetails;
