import React, {Component} from 'react';
import '../styles/App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './home/Home';
import ManageService from "./service/ManageService";
import ServiceForm from "./service/ServiceForm";
import AuthorizedRoute from './AuthorizedRoute'
import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import PublicPage from "./public-page/PublicPage";
import Cart from "./cart/Cart";
import OrderForm from "./order/OrderForm";
import Services from "./order/Services"

export const Context = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            loginMessage: ''
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
        try {
            request.send();
        } catch (e) {
            console.log(e);
        }
    }

    logIn = (logInDetails) => {
        const that = this;
        var url = domainUrl + '/account/signin';
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                var res = JSON.parse(request.response)
                that.setState({
                    isAuthenticated: true,
                    user: res.user
                })
            } else if (this.status == HttpStatus.UNAUTHORIZED) {
                that.setState({
                    loginMessage: 'Incorrect username/password'
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
                window.location.href = "/"
            }
        };
        request.send();
    }

    render() {
        const {isAuthenticated, loginMessage} = this.state
        return (
            <Context.Provider value={
                {
                    logIn: this.logIn,
                    logOut: this.logOut,
                    loginMessage
                }}>
                <Router>
                    <React.Fragment>
                        <Route
                            exact path="/"
                            component={isAuthenticated ? Home : PublicPage}/>
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
                        <AuthorizedRoute
                            exact path="/cart"
                            component={Cart}
                            permission={isAuthenticated}/>
                        <AuthorizedRoute
                            exact path="/orders"
                            component={Services}
                            permission={isAuthenticated}/>
                        <AuthorizedRoute
                            exact path="/place-order"
                            component={OrderForm}
                            permission={isAuthenticated}/>
                    </React.Fragment>
                </Router>
            </Context.Provider>
        )
    }
}

export default App;

