import React, {Component} from 'react';
import _ from "lodash"
import CartDetails from "./OrderDetails";
import {isAdmin} from "../../helper/userType";
import {handleChange} from "../../helper/StateUpdate";
import {cartStatus} from "../../constants/status";

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.handleChange = handleChange.bind(this);
    }

    isMatchOrderName = (cart,regexOfSearch) => {
        return _.some(cart.orders,(order) => order.serviceName.match(regexOfSearch));
    }

    isMatched = (cart,regexOfSearch) => {
        return (cart.orderId.match(regexOfSearch)
            || this.isMatchOrderName(cart,regexOfSearch)
            || cart.requestedBy.match(regexOfSearch)
            || cartStatus[cart.status].match(regexOfSearch))
    }

    searchFilter = (carts) => {
        if (this.state.searchText) {
            const regexOfSearch = new RegExp(this.state.searchText, 'gi')
            return _.filter(carts, (cart) => {
                return this.isMatched(cart,regexOfSearch)
            })
        } else {
            return carts;
        }
    }

    sortByDate = (carts) => {
        return _.sortBy(carts, (cart) => {
            return new Date(cart.statusChangeTime.placed.time).getTime();
        })
    }

    render() {
        const {carts, ...others} = this.props;
        let filteredCarts = this.searchFilter(carts);
        filteredCarts = _.reverse(this.sortByDate(filteredCarts));
        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible ? 'filter-is-visible' : ''}`}>

                <div className="limiter">

                    <div className="container-table100 mb-5">
                        <div className="wrap-table100">
                            <div className='col-3 float-right mb-3 pb-0 d-flex flex-row'>
                                <i className="fa fa-search search-icon" aria-hidden="true"></i>
                                <input type="text"
                                       className='form-control search-bar'
                                       name={'searchText'}
                                       onKeyUp={this.handleChange}
                                       placeholder="Search..."/>
                            </div>
                            <div className="table100">
                                <table>
                                    <thead>
                                    <tr className="table100-head">
                                        <th className="text-center">Order No.</th>
                                        <th className="pl-4">Service</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Price</th>
                                        {
                                            isAdmin(others.user)
                                                ? <th className="text-center">Requested By</th>
                                                : ''
                                        }
                                        <th className="text-center">Order Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        filteredCarts.length
                                            ? _.map(filteredCarts, (cart, i) => {
                                                return (
                                                    <CartDetails key={cart._id}
                                                                 cart={cart}
                                                                 index={i}
                                                                 {...others}/>
                                                )
                                            })
                                            : <tr>
                                                <td colSpan={6} className='text-center'>No Order Found</td>
                                            </tr>
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


export default OrderList;

