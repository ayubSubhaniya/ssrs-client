import React, { PureComponent } from 'react';
import { withRouter , Redirect} from "react-router-dom"
import { getCart } from "../../../helper/FetchData";
import _ from "lodash"
import ServiceDetails from "./ServiceDetails";
import { defaultCart } from "../../../constants/constants";
import TextInfoMod from "../TextInfoMod"
import { DeliveryInfo, PickupInfo } from "../Info";
import { makeCall } from "../../../helper/caller";
import { handleError } from "../../../helper/error";

class CartDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            cart: defaultCart,
            collectionType: { name: "Loading..." }
        };
        const path = props.location.pathname.split('/');
        this.id = path.length > 2 ? path[2] : '';
    }

    componentDidMount() {
        getCart(this.setCart, this.id)
    }

    setCart = (response) => {
        this.setState({
            cart: response.cart
        })
        this.getCollection(response.cart.collectionType);
    }

    getCollection = (id) => {
        if(!id){
           this.setState({
               redirect: true
           })
            return;
        }
        makeCall({
            jobType: 'GET',
            urlParams: '/collectionType/' + id
        })
            .then((response) => {
                this.setState({
                    collectionType: response.collectionType
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    render() {
        if(this.state.redirect){
            return <Redirect to={"/cart"}/>
        }
        const cart = this.state.cart;
        const delivery = cart.delivery;
        const pickup = cart.pickup;
        return (
            <div>
                <div className="container pb-0 payment_service_info">
                    <h4 className="mb-3"><strong>Service Information</strong></h4>
                    <table id="cart" className="table table-hover table-condensed mb-0">
                        <thead>
                            <tr style={{ 'cursor': 'default' }}>
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
                                    index={i} />)
                            }
                            <tr>
                                <td colSpan="6">
                                    <div>
                                        <h5 className="nomargin" style={{"textAlign": "right", "paddingRight": "2%"}}>+ {this.state.collectionType.name}</h5>
                                    </div>
                                </td>
                                <td className="text-center">₹ {cart.collectionTypeCost}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr className={'mb-0 mt-0'} />

                    <div className="total-price">
                        <div>
                            <span className='total'>Grand Total: ₹ </span>
                            <span className='price'>{cart.totalCost}</span>
                        </div>
                    </div>

                </div>

                <div className="payment_collection_info">
                    <h4><strong>Collection Information</strong></h4>
                    <hr></hr>
                    <div className='container p-1'>
                        <TextInfoMod lable="Collection Type" data={this.state.collectionType.name} />
                        {
                            delivery
                                ? <DeliveryInfo delivery={delivery} />
                                : <PickupInfo pickup={pickup} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CartDetails);

