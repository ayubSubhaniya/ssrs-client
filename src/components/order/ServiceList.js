import _ from "lodash";
import ServiceDetails from "./ServiceDetails";
import React from "react";

function ServiceList({ cart, collectionType, user, getCart }) {
    return (
        <div id="orderinfo-mid-body">
            <div id="orderinfo-mid-accordion">
                {
                    _.map(cart.orders, (order, i) => {
                        console.log(order);
                        return (
                            <ServiceDetails key={order._id}
                                order={order}
                                user={user}
                                getCart={getCart}
                                index={i} />
                        );
                    })
                }
            </div>
        </div>
    )
}

export default ServiceList
