import React, {PureComponent} from 'react';
import _ from "lodash"
import OrderDetails from "./OrderDetails";
import {isAdmin} from "../../helper/userType";
import {handleChange} from "../../helper/StateUpdate";
import {cartStatus} from "../../constants/status";
import SearchForm from "./SearchForm";

class OrderList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
        this.handleChange = handleChange.bind(this);
    }

    isMatchOrderName = (cart, regexOfSearch) => {
        return _.some(cart.orders, (order) => order.service.name.match(regexOfSearch));
    };

    isMatched = (cart, regexOfSearch) => {
        return (cart.orderId.match(regexOfSearch)
            || this.isMatchOrderName(cart, regexOfSearch)
            || cart.requestedBy.match(regexOfSearch)
            || cartStatus[cart.status].match(regexOfSearch))
    };

    render() {
        const {carts, ...others} = this.props;
        let filteredCarts = carts;

        return (
            <section className={`orders cd-gallery ${this.props.isFilterVisible ? 'filter-is-visible' : ''}`}>

                <div className="limiter">
                    <SearchForm onSubmit={this.onSearch}
                                toggleSort={this.props.toggleSort}
                                sortOrder={this.props.sortOrder}
                                user={this.props.user}/>

                    <div className="container-table100 mb-5">
                        <div className="wrap-table100">
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
                                                if (cart.orders.length > 0) {
                                                    return (
                                                        <OrderDetails key={cart._id}
                                                                      cart={cart}
                                                                      index={i}
                                                                      {...others}/>
                                                    )
                                                } else {
                                                    return <tr>
                                                        <td colSpan={isAdmin(others.user) ? 7 : 6}
                                                            className='text-center'>Invalid Order (Something wrong going on
                                                            here, please contact developer to resolve this issue)
                                                        </td>
                                                    </tr>
                                                }
                                            })
                                            : <tr>
                                                <td colSpan={isAdmin(others.user) ? 7 : 6} className='text-center'>No Order
                                                    Found
                                                </td>
                                            </tr>
                                    }
                                    </tbody>
                                </table>
                                <div className="container d-flex justify-content-end">
                                    {
                                        this.props.isPrevPage
                                            ? <div className="btn btn-outline-dark cursor-pointer mt-2 mr-1"
                                                   onClick={this.props.getPrev}>
                                                <i className="fa fa-chevron-left"/>
                                            </div>
                                            :
                                            <div className="btn btn-outline-dark disabled cursor-not-allowed mt-2 mr-1">
                                                <i className="fa fa-chevron-left"/>
                                            </div>
                                    }
                                    <div className="btn btn-dark mt-2">{this.props.currPageNum}</div>
                                    {
                                        this.props.isNextPage
                                            ? <div className="btn btn-outline-dark cursor-pointer mt-2 ml-1"
                                                   onClick={this.props.getNext}>
                                                <i className="fa fa-chevron-right"/>
                                            </div>
                                            :
                                            <div className="btn btn-outline-dark disabled cursor-not-allowed mt-2 ml-1">
                                                <i className="fa fa-chevron-right"/>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default OrderList;

