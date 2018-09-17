import React, {Component} from 'react';
import _ from "lodash";
import AuthorizedComponent from "../AuthorizedComponent";
import {COD} from "../../constants/PaymentMode";
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {paymentMode} from "../../constants/PaymentMode";
import CourierDetails from "./CourierDetails";
import PickUpDetails from "./PickUpDetails";

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
        const {order} = this.props
        const collectionType = order.collectionType.toLowerCase();
        return (
            <div>
                <AuthorizedComponent
                    component={()=> <h5><strong>Requested By: </strong>
                        {order.requestedBy}</h5>}
                    permission={this.props.user.userType=='superAdmin'}
                />
                <h5><strong>Total Cost: </strong>
                    {"₹ " + order.totalCost}</h5>
                <h5><strong>Status: </strong>
                    {camelCaseToWords(orderStatus[order.status])}</h5>
                <h5><strong>Units Ordered: </strong>
                    {order.unitsRequested}</h5>
                <h5><strong>Comment: </strong>
                    {order.comment}</h5>
                <h5><strong>Payment Type: </strong>
                    {camelCaseToWords(paymentMode[order.paymentType])} </h5>
                <h5><strong>{order.collectionType+ " Details:"} </strong> </h5>
                {order.collectionType=='Courier'
                    ?<CourierDetails data={order[collectionType]}/>
                    :<PickUpDetails data={order[collectionType]}/>}
                <h5><strong>Parameters: </strong>
                    {_.map(order.parameters,(parameter) => parameter.name).join(", ")} </h5>
            </div>
        );
    }
}

export default OrderDetails;
