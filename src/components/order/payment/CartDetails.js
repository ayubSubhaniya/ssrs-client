import React, {Component} from 'react';
import {getCart} from "../../../helper/FetchData";
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import {defaultCart} from "../../../constants/constants";
import TextInfo from "../TextInfo"
import {DeliveryInfo,PickupInfo} from "../Info";

class CartDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: defaultCart
        };
    }

    componentDidMount() {
        getCart(this.setCart)
    }

    setCart = (response) => {
        this.setState({
            cart: response.cart
        })
    }

    render() {
        const cart = this.state.cart;
        const delivery = cart.delivery;
        const pickup = cart.pickup;
        return (
            <div>
                <div className="container pb-0">
                    <table id="cart" className="table table-hover table-condensed mb-0">
                        <thead>
                        <tr style={{'cursor': 'default'}}>
                            <th className="text-center">Service</th>
                            <th className="text-center">Parameters</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Service Cost</th>
                            <th className="text-center">Parameter Cost</th>
                            <th className="text-center">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            _.map(cart.orders, (o, i) => <ServiceDetails key={o._id}
                                                                                    order={o}
                                                                                    index={i}/>)
                        }
                        <tr>
                            <td data-th="Service">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <h4 className="nomargin">{this.props.collectionType.name}</h4>
                                    </div>
                                </div>
                            </td>
                            <td colSpan="5"></td>
                            <td className="text-center">₹ {cart.collectionTypeCost}</td>
                        </tr>
                        </tbody>
                    </table>
                    <hr className={'mb-0 mt-0'}/>

                    <div className="total-price">
                        <div><span className={'total'}>Total: ₹ </span><span
                            className='price'>{this.state.cart.totalCost}</span></div>
                    </div>

                    <h5><strong>COLLECTION INFORMATION</strong></h5>
                    <div className='container p-1'>
                        <TextInfo lable="Collection Type" data={this.props.collectionType.name}/>
                        {
                           delivery
                                ? <DeliveryInfo delivery={delivery}/>
                                : <PickupInfo pickup={pickup}/>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default CartDetails;

