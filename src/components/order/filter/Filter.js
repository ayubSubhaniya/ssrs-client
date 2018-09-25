import React, {Component} from 'react';
import NavigationBar from "../../NavigationBar";
import Header from "../../Header";
import OrderList from "./../OrderList";
import Spinner from "../../Spinner";
import _ from "lodash"
import {asyncFetch} from "../../../helper/FetchData";
import {orderStatus} from "../../../constants/status"
import {domainUrl} from "../../../config/configuration";
import {camelCaseToWords} from "../../../helper/String";
import * as HttpStatus from "http-status-codes";

// function asyncFetch(dataName) {
//     const that = this;
//     that.setState({
//         showSpinner: true
//     })
//     const url = domainUrl + '/' + 'cart/all'
//     var request = new XMLHttpRequest();
//     request.open('GET', url, true);
//     request.withCredentials = true;
//     request.onload = function () {
//         if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
//             try {
//                 const obj = JSON.parse(request.responseText);
//                 console.log(obj);
//                 that.setState({
//                     order: obj['cart'],
//                 })
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//         that.setState({
//             showSpinner: false
//         })
//     };
//     request.send();
// }


class Filter extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSpinner: false,
            isFilterVisible: false,
            filterState: 20,
            order: []
        }
        this.asyncFetch = asyncFetch.bind(this);
    }

    filterOrder = (order) => {
        return _.filter(order,(o)=>o.status==this.state.filterState);
    }

    componentDidMount(){
        this.asyncFetch('order');
    }

    showFilter = () => {
        this.setState({
            isFilterVisible: true
        })
    }
    hideFilter = () => {
        this.setState({
            isFilterVisible: false
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
                    {/*<div className="cd-tab-filter-wrapper">*/}
                        {/*<div className="cd-tab-filter">*/}
                            {/*<ul className="cd-filters">*/}
                                {/*<li className="placeholder">*/}
                                    {/*<a data-type="all" href="#0">Placed</a>*/}
                                {/*</li>*/}
                                {/*<li className="filter"><a className="selected" href="#0" data-type="placed">Placed</a></li>*/}
                                {/*<li className="filter" data-filter=".color-1"><a href="#0" data-type="processing">*/}
                                    {/*Processing*/}
                                {/*</a></li>*/}
                                {/*<li className="filter" data-filter=".color-1"><a href="#0" data-type="ready">*/}
                                    {/*Ready*/}
                                {/*</a></li>*/}
                                {/*<li className="filter" data-filter=".color-2"><a href="#0" data-type="completed">Completed</a></li>*/}
                            {/*</ul>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                    <OrderList orders={this.filterOrder(this.state.order)}
                               isFilterVisible={this.state.isFilterVisible}
                               user={this.props.user}/>

                    <div className={`cd-filter ${this.state.isFilterVisible?'filter-is-visible':''}`}>
                        <form>
                            <div className="cd-filter-block">
                                <h4>Order Status</h4>
                                <ul className="cd-filter-content cd-filters list m-0 list-unstyled">
                                    {
                                        _.map(Object.keys(orderStatus),(key) => {
                                            return (
                                                <li className={'mix'}>
                                                    <input className="filter" type="radio" checked={key==this.state.filterState}/>
                                                    <label className="radio-label"  data-filter={key} onClick={this.updateFilter}>
                                                        {camelCaseToWords(orderStatus[key])}
                                                    </label>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </form>

                        <div className="cd-close" onClick={this.hideFilter}>Close</div>
                    </div>

                    <div className={`cd-filter-trigger ${this.state.isFilterVisible?'filter-is-visible':''}`} onClick={this.showFilter}>Filters</div>
                </main>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default Filter;
