import React, {PureComponent} from 'react';
import {domainUrl} from "../../config/configuration";
import NavigationBar from "../NavigationBar";
import * as HttpStatus from "http-status-codes";
import _ from 'lodash';
import PermissionForm from './PermissionForm'
import Modal from "react-bootstrap4-modal";
import ConfirmModal from "../ConfirmModal";
import {handleError} from "../../helper/error";
import {loadSpinner, unloadSpinner} from "../../helper/spinner";

class Permission extends PureComponent {
    constructor() {
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
            name: "",
            adminAdd: false,
            userAdd: false,
            userDelIdx: -1,
            adminDelIdx: -1
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
                                           name: e.target.value
                                       })
                                   }}
                                   required='true'
                                   className={'form-control'} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger mb-4" onClick={() => {
                            this.setState({
                                open: false,
                                adminAdd: false,
                                userAdd: false
                            })
                        }}>Close
                        </button>
                        <button type="submit" className="btn btn-primary mb-4" onClick={(e) => {
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
            "role": `${this.state.name}`,
            "roleType": `${role}`
        }
        loadSpinner();
        const that = this;
        var url = domainUrl + '/access/roles';
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            unloadSpinner();
            if (this.status === HttpStatus.OK) {
                if (role === "user") {
                    that.setState({
                        userTypes: [...that.state.userTypes, `${that.state.name}`]
                    })
                }
                else if (role === "admin") {
                    that.setState({
                        adminTypes: [...that.state.adminTypes, `${that.state.name}`]
                    })
                }
                that.setState({
                    name: "",
                    open: false,
                    adminAdd: false,
                    userAdd: false
                });
            } else {
                handleError(request)
            }
        }
        request.send(JSON.stringify(newUser));
    }
    getAdminRoleData = (role) => {
        loadSpinner();
        const that = this;
        var url = domainUrl + '/access/' + role;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            unloadSpinner();
            if (this.status === HttpStatus.OK) {
                var res = JSON.parse(request.response);
                that.setState({
                    adminRoleData: res.permission
                })
            } else {
                handleError(request)
            }
        }
        request.send();
    }
    closeConfirmationModal = () => {
        this.setState({
            userDelIdx: -1,
            adminDelIdx: -1
        });
    }
    onConfirm = (index, userType, roleType) => {
        loadSpinner();
        const that = this;
        var url = domainUrl + '/access/roles';
        var request = new XMLHttpRequest();
        var delData = {
            role: `${roleType}`,
            roleType: `${userType}`
        }
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            unloadSpinner();
            if (this.status === HttpStatus.OK) {
                if (userType === 'user') {
                    that.setState({
                        userTypes: [...that.state.userTypes.slice(0, index), ...that.state.userTypes.slice(index + 1)]
                    })
                }
                else if (userType === 'admin') {
                    that.setState({
                        adminTypes: [...that.state.adminTypes.slice(0, index), ...that.state.adminTypes.slice(index + 1)]
                    })
                }
                that.closeConfirmationModal();
                that.closeM();
                that.closeModal();
            } else {
                handleError(request)
            }
        }
        request.send(JSON.stringify(delData));
    }
    getUserList = (data) => {
        return _.map(data, (data, index) => {
            return (
                <div>
                    <li className="list-group-item list-group-item-action align-items-center d-flex justify-content-between">
                        <h5 className="text-muted">{data}</h5>
                        <div>
                            <button className="btn btn-light" onClick={() => this.openModal(index, data)}><i
                                className="fa fa-edit"></i></button>
                            <button className="btn btn-light ml-4" onClick={() => {
                                this.setState({
                                    userDelIdx: index
                                })
                            }}><i className="fa fa-trash"></i></button>
                        </div>
                    </li>
                    {this.state.userIdx === index ?
                        <PermissionForm data={this.state.userRoleData} role={data} userType={"user"}
                                        closeModal={this.closeModal}/> : ""}
                    {this.state.userDelIdx === index ?
                        <ConfirmModal open={true} onYes={() => this.onConfirm(index, "user", data)}
                                      close={this.closeConfirmationModal}/> : ''}
                </div>
            );
        });
    }
    getAdminList = (data) => {
        return _.map(data, (data, index) => {
            return (
                <div>
                    <li className="list-group-item list-group-item-action align-items-center d-flex justify-content-between">
                        <h5 className="text-muted">{data}</h5>
                        <div>
                            <button className="btn btn-light" onClick={() => this.openM(index, data)}><i
                                className="fa fa-edit"></i></button>
                            <button className="btn btn-light ml-4" onClick={() => {
                                this.setState({
                                    adminDelIdx: index
                                })
                            }}><i className="fa fa-trash"></i></button>
                        </div>
                    </li>
                    {this.state.adminIdx === index ?
                        <PermissionForm data={this.state.adminRoleData} role={data} userType={"admin"}
                                        closeModal={this.closeM}/> : ""}
                    {this.state.adminDelIdx === index ?
                        <ConfirmModal open={true} onYes={() => this.onConfirm(index, "admin", data)}
                                      close={this.closeConfirmationModal}/> : ''}
                </div>
            );
        });
    }
    openModal = (index, userType) => {
        if (this.state.userIdx !== index) {
            this.setState({
                userIdx: index
            });
        }
        else {
            this.setState({
                userIdx: -1
            })
        }
    }
    closeModal = () => {
        this.setState({
            userIdx: -1
        });

    }
    openM = (index, adminType) => {
        if (this.state.adminIdx !== index) {
            this.setState({
                adminIdx: index
            });
        }
        else {
            this.setState({
                adminIdx: -1
            })
        }
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
            if (this.status === HttpStatus.OK) {
                var res = JSON.parse(request.response);
                that.setState({
                    userTypes: res.userTypes,
                    adminTypes: res.adminTypes
                })
            } else {
                handleError(request)
            }
        }
        request.send();
    }

    componentDidMount() {
        this.getRoles();
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <div className="container bg-light mt-5">
                    <h1 className="text-muted text-center">UserTypes</h1>
                    <ul className={'list-group mt-4'}>
                        {this.getUserList(this.state.userTypes)}
                    </ul>
                    <button className="btn btn-primary d-block mx-auto mt-4" onClick={(e) => {
                        this.setState({
                            userAdd: true,
                            adminAdd: false,
                            open: true
                        });
                    }}>Add New User
                    </button>
                    {this.state.userAdd ? this.PermissionModal("user") : ""}
                </div>
                <div className="container bg-light mt-5">
                    <h1 className="text-muted text-center">AdminTypes</h1>
                    <ul className={'list-group mt-4'}>
                        {this.getAdminList(this.state.adminTypes)}
                    </ul>
                    <button className="btn btn-primary d-block mx-auto mt-4" onClick={(e) => {
                        this.setState({
                            adminAdd: true,
                            userAdd: false,
                            open: true
                        })
                    }}>Add New Admin
                    </button>
                    {this.state.adminAdd ? this.PermissionModal("admin") : ""}
                </div>
            </div>
        );
    }
}

export default Permission;
