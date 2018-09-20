import React, {Component} from 'react';
import NavigationBar from "../../NavigationBar";
import Header from "../../Header";
import Service from "./Service";
import Stapes from "../../service/Stapes";
import {Link} from "react-router-dom";

class Cart extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Stapes active={1}/>
                <div className="container">
                    <table id="cart" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th style={{"width": "50%"}}>Service</th>
                            <th style={{"width": "10%"}}>Price</th>
                            <th style={{"width": "8%"}}>Quantity</th>
                            <th style={{"width": "22%"}} className="text-center">Subtotal</th>
                            <th style={{"width": "10%"}}></th>
                        </tr>
                        </thead>
                        <tbody>
                        <Service/>
                        <Service/>
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
                            <td colSpan="2" className="hidden-xs"></td>
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
            </div>
        );
    }
}

export default Cart;
