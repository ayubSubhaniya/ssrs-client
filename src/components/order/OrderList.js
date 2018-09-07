import React, {Component} from 'react';
import _ from "lodash"
import OrderDetails from "./OrderDetails";

class OrderList extends Component {
    constructor(props, context) {
        super(props, context);
    }

    findServiceById = (id) => {
        return _.find(this.props.services,(service) => service._id==id);
    }

    render() {
        return (
            <React.Fragment>
                {
                    _.map(this.props.orders,(order)=><OrderDetails key={order._id} order={order} service={this.findServiceById(order.serviceId)}/>)
                }
            </React.Fragment>
        );
    }
}

export default OrderList;

