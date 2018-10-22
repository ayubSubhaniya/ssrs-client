import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import Spinner from "../Spinner";
import _ from "lodash"
import {camelCaseToWords} from "../../helper/String";
import OrderList from "./OrderList";
import {isSuperAdmin} from "../../helper/userType";
import {makeCall} from "../../helper/caller";

const filterKey = ['-10', 30, 50, 60, 70, 80, 90, 100, 110, 0];
const orders = {
    '-10': "all",
    0: "failed",
    30: "placed",
    50: "processing",
    60: "readyToDeliver",
    70: "readyToPickup",
    80: "completed",
    90: "onHold",
    100: "cancelled",
    110: "refunded"
}

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isFilterVisible: false,
            filterState: (isSuperAdmin(this.props.user) ? 50 : '-10'),
            cart: [],
        }
    }

    componentDidMount() {
        this.getAllCart();
    }

    getAllCart = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/cart/all'
        })
            .then((response) => {
                this.setState({
                    cart: _.filter(response.cart, (o) => o.status != 20),
                })
            })
    }

    filterOrder = (order) => {
        return _.filter(order, (o) => o.status == this.state.filterState);
    }

    filterCart = (cart) => {
        if (this.state.filterState === '-10') {
            return cart;
        } else
            return _.filter(cart, (o) => o.status == this.state.filterState);
    }

    toggleFilter = () => {
        this.setState({
            isFilterVisible: !this.state.isFilterVisible
        })
    }
    updateFilter = ({target}) => {
        this.setState({
            filterState: target.dataset.filter
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Orders'}/>
                <main className="cd-main-content">

                    <OrderList carts={this.filterCart(this.state.cart)}
                               isFilterVisible={this.state.isFilterVisible}
                               user={this.props.user}/>

                    <div className={`cd-filter ${this.state.isFilterVisible ? 'filter-is-visible' : ''}`}>
                        <form>
                            <div className="cd-filter-block">
                                <h4>Order Status</h4>
                                <ul className="cd-filter-content cd-filters list m-0 list-unstyled">
                                    {
                                        _.map(filterKey, (key) => {
                                            return (
                                                <li key={key}>
                                                    <input className="filter" type="radio"
                                                           checked={key == this.state.filterState}/>
                                                    <label className="radio-label" data-filter={key}
                                                           onClick={this.updateFilter}>
                                                        {camelCaseToWords(orders[key])}
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </form>

                        <div className="cd-close" onClick={this.toggleFilter}>Close</div>
                    </div>

                    <div className={`cd-filter-trigger ${this.state.isFilterVisible ? 'filter-is-visible' : ''}`}
                         onClick={this.toggleFilter}>Filters
                    </div>
                </main>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default Filter;
