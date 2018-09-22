import React, {Component} from 'react';
import NavigationBar from "../../NavigationBar";
import Service from "./Service";
import Stapes from "../../service/Stapes";
import {Link} from "react-router-dom";
import {asyncFetch} from "../../../helper/FetchData";
import _ from "lodash"
import Spinner from "../../Spinner";
import OrderForm from "../../service/OrderForm";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSpinner: false,
            orderFormVisible: false,
            currentServiceToOrder: undefined,
            order: []
        }
        this.asyncFetch = asyncFetch.bind(this);
    }

    openOrderForm = (service) => {
        this.setState({
            orderFormVisible: true,
            currentServiceToOrder: service
        })
    }

    closeOrderForm = () => {
        this.setState({
            orderFormVisible: false,
            currentServiceToOrder: undefined
        })
    }

    componentDidMount(){
        this.asyncFetch('order');
    }
    render() {
        console.log(this.props.location);
        return (
            <div>
                <NavigationBar/>
                <Stapes active={1}/>
                <div className="container">
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th style={{"width": "40%"}}>Service</th>
                            <th style={{"width": "22%"}}>Parameters</th>
                            <th style={{"width": "10%"}}>Price</th>
                            <th style={{"width": "8%"}}>Quantity</th>
                            <th style={{"width": "10%"}} className="text-center">Subtotal</th>
                            <th style={{"width": "10%"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _.map(this.state.order,(o) => <Service order={o}
                                                                   openOrderForm={this.openOrderForm}/>)
                        }
                        </tbody>
                        <tfoot>
                        <tr className="visible-xs">
                            <td className="text-center"><strong>{"Total 1.99"}</strong></td>
                        </tr>
                        <tr>
                            <td>
                                <Link to={'/service'}>
                                    <div className="btn btn-warning">
                                        <i className="fa fa-angle-left"></i>
                                        {" Add More Services"} </div>
                                </Link>
                            </td>
                            <td colSpan="3" className="hidden-xs"></td>
                            <td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
                            <td>
                                <Link to={'/info'}>
                                    <div className="btn btn-success">
                                        {"Checkout "}
                                        <i className="fa fa-angle-right"></i>
                                    </div>
                                </Link>
                                </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                {
                    this.state.orderFormVisible==true
                        ? <OrderForm service={this.state.currentServiceToOrder}
                                     closeModal={this.closeOrderForm}/>
                        : ''
                }
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default Cart;
