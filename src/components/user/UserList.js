import React, {Component} from 'react';
import '../../styles/table.css';
import EditUserModal from './EditUserModal';
import _ from "lodash"
import Spinner from "../Spinner";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import NavigationBar from '../NavigationBar';
import Header from '../Header';
import $ from "jquery";
import Switch from "../service/Switch";

class UserList extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: [],
            showSpinner: false
        };
    }

    componentDidMount() {
        this.asyncFetch();
    }

    asyncFetch = () => {
        const that = this;
        that.setState({
            showSpinner: true
        })
        const url = domainUrl + '/' + 'user/all'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED || this.status === HttpStatus.OK || this.status === HttpStatus.NOT_MODIFIED) {
                try {
                    const obj = JSON.parse(request.responseText);
                    console.log(obj);
                    that.setState({
                        'user': obj['user'],
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
    }

    updateUser = (user, index, daiictId, modal) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/user/' + daiictId
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                const response = JSON.parse(request.response)
                const user = that.state.user;
                user[index] = response.user;
                that.setState({
                    user: user,
                    showSpinner: false
                });
                $(modal).modal('hide');
            }
        }
        request.send(JSON.stringify(user));
        console.log(user);
    }

    toggleUserActiveStatus = (index) => {
        this.setState({
            showSpinner: true
        });
        const user = this.state.user[index];
        const that = this;
        const url = domainUrl + '/user/changeStatus/' + user.daiictId;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const user = that.state.user;
                user[index] = response.user;
                that.setState({
                    user: user,
                    showSpinner: false
                });
            }
        };
        request.send(JSON.stringify({isActive: !user.isActive}));
    };


    render() {
        console.log(this.state.user);
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'User Management'}/>
                <table id="table">
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Type</th>
                        <th>Actions</th>
                    </tr>
                    {
                        _.map(this.state.user, (user, i) => {
                            return (
                                <tr>
                                    <td>{user.daiictId}</td>
                                    <td>{user.name.firstName + ' ' + user.name.lastName}</td>
                                    <td>{user.userType}</td>
                                    <td>
                                        <div className={'d-flex flex-direction-col'}>
                                            <EditUserModal detail={user} index={i} updateUser={this.updateUser}/>
                                            <Switch
                                                handleClick={() => this.toggleUserActiveStatus(i)}
                                                index={i}
                                                isChecked={user.isActive ? true : false}/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
                <Spinner open={this.state.showSpinner}/>
            </React.Fragment>
        );
    }
}

export default UserList;
