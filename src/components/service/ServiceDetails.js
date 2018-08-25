import {Component} from "react";
import React from "react";
import _ from 'lodash'

function capitalize(x) {
    return x.charAt(0).toUpperCase() + x.slice(1);
}

class ServiceDetails extends Component {
    render() {
        const {service} = this.props;
        return (
            <div>
                <h5><span className={'bold'}>Description: </span> {service.description}</h5>
                <h5><span className={'bold'}>Base Charge: </span>{service.baseCharge}</h5>
                <h5><span className={'bold'}>Maximum Units: </span>{service.maxUnits}</h5>
                <h5><span
                    className={'bold'}>Payment Modes: </span>{_.map(_.keys(_.pickBy(service.paymentModes)), (x) => capitalize(x)).join(", ")}
                </h5>
            </div>
        )
    }
}

export default ServiceDetails
