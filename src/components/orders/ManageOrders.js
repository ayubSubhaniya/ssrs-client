import React, { Component } from 'react';
import Header from "../Header";
import OrderList from "./OrderList";
import NavigationBar from "../NavigationBar";


class ManageOrders extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Manage Orders'}/>
                <OrderList/>
            </div>
        );
    }
}

export default ManageOrders;

