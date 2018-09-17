import React, {Component} from 'react';
import '../styles/App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from './home/Home';
import Services from "./service/Services";
import NewServiceForm from "./service/NewServiceForm";
import EditForm from "./service/EditForm";
import AuthorizedRoute from './AuthorizedRoute'
import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import PublicPage from "./public-page/PublicPage";
import OrderForm from "./service/OrderForm";
import Orders from "./order/Orders";
import Spinner from "./Spinner";
import Parameters from "./parameter/Parameters";
import ParameterEditForm from "./parameter/ParameterEditForm";
import NewParameterForm from "./parameter/NewParameterForm";
import CollectionType from "./CollectionType/CollectionType";
import CollectionTypeEditForm from "./CollectionType/CollectionTypeEditForm";

export const Context = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isAuthenticated: false,
            loginMessage: '',
            user: {}
        }
        this.getUserData();
    }

    getUserData = () => {
        const that = this;
        var url = domainUrl + '/user';
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                var res = JSON.parse(request.response)
                console.log(res.user);
                that.state = Object.assign({},that.state,{
                    isAuthenticated: true,
                    user: res.user
                })
            }
        }
        try {
            request.send();
        } catch (e) {
            console.log(e);
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

    logIn = (logInDetails) => {
        const that = this;
        this.showSpinner();
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
            } else {
                that.setState({
                    loginMessage: 'Incorrect Username/Password. Try Again!'
                })
            }
            that.hideSpinner();
        }
        request.send(JSON.stringify(logInDetails));
    }

    logOut = () => {
        const that = this;
        this.setState({
            showSpinner: true
        })
        const url = domainUrl + '/account/signout'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                window.location = '/'
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
                    loginMessage,
                    user: this.state.user
                }}>
                <Router>
                    <React.Fragment>
                        <Spinner open={this.state.showSpinner}/>
                        <AuthorizedRoute
                            permission={true}
                            exact path="/"
                            hideSpinner={this.hideSpinner}
                            showSpinner={this.showSpinner}
                            component={isAuthenticated ? Home : PublicPage}/>
                        <AuthorizedRoute
                            exact path="/service"
                            component={Services}
                            hideSpinner={this.hideSpinner}
                            showSpinner={this.showSpinner}
                            permission={isAuthenticated}
                            user={this.state.user}/>
                        <AuthorizedRoute
                            exact path="/order"
                            component={Orders}
                            permission={isAuthenticated}
                            user={this.state.user}/>
                        <AuthorizedRoute
                            exact path="/service/add"
                            component={NewServiceForm}
                            permission={this.state.user.userType === 'superAdmin'}/>
                        <AuthorizedRoute
                            path="/service/edit"
                            component={EditForm}
                            permission={this.state.user.userType === 'superAdmin'}/>
                        <AuthorizedRoute
                            path="/service/order"
                            component={OrderForm}
                            permission={this.state.user.userType === 'student'}/>
                        <AuthorizedRoute
                            exact path="/parameter"
                            component={Parameters}
                            permission={this.state.user.userType === 'superAdmin'}
                            user={this.state.user}/>
                        <AuthorizedRoute
                            path="/parameter/edit"
                            component={ParameterEditForm}
                            permission={this.state.user.userType === 'superAdmin'}/>
                        <AuthorizedRoute
                            exact path="/parameter/add"
                            component={NewParameterForm}
                            permission={this.state.user.userType === 'superAdmin'}/>
                        <AuthorizedRoute
                            exact path="/collectionType"
                            component={CollectionType}
                            permission={this.state.user.userType === 'superAdmin'}
                            user={this.state.user}/>
                        <AuthorizedRoute
                            path="/collectionType/edit"
                            component={CollectionTypeEditForm}
                            permission={this.state.user.userType === 'superAdmin'}/>
                    </React.Fragment>
                </Router>
            </Context.Provider>
        )
    }
}

export default App;

