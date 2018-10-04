import React, { Component } from 'react';
import { domainUrl } from "../../config/configuration";
import NavigationBar from "../NavigationBar";
import * as HttpStatus from "http-status-codes";
import _ from 'lodash';
import Spinner from '../Spinner';
import PermissionForm from './PermissionForm'
import Modal from "react-bootstrap4-modal";

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
            showSpinner: false,
            open: false,
            name : "",
            adminAdd : false,
            userAdd : false
        }
    }
    
    PermissionModal = (role) => {
        return (
        <Modal visible={this.state.open}>
            <form autoComplete="off" onSubmit={(e) => {
                e.preventDefault();
                this.handleSubmit(role);
            }}>
                <div className={'modal-body'}>
                    <div className={'form-group'}>
                        <label>Name of New User</label>
                        <input name="name"
                            type="text"
                            value={this.state.name}
                            onChange={(e) => {
                                this.setState({
                                    name : e.target.value
                                })
                            }}
                            required='true'
                            className={'form-control'} type={'text'} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={() => { this.setState({
                        open : false,
                        adminAdd : false,
                        userAdd : false
                    })}}>Close</button>
                    <button type="submit" className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        this.handleSubmit(role);
                    }}>Save
                </button>
                </div>
            </form>
        </Modal>
        );
    }
    handleSubmit = (role) => {
        let newUser = {
            "role" : `${this.state.name}`,
            "roleType" : `${role}`
        }

        const that = this;
        var url = domainUrl + '/access/roles';
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = request.response;
                console.log(res);
                if(role==="user")
                {
                    that.setState({
                        userTypes : [...that.state.userTypes,`${that.state.name}`]
                    })
                }
                else if(role==="admin"){
                    that.setState({
                        adminTypes : [...that.state.adminTypes,`${that.state.name}`]
                    })
                }
                that.setState({
                    name : "",
                    open : false,
                    adminAdd : false,
                    userAdd : false
                });
            }
        }
        console.log(newUser);
        request.send(JSON.stringify(newUser));
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
        console.log(this.state.name);
        return (
            <div>
                <NavigationBar />
                <Spinner open={this.state.showSpinner} />
                <div class="container bg-light mt-5">
                    <h1 class="text-muted text-center">UserTypes</h1>
                    <ul className={'list-group mt-4'}>
                        {this.getUserList(this.state.userTypes)}
                    </ul>
                    <button class="btn btn-primary d-block mx-auto" onClick={ (e) => {
                        this.setState({
                            userAdd : true,
                            adminAdd : false,
                            open : true
                        });
                    }}>Add New User</button>
                    {this.state.userAdd ? this.PermissionModal("user") : ""}
                </div>
                <div class="container bg-light mt-5">
                    <h1 class="text-muted text-center">AdminTypes</h1>
                    <ul className={'list-group mt-4'}>
                        {this.getAdminList(this.state.adminTypes)}
                    </ul>
                    <button class="btn btn-primary d-block mx-auto" onClick={ (e) => {
                        this.setState({
                            adminAdd : true,
                            userAdd : false,
                            open  : true
                        })
                    }}>Add New Admin</button>
                    {this.state.adminAdd ? this.PermissionModal("admin") : ""}
                </div>
            </div>
        );
    }
}

export default Permission;