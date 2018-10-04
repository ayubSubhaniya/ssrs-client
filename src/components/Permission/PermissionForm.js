import React from "react"
import Modal from "react-bootstrap4-modal";
import _ from "lodash"
import * as HttpStatus from "http-status-codes";
import { domainUrl } from "../../config/configuration";
import Spinner from "../Spinner"

class PermissionForm extends React.Component {
    constructor(props) {
        super(props);
        let { data } = props;
        if (data) {
            this.state = {
                data: this.props.data,
                showSpinner : false
            }
        } else {
            this.state = {
                showSpinner : false,
                data: {
                    User: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Order: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Service: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    SpecialService: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    InActiveResource: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    changeResourceStatus: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    News: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Notification: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Courier: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Collector: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    AccessLevel: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Role: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Parameter: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    CollectionType: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    Cart: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    },
                    CourierInfo: {
                        read: 'none',
                        update: 'none',
                        create: 'none',
                        delete: 'none',
                    }
                }
            }
        }
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
    getRoleData = () => {
        const that = this;
        this.showSpinner();
        var url = domainUrl + '/access/'+this.props.role;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                var res = JSON.parse(request.response);
                console.log(res);
                that.setState({
                    data : res.permissions
                })
            }
            that.hideSpinner();
        }
        request.send();
    }
    postRoleData = () => {
        const userData = { "userType":`${this.props.userType}`, "permissions" : {...this.state.data} }
        console.log(userData)
        const that = this;
        this.showSpinner();
        var url = domainUrl + '/access/'+this.props.role;
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                console.log(request.response);
            }
            that.hideSpinner();
            that.props.closeModal();
        }
        request.send(JSON.stringify(userData));
    }


    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    };
    changeStatus = (e, key, d) => {
        console.log("clicked");
        let value = e.target.value
        console.log(d);
        this.setState(function (state) {
            state.data[`${key}`][`${d}`] = `${value}`
            return { data: state.data };
        });
    }
    getList = () => {
        let keys = Object.keys(this.state.data);
        return _.map(keys, (key, index) => {
            return (
                <React.Fragment>
                    <tr>
                        <th rowspan="3">{key}</th>
                        <td>read</td>
                            <td>
                            <div className={'d-flex flex-row'}>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="any"
                                                checked={this.state.data[`${key}`].read === "any"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "read")} />
                                            any
                                                </label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="own"
                                                checked={this.state.data[`${key}`].read === "own"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "read")} />
                                            own
                                                </label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="none"
                                                checked={this.state.data[`${key}`].read === "none"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "read")} />
                                            none
                                                </label>
                                    </div>
                                </div>
                            </div>
                            </td>
                    </tr>
                    <tr>
                        <td>update</td>
                        
                            <td>
                            <div className={'d-flex flex-row'}>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="any"
                                                checked={this.state.data[`${key}`].update === "any"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "update")} />
                                            any
                                                </label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="own"
                                                checked={this.state.data[`${key}`].update === "own"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "update")} />
                                            own
                                                </label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="none"
                                                checked={this.state.data[`${key}`].update === "none"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "update")} />
                                            none
                                                </label>
                                    </div>
                                </div>
                            </div>
                            </td>
                    </tr>
                    <tr>
                        <td>delete</td>
                        
                            <td>
                            <div className={'d-flex flex-row'}>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="any"
                                                checked={this.state.data[`${key}`].delete === "any"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "delete")} />
                                            any
                                                </label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="own"
                                                checked={this.state.data[`${key}`].delete === "own"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "delete")} />
                                            own
                                                </label>
                                    </div>
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                style={{ display: "inline" }}
                                                type="radio"
                                                value="none"
                                                checked={this.state.data[`${key}`].delete === "none"}
                                                onClick={(e) => this.changeStatus(e, `${key}`, "delete")} />
                                            none
                                                </label>
                                    </div>
                                </div>
                            </div>
                            </td>
                    </tr>
                </React.Fragment>
            );
        })
    }
    componentDidMount(){
        this.getRoleData();
    }
    render() {
        console.log(this.state.data);
        return (
            <div>
                <Spinner/>
                <form onSubmit={(e) => {
                     e.preventDefault();
                    this.postRoleData()}}>
                    <table class="table table-striped">
                        <tbody>
                            {this.getList()}
                        </tbody>
                        <div class="d-flex justify-content-center">
                        <input type="submit" value="Save" class="btn btn-primary" onClick={(e) => {
                             e.preventDefault();
                            this.postRoleData()}}/>
                        </div>
                    </table>
                </form>
            </div>
        );
    }
}

export default PermissionForm