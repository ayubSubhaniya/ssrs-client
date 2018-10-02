import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl} from "../../config/configuration";
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
        })
        this.props.showSpinner();
        var url = domainUrl + '/account/signup';
        var userObj = {
            daiictId: this.state.daiictId,
            password: this.state.password
        };
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        const that = this;
        request.onload = function () {
            if (this.status == HttpStatus.CREATED) {
                that.setState({isSignedup: true});
            } else if (this.status === HttpStatus.FORBIDDEN) {
                that.setState({
                    signupMessage: "User Already Exist!"
                })
            }
            else {
                that.setState({
                    signupMessage: "Please Enter Valid Details"
                })
            }
            that.props.hideSpinner();
        };
        console.log(userObj);
        request.send(JSON.stringify(userObj));
    }

    handleResendVerificationLink = () => {
        console.log("Verification Link Sent")
        var url = domainUrl + '/account/resendVerificationLink/' + this.state.daiictId;
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.send();
    }

    changePassworVisibility = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    openModal = () => {
        this.setState({modalIsOpen: true, isSignedup: false});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    onForgetPassword = () => {

        const url = domainUrl + '/account/forgotPassword/' + this.state.forgotPasswordOfID;
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status == HttpStatus.OK) {

            }

        };
        request.send();
        this.setState({modalIsOpen: false});
    }

    clearSignupMessage = () => {
        this.setState({
            signupMessage: ''
        })
    }


    render() {
        const {daiictId, password, login, isSignedup, signupMessage, showPassword} = this.state
        return (
            <Context.Consumer>
                {
                    value => {
                        return (
                            <React.Fragment>
                                <img className={"dalogo"} src={logo}/>
                                <div className="loginbox">
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
