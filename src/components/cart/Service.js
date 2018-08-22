import React, {Component} from 'react';
import ServiceDetails from "../service/ServiceDetails";

class Service extends Component {
    render() {
        return (
            <tr>
                <td data-th="Product">
                    <div className="row">
                        <div className="col-sm-10">
                            <h4 className="nomargin">Product 1</h4>
                            <div>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat
                                nulla pariatur. Lorem ipsum dolor sit amet.</div>
                            {/*<ServiceDetails/>*/}
                        </div>
                    </div>
                </td>
                <td data-th="Price">$1.99</td>
                <td data-th="Quantity">
                    <input type="number" className="form-control text-center" value="1"/>
                </td>
                <td data-th="Subtotal" className="text-center">1.99</td>
                <td className="actions" data-th="">
                    <button className="btn btn-info btn-sm"><i className="fa fa-pencil"></i></button>
                    <button className="btn btn-danger btn-sm"><i className="fa fa-trash-o"></i></button>
                </td>
            </tr>
        );
    }
}

export default Service;
