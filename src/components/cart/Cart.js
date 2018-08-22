import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Header from "../Header";
import Service from "./Service";
import "../../styles/cart.css"

class Cart extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'My Cart'}/>
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
                            <td><a href="#" className="btn btn-warning"><i className="fa fa-angle-left"></i> Add More Services</a></td>
                            <td colSpan="2" className="hidden-xs"></td>
                            <td className="hidden-xs text-center"><strong>Total $1.99</strong></td>
                            <td><a href="#" className="btn btn-success btn-block">Checkout <i
                                className="fa fa-angle-right"></i></a></td>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        );
    }
}

export default Cart;
