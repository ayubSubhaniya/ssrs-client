import React, {PureComponent} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import _ from "lodash"
import {camelCaseToWords} from "../../helper/String";
import OrderList from "./OrderList";
import {isAdmin, isStudent} from "../../helper/userType";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";
import {rcartStatus} from "../../constants/status";
import {DEFAULT_PAGINATION_SIZE} from "../../constants/constants";

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
};

function getQueryVariable(queryString, variable) {
    let vars = queryString.split('&');
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        pair[0] = pair[0].replace("?", "");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
}

function getQueryFromJson(queryJson) {
    let queryString = '';
    Object.entries(queryJson).forEach(([key, value]) => {
        queryString += key + '=' + value + '&';
    });
    return queryString;
}

class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            filterKey: ['-10', 30, 40, 50, 70, 80, 90, 100, 110, 120, 130],
            isFilterVisible: false,
            filterState: -1,
            cart: [],
        };
        this.size = DEFAULT_PAGINATION_SIZE;
        this.defaultPageUrl = 'pageNo=1&size=' + this.size;
    }

    componentDidMount() {
        const queryString = this.props.location.search;
        this.status = Number(getQueryVariable(queryString, "status"));
        const pageNo = Number(getQueryVariable(queryString, "pageNo"));
        if (pageNo) {
            this.defaultPageUrl = 'pageNo=' + pageNo + 'size=' + this.size;
        }

        if (this.status) {
            this.getCart(this.status);
        } else {
            this.getCart(isAdmin(this.props.user)
                ? rcartStatus.processing
                : isStudent(this.props.user) ? '-10' : -1)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.userType !== this.props.user.userType) {
            if (this.status)
                this.getCart(this.status);
            else
                this.getCart((isAdmin(nextProps.user) ? rcartStatus.processing : '-10'));
        }
    }

    getCart = (filterState, next, searchQuery) => {
        if (filterState === -1)
            return [];
            
        let queryparam = (next === true 
            ? this.state.nextPageUrl 
            : (next === undefined ? this.defaultPageUrl : this.state.prevPageUrl));
        
        if (filterState !== '-10')
            queryparam += '&status=' + filterState;

        if (searchQuery) 
            queryparam += '&' + getQueryFromJson(searchQuery);
        
        queryparam += '&sort=';
        if (isAdmin(this.props.user)) {
            switch (filterState) {                
                case rcartStatus.placed:
                    queryparam += '+statusChangeTime.placed.time'; break;
                case rcartStatus.processing:
                    queryparam += '+statusChangeTime.processing.time'; break;
                case rcartStatus.readyToPickup:
                    queryparam += '+statusChangeTime.readyToPickup.time'; break;
                case rcartStatus.readyToDeliver:
                    queryparam += '+statusChangeTime.readyToDeliver.time'; break;
                default:
                    queryparam += '-statusChangeTime.placed.time';
            }
        } else if (isStudent(this.props.user)) {
            switch(filterState) {
                case rcartStatus.invalid:
                    queryparam += '-statusChangeTime.invalid.time'; break;
                case rcartStatus.paymentFailed:
                    queryparam += '-statusChangeTime.paymentFailed.time'; break;
                case rcartStatus.processingPayment:
                    queryparam += '-statusChangeTime.processingPayment.time'; break;
                default:
                    queryparam += '-statusChangeTime.placed.time';
            }
        }
            
        makeCall({
            jobType: 'GET',
            urlParams: '/cart/all?' + queryparam
        })
            .then((response) => {
                this.setState({
                    cart: response.cart,
                    filterState: filterState,
                    prevPageUrl: response.prev,
                    nextPageUrl: response.next
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
        this.defaultPageUrl = 'pageNo=1&size=' + this.size;
        this.getCart(target.dataset.filter);
    }

    fetchNextPage = () => {
        this.getCart(this.state.filterState, true);
    }

    fetchPrevPage = () => {
        this.getCart(this.state.filterState, false);
    }

    onSearch = (data) => {
        this.defaultPageUrl = 'pageNo=1&size=' + this.size;
        this.getCart(this.state.filterState, undefined, data);
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
                               user={this.props.user}
                               onSearch={this.onSearch}
                               getNext={this.fetchNextPage}
                               getPrev={this.fetchPrevPage}
                               isNextPage={this.state.nextPageUrl !== undefined}
                               isPrevPage={this.state.prevPageUrl !== undefined}/>

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
                                                           checked={String(key) === String(this.state.filterState)}/>
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
                         onClick={this.toggleFilter}>
                         <button className={`btn btn-lg pl-3 pr-3 ${this.state.isFilterVisible ? 'btn-dark' : 'btn-outline-dark'}`}>
                            <span><i class="fa fa-filter mr-2"></i>{"Status Filters"}</span>
                         </button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Filter;
