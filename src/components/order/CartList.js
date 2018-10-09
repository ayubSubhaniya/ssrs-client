import React, {Component} from 'react';
import _ from "lodash"
import CartDetails from "./CartDetails";
import {isStudent} from "../../helper/userType";
import {handleChange} from "../../helper/StateUpdate";

class CartList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderId: ''
        }
        this.handleChange = handleChange.bind(this);
    }


    filterByOrderId = (carts) => {
        if(this.state.orderId) {
            const regex = new RegExp(this.state.orderId, 'gi')
            return _.filter(carts, (cart) => {
                return cart.orderId.match(regex);
            })
        }else{
            return carts;
        }
    }



    render() {
        const {carts, ...others} = this.props;
        const filteredCarts = this.filterByOrderId(carts);
        console.log(filteredCarts);
        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible ? 'filter-is-visible' : ''}`}>
                <div className='container mb-3 pb-0 d-flex flex-row'>
                    <i className="fa fa-search search-icon" aria-hidden="true"></i>
                    <input type="text"
                       className='form-control search-bar'
                       name={'orderId'}
                       onKeyUp={this.handleChange}
                       placeholder="Search By Order ID.."/>
                </div>
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">
                            <div className="table100">
                                <table>
                                    <thead>
                                    <tr className="table100-head">
                                        <th className="text-center">Order No.</th>
                                        <th className="text-center">Service</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Price</th>
                                        {
                                            !isStudent(others.user)
                                                ? <th className="text-center">Requested By</th>
                                                : ''
                                        }
                                        <th className="text-center">Order Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        _.map(filteredCarts, (cart, i) => {
                                            return (
                                                <CartDetails key={cart._id}
                                                             cart={cart}
                                                             index={i}
                                                             searchedId={this.state.orderId}
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

