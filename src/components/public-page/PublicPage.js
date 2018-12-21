import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl, infoMessages, errorMessages} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import logo from "../../images/dalogo.jpg";
import ForgotPassword from "./ForgotPassword";
import SignUpPage from "./SignUpPage"
import SignInPage from "./SignInPage"
import { withAlert } from "react-alert";
import {loadSpinner, unloadSpinner} from "../../helper/spinner";



class PublicPage extends Component {
    constructor() {
        super();
        this.state = {
            daiictId: '',
            password: '',
            forgotPasswordOfID: '',
            login: true,
            isSignedup: false,
            signupMessage: '',
            forgotPasswordMessage: '',
            showPassword: false,
            modalIsOpen: false,
            showSpinner: false,
            isTourOpen: false
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

    handleChange = ({target}) => {
        loadSpinner();

        this.setState({
            [target.name]: target.value,
            isSignedup: false
        })
        unloadSpinner();

    }

    switchTab = () => {
        loadSpinner();
        this.props.clearLoginMessage();
        this.setState({
            login: !this.state.login,
            daiictId: '',
            password: '',
            signupMessage: '',
            isSignedup: false
        })
        unloadSpinner();

    }

    handleSignUp = () => {
        loadSpinner();
        this.setState({
            isSignedup: false,
            signupMessage: ''
        });
        this.props.showSpinner();
        const url = domainUrl + '/account/signup';
        const userObj = {
            daiictId: this.state.daiictId,
            password: this.state.password
        };
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        const that = this;
        request.onload = function () {
            if (this.status == HttpStatus.CREATED) {
                that.props.alert.show(infoMessages.verificationLinkSent);
                that.setState({isSignedup: true});
            } else if (this.status === HttpStatus.FORBIDDEN) {
                that.setState({
                    signupMessage: request.responseText
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                that.setState({
                    signupMessage: request.responseText
                })
            }
            else {

                
               // console.log('pp ' + JSON.parse(request.responseText).name);
                if(JSON.parse(request.responseText).name === "ValidationError"){
                    that.setState({signupMessage: errorMessages.validationError})
                }else{
                that.setState({
                    signupMessage: request.responseText
                })}
            }
            unloadSpinner();
        };
        request.send(JSON.stringify(userObj));
    }

    handleResendVerificationLink = () => {
        loadSpinner();

        var url = domainUrl + '/account/resendVerificationLink/' + this.state.daiictId;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.send();
        unloadSpinner();

    };

    changePassworVisibility = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    };

    openModal = () => {
        this.setState({modalIsOpen: true, isSignedup: false});
    };

    closeModal = () => {
        this.setState({modalIsOpen: false});
    };

    onForgetPassword = () => {
        this.props.showSpinner();
        const that = this;
        const url = domainUrl + '/account/forgotPassword/' + this.state.forgotPasswordOfID;
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {
                that.props.alert.show(infoMessages.verificationLinkSent);
                that.setState({modalIsOpen: false});
            } else if (this.status === HttpStatus.FORBIDDEN) {
                that.setState({
                    forgotPasswordMessage: request.responseText
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                that.setState({
                    forgotPasswordMessage: request.responseText
                })
            }
            else {
                that.setState({
                    forgotPasswordMessage: request.responseText
                })
            }
            that.props.hideSpinner();
        };
        request.send();
    };

    clearSignupMessage = () => {
        loadSpinner();

        this.setState({
            signupMessage: ''
        })
        unloadSpinner();

    };

    clearForgetPasswordMessage = () => {
        loadSpinner();

        this.setState({
            forgotPasswordMessage: ''
        })
        unloadSpinner();

    };

   
    render() {
   
        const {daiictId, password, login, isSignedup, signupMessage, showPassword} = this.state
        return (
           
            <Context.Consumer>
                {
                    value => {
                        return (
                            <React.Fragment>
                                 
                                <div className="loginbox">
                                    <div className="imagelogo">
                                        <img className={"dalogo"} src={logo}/>
                                    </div>
                                    <input type="radio" name="tab" id="signin" onChange={this.switchTab}
                                           checked={login}/>
                                    <input type="radio" name="tab" id="register" onChange={this.switchTab}
                                           checked={!login}/>
                                    <div className="pages">

                                        <SignInPage daiictId={daiictId}
                                                    loginMessage={value.loginMessage}
                                                    logIn={value.logIn}
                                                    openModal={this.openModal}
                                                    clearLoginMessage={this.props.clearLoginMessage}
                                                    handleChange={this.handleChange}
                                                    password={password}/>
                                        <SignUpPage daiictId={daiictId}
                                                    password={password}
                                                    showPassword={showPassword}
                                                    isSignedup={isSignedup}
                                                    handleResendVerificationLink={this.handleResendVerificationLink}
                                                    changePassworVisibility={this.changePassworVisibility}
                                                    signupMessage={signupMessage}
                                                    clearSignupMessage={this.clearSignupMessage}
                                                    handleSignUp={this.handleSignUp}
                                                    handleChange={this.handleChange}
                                                    />
                                    
                                    </div>
                                    <div className="tabs"><label className="tab" htmlFor="signin">
                                        <div className="text">Sign In</div>
                                    </label><label className="tab" htmlFor="register">
                                        <div className="text">Register</div>
                                    </label></div>
                                </div>
                                <ForgotPassword visible={this.state.modalIsOpen}
                                                closeModal={this.closeModal}
                                                errorMessage={this.state.forgotPasswordMessage}
                                                clearErrorMessage={this.clearForgetPasswordMessage}
                                                value={this.state.forgotPasswordOfID}
                                                handleChange={this.handleChange}
                                                onSubmit={this.onForgetPassword}/>
                            </React.Fragment>)
                    }}
            </Context.Consumer>
        )
    }
}

export default withAlert(PublicPage);
