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
                                        <th className="column1" style={{"width": "20%"}} class="text-center">Order No.</th>
                                        <th className="column2" style={{"width": "25%"}} class="text-center">Service</th>
                                        <th className="column3" style={{"width": "15%"}} class="text-center">Status</th>
                                        <th className="column4" style={{"width": "10%"}} class="text-center">Price</th>
                                        {
                                            isSuperAdmin(others.user)
                                                ? <th className="column5" style={{"width": "15%"}} class="text-center">Requested By</th>
                                                : ''
                                        }
                                        <th className="column6" style={{"width": "15%"}} class="text-center">Order Total</th>
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

