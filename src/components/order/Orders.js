import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import OrderList from "./OrderList";
import {asyncFetch} from "../../helper/FetchData";
import Spinner from "../Spinner";
import _ from "lodash"


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSpinner: false,
            order: [],
            filteredOrder: [],
        }
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch('order');
    }


    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Orders'}/>
                <div className='container'>
                <div className="row">
                    <div id="filter-panel" className="collapse filter-panel">
                        <div className="panel panel-default">
                            <div className="panel-body">
                                <form className="form-inline" role="form">
                                    <div className="form-group">
                                        <label className="filter-col mr-0"  htmlFor="pref-perpage">Rows
                                            per page:</label>
                                        <select id="pref-perpage" className="form-control">
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option selected="selected" value="10">10</option>
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="300">300</option>
                                            <option value="400">400</option>
                                            <option value="500">500</option>
                                            <option value="1000">1000</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="filter-col mr-0"
                                               htmlFor="pref-search">Search:</label>
                                        <input type="text" className="form-control input-sm" id="pref-search"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="filter-col mr-0" htmlFor="pref-orderby">Order
                                            by:</label>
                                        <select id="pref-orderby" className="form-control">
                                            <option>Descendent</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="checkbox ml-2 mr-2" >
                                            <label><input type="checkbox"/> Remember parameters</label>
                                        </div>
                                        <button type="submit" className="btn btn-default filter-col">
                                            <span className="glyphicon glyphicon-record"></span> Save Settings
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                    <button type="button" className="btn btn-primary mt-2" data-toggle="collapse"
                            data-target="#filter-panel">
                        <span className="glyphicon glyphicon-cog"></span> Filter Orders
                    </button>
                </div>
                <OrderList orders={_.filter(this.state.order,(o) => o.status==40)}
                           user={this.props.user}/>
                <Spinner open={this.state.showSpinner}/>
            </div>

        );
    }
}

export default Orders;
