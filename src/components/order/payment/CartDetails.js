import React, {Component} from 'react';
import {asyncFetch} from "../../../helper/FetchData";
import _ from "lodash"
import Spinner from "../../Spinner";
import ServiceDetails from "./ServiceDetails";

class CartDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            cart: []
        };
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount() {
        this.asyncFetch('cart');
    };

    render() {
        return (
            <div>
                <div className="container pb-0">
                    <table id="cart" className="table table-hover table-condensed mb-0">
                        <thead>
                        <tr style={{'cursor': 'default'}}>
                            <th style={{"width": "15%"}}>Service</th>
                            <th style={{"width": "10%"}}>Parameters</th>
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
                        <tr>
                            <td data-th="Product">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <h4 className="nomargin">{this.state.cart.collectionType}</h4>
                                    </div>
                                </div>
                            </td>
                            <td colSpan="5"></td>
                            <td className="text-center">₹ {this.state.cart.collectionTypeCost}</td>
                        </tr>
                        </tbody>
                    </table>
                    <hr className={'mb-0 mt-0'}/>
                    <div className="total-price">
                        <div><span className={'total'}>Total: ₹ </span><span
                            className='price'>{this.state.cart.totalCost}</span></div>
                    </div>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default CartDetails;

