import React, {Component} from 'react';
import '../styles/App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import PublicHomePage from './public-page/PublicHomePage';
import HomePage from './HomePage';
import ManageService from "./service/ManageService";
import ServiceForm from "./service/ServiceForm";
import ManageOrders from './orders/ManageOrders'
import AuthorizedRoute from './AuthorizedRoute'
import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";

export const Context = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        }
        this.getUserData();
    }

    getUserData = () => {
        const that = this;
        var url = domainUrl + '/user/201501433';
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                var res = JSON.parse(request.response)
                var user = res.user;
                console.log(user);
                that.state = {
                    isAuthenticated: true,
                    user
                }
            }
        }
        request.send();
    }

    logIn = (logInDetails) => {
        console.log("Trying to Login");
        const that = this;
        var url = domainUrl + '/account/signin';
        var request = new XMLHttpRequest();

        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                var res = JSON.parse(request.response)
                var user = res.user;
                console.log(user);
                that.setState({
                    isAuthenticated: true,
                    user
                })
            }
        }
        request.send(JSON.stringify(logInDetails));
    }

    logOut = () => {
        const that = this;
        const url = domainUrl + '/account/signout'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.setState({
                    isAuthenticated: false,
                    user: {},
                })
            }
        };
        request.send();
    }

    render() {
        const {isAuthenticated} = this.state
        return (
            <Context.Provider value={
                {
                    logIn: this.logIn,
                    logOut: this.logOut
                }}>
                <Router>
                    <React.Fragment>
                        <Route
                            exact path="/"
                            component={isAuthenticated ? HomePage : PublicHomePage}/>
                        <AuthorizedRoute
                            exact path="/service"
                            component={ManageService}
                            permission={isAuthenticated}/>
                        <AuthorizedRoute
                            exact path="/service/add"
                            component={() => <ServiceForm title={'Add Service'}/>}
                            permission={isAuthenticated}/>
                        <AuthorizedRoute
                            exact path="/service/edit"
                            component={() => <ServiceForm title={'Edit Service'}/>}
                            permission={isAuthenticated}/>
                    </React.Fragment>
                </Router>
            </Context.Provider>
        )
    }
}

export default App;

