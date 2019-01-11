import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import 'bootstrap'
import 'font-awesome/css/font-awesome.min.css'
import '../styles/filter/reset.css'
import '../styles/filter/style.css'
import '../styles/App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Home from './home/Home';
import Services from "./service/Services";
import NewServiceForm from "./service/NewServiceForm";
import EditForm from "./service/EditForm";
import AuthorizedRoute from './AuthorizedRoute'
import {domainUrl, errorMessages} from "../config/configuration";
import * as HttpStatus from "http-status-codes";
import PublicPage from "./public-page/PublicPage";
import Parameters from "./parameter/Parameters";
import ParameterEditForm from "./parameter/ParameterEditForm";
import NewParameterForm from "./parameter/NewParameterForm";
import CollectionType from "./collectionType/CollectionType";
import CollectionTypeEditForm from "./collectionType/CollectionTypeEditForm";
import Cart from './order/cart/Cart'
import {isAdmin, isStudent, isSuperAdmin, isOnlyAdmin} from "../helper/userType";
import Payment from "./order/payment/Payment";
import Info from "./order/info/Info";
import Myprofile from './Myprofile/Myprofile'
import UserList from './user/UserList';
import Filter from './order/Orders'
import CartWithOrders from "./order/OrderInfo";
import Permission from './Permission/Permission';
import NewCollectionTypeForm from "./collectionType/NewCollectionTypeForm";
import HelpAdmin from './helpAdmin/HelpAdmin';
import HelpUser from './helpUser/HelpUser';
import {makeCall} from "../helper/caller";
import {defaultUser} from "../constants/constants";
import dashboard from "./Dashboard/dashboard";
import {handleError} from "../helper/error";
import Email from "./email/Email"
import AboutUs from './AboutUs/AboutUs';
import {loadSpinner, unloadSpinner} from "../helper/spinner";
import Demo from "../product_tour/Demo";
import Tour from "reactour";
import Text from "../product_tour/Text";
import Tooltip from "../product_tour/Tooltip";
import { Link } from "../product_tour/Button";
import Dashboard_admin from '../components/Dashboard/dashboard_admin';
export const Context = React.createContext();

class App extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            showSpinner: false,
            isAuthenticated: -1,
            loginMessage: '',
            user: defaultUser,
            
        }
        this.getUserData();
    }
   

    onUpdateUserError = (response) => {
        if (response.status === HttpStatus.FORBIDDEN) {
            this.setState({
                signupMessage: errorMessages.userAlreadyExist
            })
        } else if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.setState({
                signupMessage: errorMessages.internalServerError
            })
        }
        else {
            this.setState({
                signupMessage: errorMessages.somethingsWrong
            })
        }
    }

    updateUser = (updatedUser) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/user',
            params: updatedUser
        })
            .then(() => {
                const user = this.state.user;
                user.contactNo = updatedUser.contactNo;
                this.setState({
                    user: user
                })
            })
            .catch((response) => this.onUpdateUserError(response))
    };
    getUserData = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/user'
        })
            .then((response) => {
                this.setState({
                    isAuthenticated: true,
                    user: response.user
                })
            })
            .catch(() => {
                this.setState({
                    isAuthenticated: false
                })
            })
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

    handleLoginError = (response) => {
        if (response.status === HttpStatus.FORBIDDEN) {
            this.setState({
                loginMessage: response.statusText
            })
        } else if (response.status === HttpStatus.UNAUTHORIZED) {
            this.setState({
                loginMessage: errorMessages.incorrectUserNameOrPassword
            })
        } else if (response.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.setState({
                loginMessage: errorMessages.internalServerError
            })
        } else {
            this.setState({
                loginMessage: errorMessages.somethingsWrong
            })
        }
    }

    logIn = (logInDetails, redirect) => {
        makeCall({
            jobType: 'POST',
            urlParams: '/account/signin',
            params: logInDetails
        })
            .then((response) => {
                this.setState({
                    isAuthenticated: true,
                    user: response.user
                })
                redirect();
            })
            .catch((response) => this.handleLoginError(response))
    }
    clearLoginMessage = () => {
        this.setState({
            loginMessage: ''
        })
    }


    logOut = () => {
        loadSpinner();
        const that = this;
        var url = domainUrl + '/account/signout';
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                that.setState({
                    isAuthenticated: false,
                    user: defaultUser
                })
                window.open("/", "_self");
            } else {
                handleError(request)
            }
            unloadSpinner();
        }
        request.send();
    }

    clearLoginMessage = () => {
        this.setState({
            loginMessage: ''
        })
    }
    
    render() {
        
        const {isAuthenticated, loginMessage} = this.state;
        if (isAuthenticated) {
            document.body.style.background = "#ffffff";
        } else {
            var urlString = 'url(' + require('../images/w2.jpg') + ')';
            document.body.style.background = urlString;
        }

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
                        <Switch>
                            <AuthorizedRoute
                                permission={true}
                                exact path="/"
                                hideSpinner={this.hideSpinner}
                                showSpinner={this.showSpinner}
                                clearLoginMessage={this.clearLoginMessage}
                                user={this.state.user}
                                component={isAuthenticated === -1
                                    ? () => '' : isAuthenticated ?  Home : PublicPage}/>
                                
                            <AuthorizedRoute
                                exact path="/service"
                                component={Services}
                                hideSpinner={this.hideSpinner}
                                showSpinner={this.showSpinner}
                                permission={isAuthenticated}
                                user={this.state.user}/>
                            <AuthorizedRoute
                                exact path="/order"
                                component={Filter}
                                permission={isAuthenticated}
                                user={this.state.user}/>
                            <AuthorizedRoute
                                exact path="/service/add"
                                component={NewServiceForm}
                                permission={isSuperAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/service/edit/*"
                                component={EditForm}
                                permission={isSuperAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/parameter"
                                component={Parameters}
                                permission={isAdmin(this.state.user)}
                                user={this.state.user}/>
                            <AuthorizedRoute
                                path="/parameter/edit"
                                component={ParameterEditForm}
                                permission={isAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/parameter/add"
                                component={NewParameterForm}
                                permission={isAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/collectionType"
                                component={CollectionType}
                                permission={isAdmin(this.state.user)}
                                user={this.state.user}/>
                            <AuthorizedRoute
                                exact path="/collectionType/edit/*"
                                component={CollectionTypeEditForm}
                                permission={isAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/collectionType/add"
                                component={NewCollectionTypeForm}
                                permission={isAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/cart"
                                component={Cart}
                                permission={isStudent(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/info"
                                component={Info}
                                permission={isStudent(this.state.user)}/>
                            <AuthorizedRoute
                                path='/payment/'
                                component={Payment}
                                permission={isStudent(this.state.user)}/>
                            <AuthorizedRoute
                                exact path='/users'
                                component={UserList}
                                permission={isSuperAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/Myprofile"
                                component={Myprofile}
                                permission={isAuthenticated}
                                user={this.state.user}
                                updateUser={this.updateUser}/>
                            <AuthorizedRoute
                                exact path="/order/*"
                                component={CartWithOrders}
                                permission={isAuthenticated}
                                user={this.state.user}/>
                            <AuthorizedRoute
                                exact path='/Permission'
                                component={Permission}
                                permission={isSuperAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path='/helpAdmin'
                                component={HelpAdmin}
                                user={this.state.user}
                                permission={isAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path='/helpUser'
                                component={HelpUser}
                                user={this.state.user}
                                permission={isStudent(this.state.user)}/>
                            <AuthorizedRoute
                                exact path='/dashboard'
                                component={dashboard}
                                permission={isSuperAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path='/email'
                                component={Email}
                                permission={isSuperAdmin(this.state.user)}/>
                            <AuthorizedRoute
                                exact path="/aboutUs"
                                component={AboutUs}
                                permission={true}/>
                            <Route render={() => <Redirect to='/'/>}/>
                        </Switch>
                    </React.Fragment>
                </Router>
            </Context.Provider>
        )
    }
    
}

export default App;

