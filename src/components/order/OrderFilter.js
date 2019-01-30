import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import _ from "lodash"
import {camelCaseToWords} from "../../helper/String";
import OrderList from "./OrderList";
import {isAdmin, isStudent} from "../../helper/userType";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import {rcartStatus} from "../../constants/status";

const orders = {
    '-10': "all",
    30: "paymentFailed",
    40: "processingPayment",
    50: "placed",
    70: "processing",
    80: "readyToDeliver",
    90: "readyToPickup",
    100: "onHold",
    110: "refunded",
    120: "completed",
    130: "cancelled"
}

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterKey: ['-10', 30, 40, 50, 70, 80, 90, 100, 110, 120, 130],
            isFilterVisible: false,
            filterState: -1,
            cart: [],
        }
    }

    componentDidMount() {
        this.getCart(isAdmin(this.props.user)
            ? rcartStatus.processing
            : isStudent(this.props.user) ? '-10' : -1)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userType !== this.props.user.userType) {
            this.getCart((isAdmin(nextProps.user) ? rcartStatus.processing : '-10'))
        }
    }

    getCart = (filterState) => {
        if (filterState === -1)
            return [];
        const params = filterState === '-10'
            ? undefined
            : {"status": filterState}
        makeCall({
            jobType: 'GET',
            urlParams: '/cart/all',
            params: params
        })
            .then((response) => {
                this.setState({
                    cart: response.cart,
                    filterState: filterState
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    toggleFilter = () => {
        this.setState({
            isFilterVisible: !this.state.isFilterVisible
        })
    }

    updateFilter = ({target}) => {
        this.getCart(target.dataset.filter);
    }

    render() {
        let cart = this.state.cart;
        let filterKey = this.state.filterKey;
        if (isAdmin(this.props.user)) {
            cart = _.filter(this.state.cart, (x) => (x.status !== rcartStatus.processingPayment))
            filterKey = _.filter(this.state.filterKey, (x) => (x !== rcartStatus.processingPayment && x !== rcartStatus.paymentFailed))
        }
        return (
            <div>
                <NavigationBar/>
                <Header title={'Orders'}/>
                <main className="cd-main-content">

                    <OrderList carts={cart}
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
                                                           checked={key === this.state.filterState}/>
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

                        <div className="cd-close" style={{"fontSize": "35px"}} onClick={this.toggleFilter}>&times;</div>
                    </div>

                    <div className={`cd-filter-trigger ${this.state.isFilterVisible ? 'filter-is-visible' : ''}`}
                         onClick={this.toggleFilter}>Filters
                    </div>
                </main>
            </div>
        );
    }
}

export default Filter;
