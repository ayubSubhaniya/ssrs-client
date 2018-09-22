import React from 'react'
import Stapes from "../../service/Stapes";
import {Link} from "react-router-dom";
import NavigationBar from "../../NavigationBar";
import CourierForm from "../CourierForm";

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAddress: false
        }
    }

    openAddressModal = () => {
        this.setState({
            editAddress: true
        })
    }
    closeAddressModal = () => {
        this.setState({
            editAddress: false
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className='container'>
                    <Stapes active={2}/>
                    <div className="page-main">
                        <div className="address-box">
                            <div className="address-title">
                                <h3 className="title">
                                    Recipient information
                                </h3>
                            </div>
                            <div className="address">
                                <p className={'item-address'}><strong>Sagar Savaliya</strong></p>
                                <p className={'item-address'}>7043515704</p>
                                <p className={'item-address'}>{" " + "sagarsavaliya407@gmail.com"}</p>
                                <p className={'item-address'}>H-301, DA-IICT, Near indroda circle, Gandhinagar, 382007 , Gujarat , 382007,  GANDHI NAGAR, GUJARAT </p>
                                <p className="item-address address-edit-btn" onClick={this.openAddressModal}>EDIT</p>
                            </div>

                            <div className="empty-box" onClick={this.openAddressModal}>
                                <span className="icon-add">+</span> Add Address
                            </div>
                            <CourierForm open={this.state.editAddress} close={this.closeAddressModal}/>
                        </div>
                        <form action="https://store.mi.com/in/buy/checkout" method="post" id="orderCheckOut">
                            <div className="checkout-box">
                                <div className="shop-info-box J_validMsg" style={{"display": "block"}}></div>
                                <div className="section section-order">
                                    <div className="order-info-hd check-left-part">
                                        <h3 className="title">Order information</h3>
                                    </div>
                                    <div className="order-info-bd check-right-part">
                                        <ul className="checkout-list">

                                            <li>
                                                <div className="col col-img">
                                                    <img
                                                        src="https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1536382744.10833364.png?width=50&amp;height=50"
                                                        alt="Mi Earphones Basic Red"/>
                                                </div>
                                                <div className="col col-name">
        <span className="item-name">
          Mi Earphones Basic Red                                <br/><span className="sold-by">Sold by: Xiaomi Technology India Private Limited</span>

        </span>
                                                </div>
                                                <div className="col col-flag">
                                                </div>
                                                <div className="col col-price">
                                                    ₹<span>399</span> x 1
                                                </div>
                                                <div className="col col-total">
                                                    ₹<span>399</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="col col-img">
                                                    <img
                                                        src="https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1529487188.62678249.jpg?width=50&amp;height=50"
                                                        alt="Mi Pocket Speaker 2 Black"/>
                                                </div>
                                                <div className="col col-name">
        <span className="item-name">
          Mi Pocket Speaker 2 Black                                <br/><span className="sold-by">Sold by: Xiaomi Technology India Private Limited</span>

        </span>
                                                </div>
                                                <div className="col col-flag">
                                                </div>
                                                <div className="col col-price">
                                                    ₹<span>1,499</span> x 1
                                                </div>
                                                <div className="col col-total">
                                                    ₹<span>1,499</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="section section-time ">
                                    <div className="order-info-hd check-left-part">
                                        <h3 className="title">Delivery Service</h3>
                                    </div>
                                    <div className="order-info-bd check-right-part">
                                        <h3 className="title tab-switch">
                                            <span className="J_standTab stand-tab">Home Delivery</span><span
                                            className="J_smartTab smart-tab hide"
                                            style={{"display": "none"}}>Smartbox</span>
                                        </h3>
                                        <div className="home-delivery hide" style={{"display": "none"}}>
                                            <div className="deliveryService">
                                            </div>
                                        </div>
                                        <div className="smart-box hide" style={{"display": "none"}}>
                                            <div className="what"><span>How to use</span><img
                                                src="//i01.appmifile.com/webfile/globalimg/in/giftcard/question-icon.png"/>
                                            </div>
                                            <div className="explain" style={{"display": "none"}}></div>
                                            <p className="sub-info">

                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <input type="hidden" name="Checkout[zipcode]" id="s_zipcode" value="382007"/>
                                <input type="hidden" name="Checkout[smartbox_id]" id="smartbox_id" value=""/>
                                <input type="hidden" name="Checkout[address]" id="s_address" value=""/>
                                <input type="hidden" name="Checkout[city]" id="s_city" value=""/>
                                <input type="hidden" name="Checkout[landmark]" id="s_landmark" value=""/>

                                <div className="section section-gst">
                                    <div className="order-info-hd check-left-part">
                                        <h3 className="title">
                                            <div className="titleDis">GST Details</div>
                                            <div className="hour_service_problem"
                                                 style={{"display": "none"}}>
                                                <p id="hour_service_answer"
                                                   style={{"display": "none"}}></p>
                                            </div>
                                            <div style={{"clear": "both"}}></div>
                                        </h3>
                                    </div>
                                    <div className="order-info-bd check-right-part">
                                        <label htmlFor="J_gstCheckbox" className="service_check">
                                            <input id="J_gstCheckbox" className="checkbox"
                                                   type="checkbox" value=""/>
                                            Use GSTIN for this order (optional)
                                        </label>

                                        <div style={{"display": "none"}} className="gst-address"
                                             id="J_gstAddress">
                                            <p className="desc ">Please fill Billing Address at
                                                first.
                                                The state code (first 2 digits) in GSTIN should
                                                match
                                                with the state in billing address</p>
                                            <div className="default-gst-addr ">
                                                <div className="gst-default-address"
                                                     data-gstpre="24"
                                                     data-addressid="10180307187303860"><p
                                                    className="gst-addr-title"><span
                                                    className="gst-addr-title-name">sagar savaliya</span><span
                                                    className="J_gstaddr_change gst-addr-change">CHANGE</span>
                                                </p>
                                                    <div className="gst-container"><p
                                                        className="gst-addr-detail"><span>H-301, DA-IICT, Near indroda circle, Gandhinagar, 382007 </span>
                                                        <span></span><span>382007</span> <span> GANDHI NAGAR</span>
                                                        <span>GUJARAT</span></p></div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="desc">Xiaomi shall not be responsible for
                                            incorrect or inaccurate GSTIN number provided by
                                            you.</p>
                                        <div style={{"display": "none"}} id="J_gstContainer"
                                             className="input-box">
                                            <p className="gst-show-box">
                                                <span id="J_gstRealInputCode">24</span>
                                                <span id="J_gstRealInput"
                                                      className="real-input"></span>
                                                <span id="J_gstPlaceholder"
                                                      className="placeholder">AAAAA0000A 1Z5</span>
                                            </p>
                                            <input id="J_gstInput" className="gst-input" type="text"
                                                   autoComplete="off"/>
                                            <p className="error" id="J_gstError"
                                               style={{"display": "none"}}></p>
                                        </div>
                                    </div>

                                </div>
                                <div className="section section-coupon">
                                    <div className="order-info-hd check-left-part">
                                        <h3 className="title">

                                            <div className="titleDis">Discount Coupon /<br/>Gift Card
                                            </div>
                                        </h3>
                                    </div>
                                    <div className="order-info-bd check-right-part">
                                        <div className="no-coupon">

                                            <p className="J_noCoupon title">No Coupon / Gift Card
                                                available<span
                                                    className="iconfont-arrowright-l-64"></span></p>
                                        </div>
                                        <div className="coupontab-switch hide">
                                                            <span data-child="coupon-lists"
                                                                  className="coupon-tab active  hide"
                                                                  data-count="0">COUPON</span>
                                            <span data-child="exchange-coupon-lists"
                                                  className="exchange-coupon-tab hide"
                                                  data-count="0">EXCHANGE COUPON</span>
                                            <span data-child="giftcard-lists"
                                                  className="giftcard-tab"
                                                  data-count="0">GIFT CARD</span>
                                        </div>
                                        <div className="galley-container">
                                            <div
                                                className="coupon-lists-wrapper cards slide-outer hide"
                                                data-price-child="coupon-price">
                                                                <span className="page-left J_page_coupon_left"
                                                                      style={{"display": "none"}}><img
                                                                    src="//i01.appmifile.com/webfile/globalimg/in/giftcard/left.png"/></span>
                                                <span className="page-right J_page_coupon_right"
                                                      style={{"display": "none"}}><img
                                                    src="//i01.appmifile.com/webfile/globalimg/in/giftcard/right.png"/></span>
                                                <div className="coupon-lists cards-wrapper "
                                                     data-count="0">
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="exchange-coupon-lists-wrapper cards hide galley-container"
                                            data-price-child="exchange-coupon-price">
                                                            <span className="page-left J_page_exchange_left"
                                                                  style={{"display": "none"}}><img
                                                                src="//i01.appmifile.com/webfile/globalimg/in/giftcard/left.png"/></span>
                                            <span className="page-right J_page_exchange_right"
                                                  style={{"display": "none"}}><img
                                                src="//i01.appmifile.com/webfile/globalimg/in/giftcard/right.png"/></span>
                                            <div
                                                className="exchange-coupon-lists hide cards-wrapper"
                                                data-count="0">

                                            </div>
                                        </div>
                                        <div
                                            className="giftcard-lists-wrapper cards hide galley-container"
                                            data-price-child="giftcard-price">
                                                            <span className="page-left J_page_gift_left"
                                                                  style={{"display": "none"}}><img
                                                                src="//i01.appmifile.com/webfile/globalimg/in/giftcard/left.png"/></span>
                                            <span className="page-right J_page_gift_right"
                                                  style={{"display": "none"}}><img
                                                src="//i01.appmifile.com/webfile/globalimg/in/giftcard/right.png"/></span>
                                            <div className="giftcard-lists hide" data-count="0">
                                                <p className="notify-tips hide">10 cards can be
                                                    redeemed
                                                    per order.</p>
                                                <div className="unused-ul-wrapper">
                                                    <ul className="unused-ul"
                                                        data-api="{&quot;count&quot;:0,&quot;pageCount&quot;:0,&quot;pageIndex&quot;:1,&quot;pageSize&quot;:100,&quot;cardList&quot;:[]}"
                                                        style={{"width": "880px"}}></ul>
                                                </div>
                                                <div className="add-card">
                                                    <div className="form">
                                                        <input type="text" pattern="\d*" name=""
                                                               className="J_cardNum"
                                                               placeholder="Gift Card Number"
                                                               maxLength="16"/>
                                                        <input type="text" pattern="\d*" name=""
                                                               className="J_pincode"
                                                               placeholder="Pin" maxLength="6"/>
                                                        <span className="add J_addCard">Add Gift Card</span>
                                                        <span className="tips"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="discount-price hide">
                                            <div className="price-select hide">Selected:</div>
                                            <div className="coupon-price s-prices hide"
                                                 data-choseid="0">
                                                <span>Coupon</span><span
                                                className="static-price"> </span>
                                            </div>
                                            <div className="exchange-coupon-price s-prices hide"
                                                 data-choseid="0">
                                                <span>Exchange Coupon</span><span
                                                className="static-price"> </span>
                                            </div>
                                            <div className="giftcard-price s-prices hide"
                                                 data-choseid="">
                                                <span>Gift Card</span><span
                                                className="static-price"> </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="checkout-actions">
                                <div className="count-actions">


                                </div>

                                <div className="price-box">
                                    <p className="subtotal-price price">Subtotal : ₹ 1,898</p>


                                    <p className="price shipping-price">Shipping:
                                        <span className="J_checkoutShipping" data-shipping="0">Free shipping</span>
                                    </p>


                                    <p className="price ">Discount ：- ₹ <span className="J_eventSale"></span>0 </p>
                                    <p className="price J_paypalCount" style={{"display": "none"}}>
                                        <span className="J_paypalName">PayPal Special : - ₹ </span><span
                                        className="J_paypalPrice" data-price="0"></span>
                                    </p>
                                    <p className="price coupon J_couponsPrice" style={{"display": "none"}}>Coupons : -
                                        ₹ <span
                                            className="J_couponMoney"></span>
                                    </p>
                                    <p className="price exchange-coupon J_exchange_couponsPrice">Exchange coupon : -
                                        ₹ <span
                                            className="J_exchange_couponMoney"></span>
                                    </p>

                                    <p className="price giftcard-minprice J_giftcardPrice hide">Gift card : - ₹ <span
                                        className="J_giftcard_money"></span>
                                    </p>
                                    <div className="price total-price">Total: ₹ <span className="J_totalPrice"
                                                                                      data-price="1898">1,898</span>
                                        <span className="price-addr">H-301, DA-IICT, Near indroda circle, Gandhinagar, 382007   382007  GANDHI NAGAR GUJARAT&nbsp;&nbsp; sagar savaliya &nbsp;&nbsp;7043515704</span>
                                    </div>
                                    <Link to={'/payment'}>
                                        <div className="btn btn-success">
                                            {"Place Order "}
                                            <i className="fa fa-angle-right"></i>
                                        </div>
                                    </Link>
                                    <input type="hidden" name="Checkout[address_id]" className="J_addressId"
                                           value=""/>
                                    <input type="hidden" name="Checkout[gstin_address_id]"
                                           className="J_gstinAddressId"/>
                                    <input type="hidden" className="J_paymentId"/>
                                    <input type="hidden" className="J_userTel" value="7043515704"/>
                                    <input type="hidden" name="Checkout[couponsValue]"
                                           id="CheckoutCouponsVal" value="0"/>
                                    <input type="hidden" name="Checkout[couponsType]"
                                           id="CheckoutCouponsType" value="no"/>
                                    <input type="hidden" name="needCity" id="needCity"
                                           value="0"/>
                                    <input type="hidden" name="Checkout[shipment_id]"
                                           value="0" id="service_checked"/>
                                    <input type="hidden"
                                           name="Checkout[invoice_company_code]"
                                           id="J_gstValue"/>
                                    <input type="hidden"
                                           name="Checkout[exchange_voucher_id]"
                                           id="checkoutExchangeCoupons"
                                           value="0"/>
                                    <input type="hidden"
                                           name="Checkout[giftcard_ids]"
                                           id="checkoutGiftcardIds"
                                           value=""/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info
