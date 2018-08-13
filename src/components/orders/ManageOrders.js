import React, { Component } from 'react';
import Header from "../Header";
import OrderList from "./OrderList";


class ManageOrders extends Component {
    render() {
        return (
            <div>
                <Header title={'Manage Orders'}/>
                <OrderList/>
            </div>
        );
    }
}

export default ManageOrders;

