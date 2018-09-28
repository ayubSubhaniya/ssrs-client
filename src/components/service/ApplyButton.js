import React from 'react'
import OrderForm from "../order/cart/OrderForm";

class ApplyButton extends React.Component {
    render() {
        const {service} = this.props;
        return (
            <div>
                <button type="button"
                        className="btn btn-success btn-large ml-2 mr-2"
                        data-toggle="modal"
                        data-target={"#myModal" + service._id}>
                    Apply
                </button>
                <OrderForm service={service} id={service._id}/>
            </div>)
    }
}

export default ApplyButton
