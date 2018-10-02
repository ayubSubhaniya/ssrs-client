import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import Spinner from "../Spinner";
import _ from "lodash"
import {asyncFetch} from "../../helper/FetchData";
import {domainUrl} from "../../config/configuration";
import {camelCaseToWords} from "../../helper/String";
import * as HttpStatus from "http-status-codes";
import CartList from "./CartList";
const filterKey  = ['-10',30,40,50,60,70,80,90,0];
const filter = {
    '-10': "all",
    0: "failed",
    30: "placed",
    40: "processing",
    50: "ready",
    60: "completed",
    70: "onHold",
    80: "cancelled",
    90: "refunded"
}

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isFilterVisible: false,
            filterState: '-10',
            order: [],
            cart: [],
        }
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount() {
        this.asyncFetch('order');
        this.fetchCart();
    }

    updateOrderStatus = (index, updatedStatus) => {
        console.log(index, updatedStatus);
        this.setState({
            showSpinner: true
        });

        const that = this;
        const order = this.state.order[index];
        const url = domainUrl + '/order/changeStatus/' + order._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                const response = JSON.parse(request.response)
                console.log(response);
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify({
            status: updatedStatus
        }));
    }


    fetchCart = () => {
        const that = this;
        that.setState({
            showSpinner: true
        })
        const url = domainUrl + '/' + 'cart/all'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                try {
                    const obj = JSON.parse(request.responseText);
                    console.log(obj);
                    that.setState({
                        cart: _.filter(obj['cart'], (o) => o.status != 20),
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
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

                    <CartList carts={this.filterCart(this.state.cart)}
                              isFilterVisible={this.state.isFilterVisible}
                              updateStatus={this.updateOrderStatus}
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
                                                        {camelCaseToWords(filter[key])}
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
