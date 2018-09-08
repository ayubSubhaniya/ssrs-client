import React, {Component} from 'react';
import _ from "lodash";
import {findById} from "../../helper/Search";
import AuthorizedComponent from "../AuthorizedComponent";

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

function filterName(x) {
    return _.map(x, o => capitalize(o.name)).join(", ")
}

class OrderDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {order,service} = this.props
        console.log(order);
        return (
            <div>
                <h5><strong>Description: </strong>
                    {service.description}</h5>
                <AuthorizedComponent
                    component={()=> <h5><strong>Requested By: </strong>
                        {order.requestedBy}</h5>}
                    permission={this.props.user.userType=='superAdmin'}
                />

                <h5><strong>Total Cost: </strong>
                    {"₹ " + order.totalCost}</h5>
                <h5><strong>Status: </strong>
                    {order.status}</h5>
                <h5><strong>Units Ordered: </strong>
                    {order.units}</h5>
                <h5><strong>PaymentType: </strong>
                    {capitalize(order.payment.paymentType)} </h5>
                <h5><strong>Collection Type: </strong>
                    {capitalize(Object.keys(order.collectionType).join(', '))} </h5>
                <h5><strong>Available Parameters: </strong>
                    {filterName(_.map(order.parameters,(parameterId) => findById(service.availableParameters,parameterId)))} </h5>
            </div>
        );
    }
}

export default OrderDetails;
