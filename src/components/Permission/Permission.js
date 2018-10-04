import React, { Component } from 'react';
import { domainUrl } from "../../config/configuration";
import NavigationBar from "../NavigationBar";
import * as HttpStatus from "http-status-codes";
import _ from 'lodash';
import Spinner from '../Spinner';
import PermissionForm from './PermissionForm'

class Permission extends Component {
    constructor(props) {
        super();
        this.state = {
            userTypes: undefined,
            adminTypes: undefined,
            userIdx: -1,
            adminIdx: -1,
            userRoleData: undefined,
            adminRoleData: undefined,
            showSpinner: false
        }
    }
    getAdminRoleData = (role) => {
        const that = this;
        var url = domainUrl + '/access/' + role;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response);
                console.log(res);
                that.setState({
                    adminRoleData: res.permission
                })
            }
        }
        request.send();
    }
    getUserList = (data) => {
        ``
        return _.map(data, (data, index) => {
            return (
                <div>
                    <li className="list-group-item list-group-item-action align-items-center d-flex justify-content-between">
                        <h5 class="text-muted">{data}</h5>
                        <div>
                            <button class="btn btn-light" onClick={() => this.openModal(index, data)}><i class="fa fa-edit"></i></button>
                            <button class="btn btn-light ml-4"><i class="fa fa-trash"></i></button>
                        </div>
                    </li>
                    {this.state.userIdx === index ? <PermissionForm data={this.state.userRoleData} role={data} userType={"user"} closeModal={this.closeModal} /> : ""}
                </div>
            );
        });
    }
    getAdminList = (data) => {
        return _.map(data, (data, index) => {
            return (
                <div>
                    <li className="list-group-item list-group-item-action align-items-center d-flex justify-content-between">
                        <h5 class="text-muted">{data}</h5>
                        <div>
                            <button class="btn btn-light" onClick={() => this.openM(index, data)}><i class="fa fa-edit"></i></button>
                            <button class="btn btn-light ml-4"><i class="fa fa-trash"></i></button>
                        </div>
                    </li>
                    {this.state.adminIdx === index ? <PermissionForm data={this.state.adminRoleData} role={data} userType={"admin"} closeModal={this.closeM} /> : ""}
                </div>
            );
        });
    }
    openModal = (index, userType) => {
        this.setState({
            userIdx: index
        });
    }
    closeModal = () => {
        this.setState({
            userIdx: -1
        });

    }
    openM = (index, adminType) => {
        this.setState({
            adminIdx: index
        });
    }
    closeM = () => {
        this.setState({
            adminIdx: -1
        });
    }
    getRoles = () => {
        const that = this;
        var url = domainUrl + '/access/roles';
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response);
                console.log(res);
                that.setState({
                    userTypes: res.userTypes,
                    adminTypes: res.adminTypes
                })
            }
        }
        request.send();
    }
    componentDidMount() {
        console.log('GrandChild did mount.');
        this.getRoles();
    }
    showSpinner = () => {
        this.setState({
            showSpinner: true
        })
    }
    hideSpinner = () => {
        this.setState({
            showSpinner: false
        })
    }
    render() {
        console.log("Permission Updated");
        console.log(this.state.userRoleData);
        return (
            <div>
                <NavigationBar />
                <Spinner open={this.state.showSpinner} />
                <div class="container bg-light mt-5">
                    <h1 class="text-muted text-center">UserTypes</h1>
                    <ul className={'list-group mt-4'}>
                        {this.getUserList(this.state.userTypes)}
                    </ul>
                </div>
                <div class="container bg-light mt-5">
                    <h1 class="text-muted text-center">AdminTypes</h1>
                    <ul className={'list-group mt-4'}>
                        {this.getAdminList(this.state.adminTypes)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Permission;