import React, {PureComponent} from 'react';
import _ from "lodash"
import OrderDetails from "./OrderDetails";
import {isAdmin} from "../../helper/userType";
import {handleChange} from "../../helper/StateUpdate";
import {cartStatus} from "../../constants/status";

class OrderList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        }
        this.handleChange = handleChange.bind(this);
    }

    isMatchOrderName = (cart, regexOfSearch) => {
        return _.some(cart.orders, (order) => order.service.name.match(regexOfSearch));
    }

    isMatched = (cart, regexOfSearch) => {
        return (cart.orderId.match(regexOfSearch)
            || this.isMatchOrderName(cart, regexOfSearch)
            || cart.requestedBy.match(regexOfSearch)
            || cartStatus[cart.status].match(regexOfSearch))
    }

    searchFilter = (carts) => {
        if (this.state.searchText) {
            const regexOfSearch = new RegExp(this.state.searchText, 'gi')
            return _.filter(carts, (cart) => {
                return this.isMatched(cart, regexOfSearch)
            })
        } else {
            return carts;
        }
    }

    getMaxStatusTime = (statusChangeTime) => {
        let time = []

        if (statusChangeTime.placed.time)
            time.push(new Date(statusChangeTime.placed.time));
        if (statusChangeTime.paymentFailed.time)
            time.push(new Date(statusChangeTime.paymentFailed.time));
        if (statusChangeTime.processingPayment.time)
            time.push(new Date(statusChangeTime.processingPayment.time));

        return new Date(Math.max.apply(null, time));
    }

    sortByDate = (carts) => {
        return _.sortBy(carts, (cart) => {
            return this.getMaxStatusTime(cart.statusChangeTime).getTime();
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
                            <div className='col-3 mb-3 pb-0 d-flex flex-row' id='search_bar_position'>
                                <i className="fa fa-search search-icon" aria-hidden="true"></i>
                                <input type="text"
                                       className='form-control search-bar'
                                       id='search_bar_position'
                                       name={'searchText'}
                                       onKeyUp={this.handleChange}
                                       placeholder="Type Order-no or Service-name"/>
                            </div>
                            <div className="table100">
                                <table>
                                    <thead>
                                    <tr className="table100-head">
                                        <th className="text-center">Sr No.</th>
                                        <th className="text-center">Order No.</th>
                                        <th className="pl-4">Service(s)</th>
                                        <th className="text-center">Status</th>
                                        {
                                            isAdmin(others.user)
                                                ? <th className="text-center">Requested By</th>
                                                : ''
                                        }
                                        <th className="text-center">Service Price</th>
                                        <th className="text-center">Order Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        filteredCarts.length
                                            ? _.map(filteredCarts, (cart, i) => {
                                                if (cart.orders.length > 0 ) {
                                                    return (
                                                        <OrderDetails key={cart._id}
                                                                      cart={cart}
                                                                      index={i}
                                                                      {...others}/>
                                                    )
                                                } else {
                                                    return <tr>
                                                        <td colSpan={isAdmin(others.user) ? 7: 6} className='text-center'>Invalid Order (Something wrong going on here, please contact developer to resolve this issue)
                                                        </td>
                                                    </tr>
                                                }
                                            })
                                            : <tr>
                                                <td colSpan={isAdmin(others.user) ? 7 : 6} className='text-center'>No Order Found</td>
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

