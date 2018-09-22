import React from 'react'
import NavigationBar from "../../NavigationBar";
import Stapes from "../../service/Stapes";
import {Link, Redirect} from "react-router-dom";

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaymentDone: false
        }
    }

    pay = () => {
        this.setState({
            isPaymentDone: true
        })
    }

    render() {
        if (this.state.isPaymentDone) {
            return (
                <Redirect to={{
                    pathname: "/order"
                }}/>
            )
        }
        return (
            <div>
                <NavigationBar/>
                <div className={'container'}>
                    <Stapes active={3}/>
                    <hr className={'mt-0'}/>
                    <div className={'payment-operation'}>
                        <div className="bank-title">
                            <div className="title-wrap">
                                <h2 className="title">Choose your payment method</h2>
                            </div>
                        </div>
                        <div className='payment'>
                            <div className='payment-method-tabs'>
                                <div className='tab-payment'>Offline</div>
                                <div className='tab-payment'>Debit Card</div>
                                <div className='tab-payment tab-payment-active'>Net Banking</div>
                                <div className='tab-payment'>Paytm</div>
                            </div>
                            <div className='payment-method-body'>
                                <Link to={'/order'}>
                                    <div className="btn btn-success m-4 p-4">
                                        {"Pay "}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Payment
