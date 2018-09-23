import React, {Component} from 'react';
import _ from "lodash"
import OrderDetails from "./OrderDetails";
import {findById} from "../../helper/Search";

class OrderList extends Component {
    render() {
        return (
            <div className={'container container-custom'}>
                <div id="accordion">
                    {
                        _.map(this.props.orders, (order, i) => {
                            return (
                                <div key={order._id} className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center p-0">
                                        <a className="collapsed card-link text-dark w-100 h-100 p-3 ml-2"
                                           data-toggle="collapse"
                                           href={"#collapse" + i}>
                                            <h4 className={'m-0'}> {order.serviceName}</h4>
                                        </a>
                                    </div>
                                    <div id={'collapse' + i} className="collapse" data-parent="#accordion">
                                        <div className="card-body">
                                            {/*<OrderDetails order={order}*/}
                                                          {/*user={this.props.user}/>*/}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default OrderList;

