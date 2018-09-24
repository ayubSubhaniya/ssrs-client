import React, {Component} from 'react';
import _ from "lodash"
import OrderDetails from "./OrderDetails";

class OrderList extends Component {
    render() {
        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible?'filter-is-visible':''}`}>
                    {
                        _.map(this.props.orders, (order, i) => {
                            return (
                                <OrderDetails order={order}
                                              index={i}
                                              user={this.props.user}/>
                            )
                        })
                    }
            </section>
        );
    }
}


export default OrderList;

