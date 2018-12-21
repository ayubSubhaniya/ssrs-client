import React from "react"
import _ from "lodash"
import * as HttpStatus from "http-status-codes";
import {domainUrl} from "../../config/configuration";
import Spinner from "../Spinner"
import ConfirmModal from "../ConfirmModal";
import {handleError} from "../../helper/error";

class PermissionForm extends React.Component {
    constructor(props) {
        super(props);
        let {data} = props;
        if (data) {
            this.state = {
                data: this.props.data,
                showSpinner: false,
                confirm: false
            }
        } else {
            this.state = {
                showSpinner: false,
                confirm: false,
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
        console.log("Inside spinner");
        this.setState({
            showSpinner: true
        })
    }
    onConfirmModal = () => {
        this.setState({
            confirm: false
        })
    }
    hideSpinner = () => {
        console.log("outside spinner");
        this.setState({
            showSpinner: false
        })
    }
    getRoleData = () => {
        const that = this;
        this.showSpinner();
        var url = domainUrl + '/access/' + this.props.role;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                var res = JSON.parse(request.response);
                console.log(res);
                that.setState({
                    data: res.permissions
                })
            } else {
                handleError(request)
            }
            that.hideSpinner();
        }
        request.send();
    }
    postRoleData = () => {
        this.onConfirmModal();
        const userData = {"roleType": `${this.props.userType}`, "permissions": {...this.state.data}}
        console.log(userData)
        const that = this;
        this.showSpinner();
        var url = domainUrl + '/access/' + this.props.role;
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                console.log(request.response);
            } else {
                handleError(request)
            }
            that.hideSpinner();
            that.props.closeModal();
        }
        request.send(JSON.stringify(userData));
    }


    handleChange = ({target}) => {
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
            return {data: state.data};
        });
    }
    getList = () => {
        let keys = Object.keys(this.state.data);
        return _.map(keys, (key, index) => {
            return (
                <React.Fragment>
                    <tr>
                        <th rowspan="4">{key}</th>
                        <td>read</td>
                        <td>
                            <div className={'d-flex flex-row'}>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="any"
                                                   checked={this.state.data[`${key}`].read === "any"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "read")}/>
                                            any
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="own"
                                                   checked={this.state.data[`${key}`].read === "own"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "read")}/>
                                            own
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="none"
                                                   checked={this.state.data[`${key}`].read === "none"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "read")}/>
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
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="any"
                                                   checked={this.state.data[`${key}`].update === "any"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "update")}/>
                                            any
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="own"
                                                   checked={this.state.data[`${key}`].update === "own"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "update")}/>
                                            own
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="none"
                                                   checked={this.state.data[`${key}`].update === "none"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "update")}/>
                                            none
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>create</td>
                        <td>
                            <div className={'d-flex flex-row'}>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="any"
                                                   checked={this.state.data[`${key}`].create === "any"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "create")}/>
                                            any
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="own"
                                                   checked={this.state.data[`${key}`].create === "own"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "create")}/>
                                            own
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="none"
                                                   checked={this.state.data[`${key}`].create === "none"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "create")}/>
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
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="any"
                                                   checked={this.state.data[`${key}`].delete === "any"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "delete")}/>
                                            any
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="own"
                                                   checked={this.state.data[`${key}`].delete === "own"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "delete")}/>
                                            own
                                        </label>
                                    </div>
                                </div>
                                <div style={{display: 'flex'}}>
                                    <div className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="form-check-input"
                                                   style={{display: "inline"}}
                                                   type="radio"
                                                   value="none"
                                                   checked={this.state.data[`${key}`].delete === "none"}
                                                   onClick={(e) => this.changeStatus(e, `${key}`, "delete")}/>
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

    componentDidMount() {
        this.getRoleData();
    }

    render() {
        console.log(this.state.data);
        return (
            <div>
                <Spinner open={this.state.showSpinner}/>
                <form class="animated slideInUp" onSubmit={(e) => {
                    e.preventDefault();
                    this.postRoleData()
                }}>
                    <table class="table table-striped">
                        <tbody>
                        {this.getList()}
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-left flex-row-reverse mb-4">

                        <input type="submit" value="Close" class="btn btn-danger mr-5" onClick={(e) => {
                            e.preventDefault();
                            this.props.closeModal();
                        }}/>
                        <input type="submit" value="Save" class="btn btn-primary mr-5" onClick={(e) => {
                            e.preventDefault();
                            this.setState({
                                confirm: true
                            })
                        }}/>
                    </div>
                </form>
                {this.state.confirm ? <ConfirmModal open={true} onYes={(e) => {
                    e.preventDefault();
                    this.postRoleData()
                }} close={this.onConfirmModal}/> : ""}
            </div>
        );
    }
}

export default PermissionForm
