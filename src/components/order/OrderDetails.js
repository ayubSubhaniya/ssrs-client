import React, {Component} from 'react';

class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            service: ''
        }
    }

    render() {
        const {order,service} = this.props
        return (
            <tr>
                <td data-th="Product">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 className="nomargin">{service?service.name:"Loading..."}</h4>
                        </div>
                    </div>
                </td>
                <td data-th="Status">{order.status}</td>
                <td data-th="Quantity">
                    {order.units} 10
                </td>
                <td data-th="totalCost">{"Rs " + order.totalCost}</td>
            </tr>
        );
    }
}

export default OrderDetails;
