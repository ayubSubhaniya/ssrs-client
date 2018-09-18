import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import OrderList from "./OrderList";
import {asyncFetch} from "../../helper/FetchData";
import Spinner from "../Spinner";


class Orders extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSpinner: false,
            order: []
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
                <OrderList orders={this.state.order}
                           user={this.props.user}/>
                <Spinner open={this.state.showSpinner}/>
            </div>

        );
    }
}

export default Orders;
