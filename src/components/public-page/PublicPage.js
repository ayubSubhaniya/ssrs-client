import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl, errorMessages, infoMessages} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import logo from "../../images/dalogo.jpg";
import ForgotPassword from "./ForgotPassword";
import SignUpPage from "./SignUpPage"
import SignInPage from "./SignInPage"

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
            modalIsOpen: false
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
            isSignedup: false
        })
    }

    switchTab = () => {
        this.props.clearLoginMessage();
        this.setState({
            login: !this.state.login,
            daiictId: '',
            password: '',
            signupMessage: '',
            isSignedup: false
        })
    }

    handleSignUp = () => {
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
                that.setState({isSignedup: true});
            } else if (this.status === HttpStatus.FORBIDDEN) {
                that.setState({
                    signupMessage: errorMessages.userAlreadyExist
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                that.setState({
                    signupMessage: errorMessages.internalServerError
                })
            }
            else {
                that.setState({
                    signupMessage: errorMessages.somethingsWrong
                })
            }
            that.props.hideSpinner();
        };
        request.send(JSON.stringify(userObj));
    }

    handleResendVerificationLink = () => {
        var url = domainUrl + '/account/resendVerificationLink/' + this.state.daiictId;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.send();
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
                alert(infoMessages.verificationLinkSent);
                that.setState({modalIsOpen: false});
            }  else if (this.status === HttpStatus.FORBIDDEN) {
                that.setState({
                    forgotPasswordMessage: errorMessages.userNotExist
                })
            } else if (this.status === HttpStatus.INTERNAL_SERVER_ERROR) {
                that.setState({
                    forgotPasswordMessage: errorMessages.internalServerError
                })
            }
            else {
                that.setState({
                    forgotPasswordMessage: errorMessages.somethingsWrong
                })
            }
            that.props.hideSpinner();
        };
        request.send();
    };

    clearSignupMessage = () => {
        this.setState({
            signupMessage: ''
        })
    };

    clearForgetPasswordMessage = () => {
        this.setState({
            forgotPasswordMessage: ''
        })
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
                                                    handleChange={this.handleChange}/>
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

export default PublicPage;
