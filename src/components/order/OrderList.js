import React, {Component} from 'react';
import _ from "lodash"
import OrderDetails from "./OrderDetails";

class OrderList extends Component {
    render() {
        return (
            <section className={`orders`}>
                    {
                        _.map(this.props.orders, (order, i) => {
                            return (
                                <OrderDetails key={order._id}
                                              order={order}
                                              index={i}
                                              user={this.props.user}
                                              updateStatus={this.props.updateStatus}/>
                            )
                        })
                    }
            </section>
        );
    }
}


export default OrderList;

