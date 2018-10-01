import React, {Component} from 'react';
import _ from "lodash"
import CartDetails from "./CartDetails";

class CartList extends Component {
    render() {
        const {carts,...others} = this.props;
        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible?'filter-is-visible':''}`}>
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100">
                                <table>
                                    <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Date</th>
                                        <th className="column2">Order ID</th>
                                        <th className="column3">Name</th>
                                        <th className="column4">Price</th>
                                        <th className="column5">Quantity</th>
                                        <th className="column6">Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        _.map(carts, (cart, i) => {
                                            return (
                                                <CartDetails key={cart._id}
                                                             cart={cart}
                                                             index={i}
                                                             {...others}/>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default CartList;

