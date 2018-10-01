import React, {Component} from 'react';
import _ from "lodash";
import {withRouter} from 'react-router-dom'
import ServiceDetails from "./payment/ServiceDetails";
import Spinner from "../Spinner";
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import CourierDetails from "./CourierDetails";
import PickUpDetails from "./PickUpDetails";

class CartWithOrders extends Component {
    constructor(props) {
        super(props);
        const cart = props.location.state.cart;
        this.state={
            cart: cart,
            isCourier: cart.collectionType
        }
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Order'}/>
                <div className="container pb-0">
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th style={{"width": "40%"}}>Service</th>
                            <th style={{"width": "20%"}}>Parameters</th>
                            <th style={{"width": "10%"}}>Price</th>
                            <th style={{"width": "8%"}}>Quantity</th>
                            <th style={{"width": "10%"}} className="text-center">Service Cost</th>
                            <th style={{"width": "12%"}} className="text-center">Parameter Cost</th>
                            <th style={{"width": "12%"}} className="text-center">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _.map(this.state.cart.orders, (o, i) => <ServiceDetails key={o._id}
                                                                                    order={o}
                                                                                    index={i}/>)
                        }
                        </tbody>
                    </table>
                    <div className="total-price"><div><span className={'total'}>Total: ₹ </span><span className='price'>{this.state.cart.totalCost}</span></div>
                    </div>
                    <div><strong>Collection Type: </strong>{this.state.cart.collectionType}</div>
                    <div><strong>Collector's Details: </strong>
                        {
                            this.state.isCourier
                                ? (<CourierDetails data={this.state.cart.courier}/>)
                                : (<PickUpDetails data={this.state.cart.pickup}/>)
                        }
                    </div>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default withRouter(CartWithOrders);
