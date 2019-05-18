import _ from "lodash";
import ServiceDetails from "./ServiceDetails";
import React from "react";

function ServiceList({cart, collectionType, user, getCart}) {
    return (
        <div id="orderinfo-mid-body">
        <table id="cart" className="table table-hover table-condensed">
            <thead>
            <tr style={{'cursor': 'default'}}>
                <th>Service</th>
                <th className="text-center">Status</th>
                <th className="text-center">Parameters</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Service Cost</th>
                <th className="text-center">Parameter Cost</th>
                <th className="text-center">Subtotal</th>
            </tr>
            </thead>
            <tbody>
            {
                _.map(cart.orders, (o, i) => <ServiceDetails key={o._id}
                                                             order={o}
                                                             user={user}
                                                             getCart={getCart}
                                                             index={i}/>)
            }
            <tr style={{'cursor': 'default'}}>
                <td data-th="Service" colSpan="6">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 className="nomargin">{collectionType.name}</h4>
                        </div>
                    </div>
                </td>
                <td className="text-center">₹ {cart.collectionTypeCost}</td>
            </tr>
            </tbody>
        </table>
        </div>
    )
}

export default ServiceList
