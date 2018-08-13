import {Component} from "react";
import React from "react";
import _ from 'lodash'

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

class OrderDetails extends Component {
    render() {
       const {service} = this.props;
        return (
            <div>
                <h4><span className={'bold'}>Description: </span> {service.description}</h4>
                <h4><span className={'bold'}>Base Charge: </span>{service.baseCharge}</h4>
                <h4><span className={'bold'}>Maximum Units: </span>{service.maxUnits}</h4>
                <h4><span className={'bold'}>Payment Modes: </span>{_.map(_.keys(_.pickBy(service.paymentModes)),(x)=>capitalize(x)).join(", ")}</h4>
            </div>
        )
    }
}

export default OrderDetails
