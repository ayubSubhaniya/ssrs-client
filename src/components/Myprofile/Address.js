import React, { Component } from 'react';
import '../../styles/Address.css';
import plus from '../../images/blue_plus.jpg'
import { domainUrl } from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import _ from 'lodash';
import Modal from 'react-bootstrap4-modal';

function getList(data) {
    return _.map(data, (data) => {
        return (<div className={'address-bx'}>
            <h6>
                <strong>Collector's Name:</strong>{" " + data.name}
            </h6>
            <h6>
                <strong>Collector's Contact No.:</strong>{" " + data.contactNo}
            </h6>
            <h6>
                <strong>Collector's email: </strong><a href={"mailto:" + data.email}>{" " + data.email}</a>}
        </h6>
            <h6>
                <strong>Address:</strong>{" " + data.address.line1 + ", " + data.address.line2 + ", " + data.address.line3 +
                    ", " + data.city + " - " + data.pinCode + ", " + data.state + ", " + data.country}
            </h6>
        </div>);
    });
}
class Address extends Component {
    constructor(props) {
        super();
        this.state = {
            open : true,
            data: [{
                "name": "Sagar Savaliya",
                "contactNo": 9429795959,
                "email": "201501407@daiict.ac.in",
                "address": {
                    "line1": "B-215, HOR-Men",
                    "line2": "DA-IICT",
                    "line3": "Near Reliance Chowkdi"
                },
                "city": "Gandhinagar",
                "state": "Gujarat",
                "pinCode": 382007
            }],
            newAddress: {}
        };
    }
    postAddress(newAddress) {
        const that = this;
        var url = domainUrl + '/user/address';
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response)
                that.setState({
                    data: [...this.state.data, res]
                })
            }
        }
        request.send(JSON.stringify(newAddress));
    }
    editAddress(updatedAdress) {
        const that = this;
        var url = domainUrl + '/user/address';
        var request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response)
                that.setState({
                    isAuthenticated: true,
                    data: res.addresses
                })
            }
        }
        request.send(JSON.stringify(updatedAdress));
    }
    closeModal() {
        this.setState({
            visible: false
        });
    }

    render() {
        console.log(this.state.data);
        return (
            <div class="address-view">
                <div>
                    {this.getAddresses()}
                    {getList(this.state.data)}
                </div>
                <div class="add-box idx">
                    <img src={plus} alt="add" onClick={this.addAddress} />
                </div>
                <div>
                </div>
            </div>
        );

    }
}
export default Address;