import React, { Component } from 'react';
import '../../styles/table.css';
import EditUserModal from './EditUserModal';
import _ from "lodash"
import Spinner from "../Spinner";
import { domainUrl } from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import NavigationBar from '../NavigationBar';
import Header from '../Header';
import $ from "jquery";
import Switch from "../Switch";
import FileUpload from "../FileUpload/FileUpload";
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

function UserDetails(props) {
    const userInfo = props.user.userInfo
    return (
        <React.Fragment>
            <td>{props.user.daiictId}</td>
            <td>{userInfo.user_first_name + ' ' + userInfo.user_last_name}</td>
            <td>{userInfo.user_type}</td>
            <td>
                <div className={'d-flex flex-direction-col'}>
                    {/*<EditUserModal detail={props.user} index={props.index} updateUser={props.updateUser} />*/}
                    <Switch
                        handleClick={() => props.toggleUserActiveStatus(props.index)}
                        index={props.index}
                        isChecked={props.user.isActive ? true : false} />
                </div>
            </td>
        </React.Fragment>
    )
}

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
        request.send(JSON.stringify({ isActive: !user.isActive }));
    };

    uploadHandler = (data) => {
        data = {
            "userInfo": data
        }
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/userInfo'
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.setState({
                    showSpinner: false
                });
                alert("data updated successfully")
            }
            else{
                that.setState({
                    showSpinner: false
                });
                alert("please check the file again for format issues");
            }
        };
        request.send(JSON.stringify(data));
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <Header title={'User Management'} />
                <table id="table" className='mb-4'>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>User Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            _.map(this.state.user, (user, i) => {
                                user.name.firstName = user.name.firstName ? user.name.firstName : '';
                                user.name.lastName = user.name.lastName ? user.name.lastName : '';
                                return (
                                    <tr key={i}>
                                        <UserDetails user={user}
                                            index={i}
                                            updateUser={this.updateUser}
                                            toggleUserActiveStatus={this.toggleUserActiveStatus} />
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Spinner open={this.state.showSpinner} />
                <div className={'d-flex justify-content-center mb-4'}>
                <div class="card d-flex justify-content-center" style={{
                    width : "30em"
                }}>
                    <div class="card-body mx-auto">
                        <h5 class="card-title">Upload New User Data!</h5>
                        <p class="card-text"><FileUpload handleSubmit={this.uploadHandler}/></p>
                    </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UserList;
