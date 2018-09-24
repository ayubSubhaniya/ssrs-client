import React, {Component} from 'react';
import NavigationBar from "../../NavigationBar";
import Service from "../cart/Service";
import Stapes from "../../service/Stapes";
import {Link} from "react-router-dom";
import {asyncFetch} from "../../../helper/FetchData";
import _ from "lodash"
import Spinner from "../../Spinner";
import {domainUrl} from "../../../config/configuration";
import * as HttpStatus from "http-status-codes";
import $ from "jquery";

class CartDetails extends Component {
    constructor(props) {
        super(props);
        this.state={
            showSpinner: false,
            cart: []
        };
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch('cart');
    };

    render() {
        return (
            <div>
                <div className="container">
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
                            <th style={{"width": "10%"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _.map(this.state.cart.orders,(o,i) => <Service key={o._id}
                                                                           order={o}
                                                                           index={i}/>)
                        }
                        </tbody>
                        <tfoot>
                        <tr className="visible-xs">
                            <td colSpan="4" className="hidden-xs"></td>
                            <td className="text-center"><strong>{`Total: ₹ ${this.state.cart.totalCost}`}</strong></td>
                            <td className="hidden-xs"></td>
                        </tr>
                        <tr>
                            <td>

                            </td>
                            <td colSpan="4" className="hidden-xs"></td>
                            <td>

                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default CartDetails;

