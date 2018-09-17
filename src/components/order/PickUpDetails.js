import React, {Component} from 'react';
import _ from "lodash";
import AuthorizedComponent from "../AuthorizedComponent";
import {COD} from "../../constants/PaymentMode";
import {orderStatus} from "../../constants/status";
import {camelCaseToWords} from "../../helper/String";
import {paymentMode} from "../../constants/PaymentMode";


class PickUpDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props
        console.log(data);
        return (
            <div className={'ml-4'}>
                <h6>
                    <strong>Collector's Name:</strong>{" " + data.name}
                </h6>
                <h6>
                    <strong>Collector's DA-IICT ID:</strong>{" " + data.daiictId}
                </h6>
                <h6>
                    <strong>Collector's Contact No.:</strong>{" " + data.contactNo}
                </h6>
                <h6>
                    <strong>Collector's email: </strong><a href={"mailto:" + data.email}>{" " + data.email}</a>}
                </h6>
                {/*<h6>*/}
                    {/*<strong>Address:</strong>{" " + data.address.line1 + ", " + data.address.line2 + ", " + data.address.line3 +*/}
                {/*", " + data.city + " - " + data.pinCode + ", " + data.state + ", " + data.country}*/}
                {/*</h6>*/}
            </div>
        )
    }
}

export default PickUpDetails;
