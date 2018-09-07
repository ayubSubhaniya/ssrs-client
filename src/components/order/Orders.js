import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import "../../styles/orders.css"
import OrderList from "./OrderList";
import {fetch} from "../../helper/FetchData";


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state={
            order:[]
        }
        this.fetch = fetch.bind(this);
        this.fetch("order")
        this.fetch("service")
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Orders'}/>
                <div className="container container-custom">
                    <table id="orders" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th style={{"width": "50%"}}>Order Description</th>
                            <th style={{"width": "30%"}}>Status</th>
                            <th style={{"width": "10%"}}>Quantity</th>
                            <th style={{"width": "10%"}}>Total</th>
                        </tr>
                        </thead>
                        <tbody>
                       <OrderList orders={this.state.order} services={this.state.service}/>
                        </tbody>
                            {/*<div  className="submit">View More <i*/}
                                {/*className="fa fa-angle-right"></i></div>*/}
                    </table>
                </div>
            </div>

        );
    }
}

export default Orders;
