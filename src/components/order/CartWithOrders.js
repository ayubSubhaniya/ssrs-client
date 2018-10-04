import React, {Component} from 'react';
import _ from "lodash";
import {withRouter} from 'react-router-dom'
import ServiceDetails from "./payment/ServiceDetails";
import Spinner from "../Spinner";
import NavigationBar from "../NavigationBar";
import '../../styles/orderstatus.css'
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {paymentMode} from "../../constants/PaymentMode";

function getStatus(x,y) {
    if(x==y){
        return 'active'
    }else if(x>y){
        return 'complete'
    }else
        return 'disabled'
}

function TextInfo({lable,data}) {
    if(data)
        return (<div className='row'>
            <div className='col-3'>{lable}</div>
            <div className='col-9'>: {data}</div>
        </div>)
    else
        return ''
}

class CartWithOrders extends Component {
    constructor(props) {
        super(props);
        const cart = props.location.state.cart;
        this.state = {
            cart: cart,
            isCourier: cart.collectionType==='Courier'
        }
    }

    render() {
        const cart = this.state.cart;
        const courier = cart.courier;
        const pickup = cart.pickup;
        console.log(courier, pickup, cart);
        return (
            <div className='mb-4 pb-4'>
                <NavigationBar/>
                <div className="container pb-0 mt-4">
                    <h3>
                        <strong>Order Number: {cart.orderId}</strong>
                    </h3>
                    <hr/>
                    <h3 className='order-status'>{camelCaseToWords(orderStatus[cart.status])}</h3>
                    <div class="row bs-wizard" style={{"borderBottom":"0"}}>
                        <div className={`col-3 bs-wizard-step ${getStatus(cart.status,30)}`}>
                            <div className="text-center bs-wizard-stepnum">Placed</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <div className="bs-wizard-dot"></div>
                        </div>

                        <div className={`col-3 bs-wizard-step ${getStatus(cart.status,40)}`}>
                            <div className="text-center bs-wizard-stepnum">Processing</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <div className="bs-wizard-dot"></div>
                        </div>

                        <div className={`col-3 bs-wizard-step ${getStatus(cart.status,50)}`}>
                            <div className="text-center bs-wizard-stepnum">Ready</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <div className="bs-wizard-dot"></div>
                        </div>

                        <div className={`col-3 bs-wizard-step ${getStatus(cart.status,60)}`}>
                            <div className="text-center bs-wizard-stepnum">Completed</div>
                            <div className="progress"><div className="progress-bar"></div></div>
                            <div className="bs-wizard-dot"></div>
                        </div>
                    </div>

                    <table id="cart" className="table table-hover table-condensed mt-4">
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
                            _.map(cart.orders, (o, i) => <ServiceDetails key={o._id}
                                                                                    order={o}
                                                                                    index={i}/>)
                        }
                        <tr>
                            <td data-th="Product">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <h4 className="nomargin">{cart.collectionType}</h4>
                                    </div>
                                </div>
                            </td>
                            <td colSpan="5"></td>
                            <td className="text-center">₹ {cart.collectionTypeCost}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="total-price">
                        <div><span className={'total'}>Total: ₹ </span><span
                            className='price'>{cart.totalCost}</span></div>
                    </div>
                    <h5><strong>COLLECTION INFORMATION</strong></h5>
                    <div className='container p-1'>
                        <TextInfo lable="Collection Type" data={cart.collectionType}/>
                        {
                            this.state.isCourier
                                ? (
                                    <React.Fragment>
                                        <TextInfo lable="Name" data={courier.name}/>
                                        <TextInfo lable="Address" data={" " + courier.address.line1 +
                                        ", " + courier.city + " - " + courier.pinCode + ", " + courier.state + ", " + courier.country}/>
                                        <TextInfo lable="Phone" data={courier.contactNo}/>
                                        <TextInfo lable="Email" data={courier.email}/>
                                    </React.Fragment>
                                )
                                : ( <React.Fragment>
                                        <TextInfo lable="Collection Code" data={pickup.collectionCode}/>
                                        <TextInfo lable="Name" data={pickup.name}/>
                                        <TextInfo lable="DAIICT ID" data={pickup.daiictId}/>
                                        <TextInfo lable="Phone" data={pickup.contactNo}/>
                                        <TextInfo lable="Email" data={pickup.email}/>
                                </React.Fragment>)
                        }
                    </div>

                    <h5 className={'mt-4'}><strong>PAYMENT INFORMATION</strong></h5>
                    <div className='container p-1'>
                        <TextInfo lable="Payment Mode" data={camelCaseToWords(paymentMode[cart.paymentType])}/>
                        {
                            cart.status==30
                                ? (
                                    <React.Fragment>
                                        <TextInfo lable="Payment Code" data={cart.paymentCode}/>
                                    </React.Fragment>
                                )
                                : ( <React.Fragment>
                                    <TextInfo lable="Payment Code" data={cart.paymentCode}/>
                                </React.Fragment>)
                        }
                    </div>
                </div>
                <Spinner open={this.state.showSpinner}/>
            </div>
        );
    }
}

export default withRouter(CartWithOrders);
