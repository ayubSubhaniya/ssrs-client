import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import OrderList from "./OrderList";
import {syncFetch} from "../../helper/FetchData";


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state={
            order: syncFetch("order"),
            service: syncFetch("service")
        }
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Orders'}/>
                <OrderList orders={this.state.order}
                           services={this.state.service}
                           user={this.props.user}/>
            </div>

        );
    }
}

export default Orders;
