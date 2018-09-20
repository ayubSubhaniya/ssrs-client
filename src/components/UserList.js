import React, {Component} from 'react';
import '../styles/table.css';
import EditUser from './EditUserModal';
//import {asyncFetch} from "../helper/FetchData"
import _ from "lodash"
import Spinner from "./Spinner";
import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import NavigationBar from './NavigationBar';
class UserList extends Component {

    asyncFetch = (dataName) => {
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

    constructor(props, context) {
        super(props, context);
        this.state = {
            user: [],
            showSpinner: false
        };
//        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch();
    }

    render(){
        console.log(this.state.user);
        return(
            <React.Fragment>
                <NavigationBar />
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
                                <td><EditUser/></td>
                            </tr>                            
                        )
                    })
                }

                </table>
            </React.Fragment>
        );
    }
}

export default UserList;