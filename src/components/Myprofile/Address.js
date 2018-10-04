import React, { Component } from 'react';
import '../../styles/Address.css';
import plus from '../../images/blue_plus.jpg'
import { domainUrl } from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import _ from 'lodash';
import Modal from 'react-bootstrap4-modal';
import CourierFrom from '../order/CourierForm.js';

let _id=-1;
let id=-1;
class Address extends Component {
    constructor(props) {
        super();
        this.state = {
            visible : false,
            open : false,
            data: [],
            d : {}
        };
    }
    getList(data) {
        return _.map(data, (data,index) => {
            return (<div className={'address-bx animated fadeIn'}>
                <h6>
                    <strong>Collector's Name:</strong>{" " + data.name}
                </h6>
                <h6>
                    <strong>Collector's Contact No. </strong>{" " + data.contactNo}
                </h6>
                <h6>
                    <strong>Collector's email: </strong><a href={"mailto:" + data.email}>{" " + data.email}</a>
            </h6>
                <h6>
                    <strong>Address:</strong>{" " + data.address.line1 +", "+ data.city + " - " + data.pinCode + ", " + data.state + ", " + data.country}
                </h6>
                <button type="button" class="btn btn-light" onClick={() => this.openModal(data._id,index,data)}>Edit</button>
                <button type="button" class="btn btn-light ml-4" onClick={() => this.deleteAddress(data._id,index)}>Delete</button>
            </div>);
        });
    }
    deleteAddress = (id,index) => {
        const that = this;
        var url = domainUrl + '/user/address/' + id;
        var request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.closeModal();
                that.setState({
                    data: [...that.state.data.slice(0,index),...that.state.data.slice(index+1)]
                })
            }
        }
        request.send();
    }
    getAddresses= () => {
        const that = this;
        var url = domainUrl + '/user/address';
        var request = new XMLHttpRequest();
        request.open('GET',url,true);
        request.withCredentials = true;
        request.onload = function() {
            if (this.status == HttpStatus.OK){
                var res = JSON.parse(request.response);
                console.log(res);
                that.setState({
                    data: res.addresses
                })
            }
        }
        request.send();
    }
    postAddress = (newAddress) => {
        const that = this;
        var url = domainUrl + '/user/address';
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.closeM();
                var res = JSON.parse(request.response)
                that.setState({
                    data: [...that.state.data,res.address]
                })
            }
        }
        request.send(JSON.stringify(newAddress));
    }
    editAddress= (updatedAdress) => {
        const that = this;
        var url = domainUrl + '/user/address/' + _id;
        var request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.closeModal();
                var res = JSON.parse(request.response)
                that.setState({
                    data: [...that.state.data.slice(0,id),res.address,...that.state.data.slice(id+1)]
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
    openModal(index1,index2,data){
        _id=index1;
        id=index2;
        this.setState({
            d : data
        });
        console.log(this.d);
        console.log(index1,index2,_id,id);
        this.setState({
            visible : true
        });
    }
    openM(){
        this.setState({
            open : true
        })
    }
    closeM(){
        this.setState({
            open : false
        })
    }
    componentDidMount(){
        this.getAddresses();
    }
    render() {
        return (
            <div class="address-view">
                    {this.getList(this.state.data)}
                    <div className={'add-bx'} onClick={() => this.openM()}>
                        +
                        <br/>                       
                        Add Address
                    </div>
                {this.state.visible ? <CourierFrom open={this.state.visible} data={this.state.d} close={() => this.closeModal()} handleSubmit={this.editAddress}/> : "" }
                    <CourierFrom open={this.state.open} close={() => this.closeM()} handleSubmit={this.postAddress} />
            </div>
        );
    }
}
export default Address;