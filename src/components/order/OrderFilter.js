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
import {DEFAULT_ADMIN_PAGINATION_SIZE, DEFAULT_STUDENT_PAGINATION_SIZE} from "../../constants/constants";

const orders = {
    '-10': "all",
    30: "paymentFailed",
    40: "processingPayment",
    50: "placed",
    70: "processing",
    80: "readyToDeliver",
    90: "readyToPickup",
    100: "onHold",
    120: "completed",
    125: "refunded",
    130: "cancelled",
};

function getFilterKeys() {
    let keys = Object.keys(orders);
    keys.unshift(keys.pop());
    return keys;
}

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
            filterKey: getFilterKeys(),
            isFilterVisible: false,
            filterState: -1,
            cart: [],
            sortOrder: isAdmin(this.props.user) ? "+" : "-"
        };
        this.searchData = {};
        this.currPageNum = 1;
        this.size = (isAdmin(props.user) ? DEFAULT_ADMIN_PAGINATION_SIZE : DEFAULT_STUDENT_PAGINATION_SIZE);
        this.defaultPageUrl = 'pageNo=1&size=' + this.size;
    }

    componentDidMount() {
        const queryString = this.props.location.search;
        this.status = Number(getQueryVariable(queryString, "status"));
        const pageNo = Number(getQueryVariable(queryString, "pageNo"));
        if (pageNo) {
            this.currPageNum = pageNo;
            this.defaultPageUrl = 'pageNo=' + pageNo + 'size=' + this.size;
        }
        this.setState({sortOrder: isAdmin(this.props.user) ? "+" : "-"});
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
            this.setState({sortOrder: isAdmin(this.props.user) ? "+" : "-"});
        }
    }

    getCart = (filterState, next, searchQuery, isToggleSort) => {
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
        let sortOrder = this.state.sortOrder;
        if(isToggleSort){
            sortOrder = sortOrder==="+"?"-":"+";
        }

        switch (filterState) {
            case rcartStatus.paymentFailed:
                queryparam += sortOrder + 'statusChangeTime.paymentFailed.time';
                break;
            case rcartStatus.processingPayment:
                queryparam += sortOrder + 'statusChangeTime.processingPayment.time';
                break;
            case rcartStatus.placed:
                queryparam += sortOrder + 'statusChangeTime.placed.time';
                break;
            case rcartStatus.processing:
                queryparam += sortOrder + 'statusChangeTime.processing.time';
                break;
            case rcartStatus.readyToPickup:
                queryparam += sortOrder + 'statusChangeTime.readyToPickup.time';
                break;
            case rcartStatus.readyToDeliver:
                queryparam += sortOrder + 'statusChangeTime.readyToDeliver.time';
                break;
            default:
                queryparam += sortOrder + 'statusChangeTime.placed.time';
        }

        makeCall({
            jobType: 'GET',
            urlParams: '/cart/all?' + queryparam
        })
            .then((response) => {
                this.currPageNum += (next === true ? 1 : (next === false ? -1 : 0));
                this.setState({
                    cart: response.cart,
                    filterState: filterState,
                    prevPageUrl: response.prev,
                    nextPageUrl: response.next,
                    sortOrder:sortOrder
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
        this.searchData = data;
        this.defaultPageUrl = 'pageNo=1&size=' + this.size;
        this.getCart(this.state.filterState, undefined, data);
    }

    toggleSort = () => {
        this.defaultPageUrl = 'pageNo=' + this.currPageNum + '&size=' + this.size;
        this.getCart(this.state.filterState, undefined, this.searchData, true);
    }

    render() {
        let cart = this.state.cart;
        let filterKey = this.state.filterKey;
        if (isAdmin(this.props.user)) {
            filterKey = _.filter(this.state.filterKey, (x) => (x <= 0 || x >= rcartStatus.placed))
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
                               toggleSort={this.toggleSort}
                               sortOrder={this.state.sortOrder}
                               currPageNum={this.currPageNum}
                               pageSize={this.size}
                               getNext={this.fetchNextPage}
                               getPrev={this.fetchPrevPage}
                               isNextPage={this.state.nextPageUrl !== undefined}
                               isPrevPage={this.state.prevPageUrl !== undefined}/>

                    <div className={`cd-filter ${this.state.isFilterVisible ? 'filter-is-visible' : ''}`}>
                        <form>
                            <div className="cd-filter-block">
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
                        <button
                            className={`btn btn-lg pl-3 pr-3 ${this.state.isFilterVisible ? 'btn-dark' : 'btn-outline-dark'}`}>
                            <span><i class="fa fa-filter mr-2"></i>{"Status Filters"}</span>
                        </button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Filter;
