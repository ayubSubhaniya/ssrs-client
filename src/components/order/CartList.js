import React, {Component} from 'react';
import _ from "lodash"
import CartDetails from "./CartDetails";
import {isSuperAdmin} from "../../helper/userType";

class CartList extends Component {
    render() {
        const {carts, ...others} = this.props;
        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible ? 'filter-is-visible' : ''}`}>
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100">
                                <table>
                                    <thead>
                                    <tr className="table100-head">
                                        <th className="column1">Service</th>
                                        <th className="column2">Status</th>
                                        <th className="column3">Price</th>
                                        <th className="column4">Order No.</th>
                                        {
                                            isSuperAdmin(others.user)
                                                ? <th className="column5">Requested By</th>
                                                : ''
                                        }
                                        <th className="column6">Order Total</th>
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

