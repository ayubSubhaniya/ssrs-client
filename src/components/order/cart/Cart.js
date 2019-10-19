import React, {PureComponent} from 'react';
import NavigationBar from "../../NavigationBar";
import Service from "./Service";
import Stapes from "../../service/Stapes";
import {Link} from "react-router-dom";
import {asyncFetch} from "../../../helper/FetchData";
import _ from "lodash"
import {domainUrl} from "../../../config/configuration";
import * as HttpStatus from "http-status-codes";
import {handleError} from "../../../helper/error";
import {loadSpinner, unloadSpinner} from "../../../helper/spinner";

class Cart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        };
        this.asyncFetch = asyncFetch.bind(this);
    }

    getAllAvailableCollectionTypes = (cart) => {
        const orders = cart.orders;
        if (_.isEmpty(orders)) {
            return [];
        }

        return _.reduce(orders, function (availableCollectionType, order) {
            return _.intersectionBy(availableCollectionType, order.service.collectionTypes, "_id");
        }, orders[0].service.collectionTypes);
    };

    componentDidMount() {
        this.asyncFetch('cart');
    }

    updateOrder = (newOrder, index, closeModal) => {
        loadSpinner();
        const oldOrder = this.state.cart.orders[index];
        const that = this;
        const url = domainUrl + '/order/' + oldOrder._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            unloadSpinner();
            if (this.status === HttpStatus.OK) {
                closeModal()
                that.asyncFetch('cart');
            } else {
                handleError(request)
            }
        };
        request.send(JSON.stringify(newOrder));
    };

    deleteOrder = (index) => {
        loadSpinner();
        const that = this;
        const url = domainUrl + '/order/' + this.state.cart.orders[index]._id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            unloadSpinner();
            if (this.status === HttpStatus.OK) {
                that.asyncFetch('cart');
            } else {
                handleError(request)
            }
        }
        request.send();
    }

    render() {

        if (this.state.cart.length === 0 || this.state.cart.orders.length === 0) {
            return (
                <div>
                    <NavigationBar/>
                    <Stapes active={1}/>
                    <div className="container cart-empty mt-4">
                        <h1 id="heading_position"> Your cart is empty! </h1>
                        <Link to={'/service'} className='mt-4'>
                            <button className="btn btn-outline-dark btn-lg">
                                {"Go, Add Services"} </button>
                        </Link>
                    </div>
                </div>
            )
        }

        const availableCollectionTypes = this.getAllAvailableCollectionTypes(this.state.cart);
        return (
            <div>
                <NavigationBar/>
                <Stapes active={1}/>
                <div className="container">
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th className='text-center'>Service</th>
                            <th className='text-center'>Parameters</th>
                            <th className='text-center'>Quantity</th>
                            <th className='text-center'>Service Cost</th>
                            <th className='text-center'>Parameter Cost</th>
                            <th className='text-center'>Subtotal</th>
                            <th className='text-center'/>
                        </tr>
                        </thead>
                        <tbody style={{width: '100%', padding: '0%', margin: '0%'}}>
                        {
                            _.map(this.state.cart.orders, (o, i) => <Service key={o._id}
                                                                             order={o}
                                                                             index={i}
                                                                             updateOrder={this.updateOrder}
                                                                             deleteOrder={this.deleteOrder}/>)
                        }
                        </tbody>
                        <tfoot>
                        <tr className="visible-xs">
                            <td colSpan="5" className="hidden-xs">
                                <div
                                    className={"alert alert-danger p-2 mt-2 mb-2" + (availableCollectionTypes.length > 0 ? ' d-none' : '')}>
                                    <strong>{'Collection Type Not matching for this Services, Please Order Separately!'}</strong>
                                </div>
                            </td>
                            <td className="text-center"><strong>{`Total: ₹ ${this.state.cart.totalCost}`}</strong></td>
                            <td className="hidden-xs"/>
                        </tr>
                        <tr>
                            <td>
                                <Link to={'/service'}>
                                    <div className="btn btn-secondary btn-lg">
                                        <i className="fa fa-angle-left"/>
                                        {" Add More Services"} </div>
                                </Link>
                            </td>
                            <td colSpan="5" className="hidden-xs"/>
                            <td>
                                <Link to={{
                                    pathname: '/info', state: {
                                        availableCollectionTypes: availableCollectionTypes
                                    }
                                }} className={`${availableCollectionTypes.length === 0 ? 'disabled-link' : ''}`}>
                                    <div className={`btn btn-success btn-lg`}>
                                        {"Checkout"}
                                        <i className="fa fa-angle-right ml-2"/>
                                    </div>
                                </Link>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default Cart;

