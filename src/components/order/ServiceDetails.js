import React, { PureComponent } from 'react';
import _ from "lodash"
import { orderStatus, rorderStatus } from "../../constants/status";
import { camelCaseToWords } from "../../helper/String";
import { makeCall } from "../../helper/caller";
import { isAdmin, isStudent } from "../../helper/userType";
import TextInput from "./TextInput";
import EditCartForm from "./cart/EditCartForm";
import $ from "jquery";
import { handleError } from "../../helper/error";
import TextInfoMod from "./TextInfoMod";

class ServiceDetails extends PureComponent {
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

    getOrderStatusColorClass = (status) => {
        let className = 'badge badge-';
        switch (status) {
            case 'placed':
                className += 'info';
                break;
            case 'processing':
                className += 'primary';
                break;
            case 'ready':
                className += 'success';
                break;
            case 'completed':
                className += 'success';
                break;
            case 'refunded':
                className += 'success';
                break;
            case 'onHold':
                className += 'warning';
                break;
            case 'cancelled':
                className += 'danger';
                break;
            default:
                className += 'secondary'
        }

        return className;
    }

    render() {

        const { index, order } = this.props;
        const service = order.service;
        const parameters = order.parameters;
        return (
            <div key={order._id} className="card">
                <div id="orderinfo-mid-body-card-heading" className="card-header">
                    <a className="d-flex collapsed card-link text-dark" data-toggle="collapse" href={"#orderinfo-collapse" + index}>
                        <div className="w-50">
                            <h4> {service.name}</h4>
                        </div>
                        <div className="w-50" style={{ "display": "flex", "justifyContent": "flex-end" }}>
                            <div style={{ "marginTop": "0.38rem" }}><span class={this.getOrderStatusColorClass(orderStatus[order.status])} style={{ "lineHeight": "1.35" }}>{camelCaseToWords(orderStatus[order.status])}</span></div>
                            <div style={{ "width": "20%", "textAlign": "right", "fontSize": "1.5rem", "fontWeight": "500" }}>{`₹${order.totalCost}`}</div>
                        </div>
                    </a>
                </div>
                <div id={'orderinfo-collapse' + index} className="collapse">
                    <div id="orderinfo-mid-body-card-body" className="card-body">
                        <div style={{ "width": "70%", "paddingLeft": "1.8rem" }}>
                            <div id="orderinfo-mid-card-body-detail" className="row">
                                <div className="detail-label">Quantity:</div>
                                <div>{order.unitsRequested}</div>
                            </div>
                            <div id="orderinfo-mid-card-body-detail" className="row">
                                <div className="detail-label">Parameters:</div>
                                <div>{parameters.length > 0 ? _.map(parameters, 'name').join(", ") : 'None'}</div>
                            </div>
                            {
                                order.comment
                                    ? <div id="orderinfo-mid-card-body-detail" className="row">
                                        <div className="detail-label">Comment:</div>
                                        <div>{order.comment}</div>
                                    </div>
                                    : ''
                            }
                            {
                                order.status === rorderStatus.onHold
                                    ? <div className="d-flex justify-content-between">
                                        <div id="orderinfo-mid-card-body-detail" className="row">
                                            <div className="detail-label">Hold reason:</div>
                                            <div>{order.holdReason}</div>
                                        </div>
                                        {
                                            isStudent(this.props.user)
                                                ? <button type="button"
                                                    className="btn btn-sm btn-outline-primary mr-5"
                                                    onClick={this.openEditModal}>
                                                    Edit
                                                </button>
                                                : ''
                                        }
                                    </div>
                                    : ''
                            }
                            {
                                order.status === rorderStatus.cancelled
                                    ? <div id="orderinfo-mid-card-body-detail" className="row">
                                        <div className="detail-label">Cancel reason:</div>
                                        <div>{order.cancelReason}</div>
                                    </div>
                                    : ''
                            }
                        </div>
                        <div style={{ "width": "30%", "borderLeft": "1px solid #dbdbdb", "paddingLeft": "1.5rem" }}>
                            <div className="mb-3 mr-2">
                                <div style={{ "display": "flex", "justifyContent": "space-between", "lineHeight": "1.5" }}>
                                    <div style={{ "fontSize": "15px", "color": "#666" }}>Service cost</div>
                                    <div style={{ "fontSize": "15px", "color": "#666" }}>₹{order.serviceCost}</div>
                                </div>
                                <div style={{ "display": "flex", "justifyContent": "space-between", "lineHeight": "1.5" }}>
                                    <div style={{ "fontSize": "15px", "color": "#666" }}>Parameter cost</div>
                                    <div style={{ "fontSize": "15px", "color": "#666" }}>₹{order.parameterCost}</div>
                                </div>
                            </div>
                            <div style={{ "display": "flex", "justifyContent": "space-evenly" }}>
                                {
                                    order.status === rorderStatus.processing && isAdmin(this.props.user)
                                        ? <div className='btn btn-sm btn-outline-success mr-3'
                                            onClick={() => this.statusUpdateToReady(order._id)}>
                                            Ready
                                        </div>
                                        : ''
                                }
                                {
                                    order.status === rorderStatus.processing && isAdmin(this.props.user)
                                        ? <div className='btn btn-sm btn-outline-warning mr-3'
                                            onClick={this.openHoldModal}>
                                            Hold
                                        </div>
                                        : ''
                                }
                                {
                                    order.status >= rorderStatus.placed
                                        && order.status < rorderStatus.completed
                                        && isAdmin(this.props.user)
                                        ? <div className='btn btn-sm btn-outline-danger'
                                            onClick={this.openCancelModal}>
                                            Cancel
                                        </div>
                                        : ''
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <EditCartForm id={order._id}
                    visible={this.state.isEditModalOpen}
                    close={this.closeEditModal}
                    service={service}
                    parameter={parameters}
                    units={order.unitsRequested}
                    comment={order.comment}
                    index={this.props.index}
                    hide={true}
                    updateOrder={this.edit} />
                <TextInput visible={this.state.isHoldModalOpen}
                    text={'Enter Reason Holding Of Order'}
                    closeModal={this.closeHoldModal}
                    onSubmit={(data) => this.hold(data, order._id)} />
                <TextInput visible={this.state.isCancelModalOpen}
                    text={'Enter Reason Cancellation'}
                    closeModal={this.closeCancelModal}
                    onSubmit={(data) => this.cancel(data, order._id)} />
            </div>
        );
    }
}

export default ServiceDetails;
