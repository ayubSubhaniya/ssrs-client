import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import logo from "../../images/dalogo.jpg";
import ForgotPassword from "./ForgotPassword";
import TextInputUserName from "./TextInputUserName";

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
            }else if(this.status===HttpStatus.FORBIDDEN){
                that.setState({
                    signupMessage: "User Already Exist!"
                })
            }
            else  {
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
        this.setState({modalIsOpen: false});
        console.log(this.state.forgotPasswordOfID);
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
                                        <div className="page">
                                            <TextInputUserName daiictId={daiictId}
                                                               handleChange={this.handleChange}/>
                                            <div className="page-input">
                                                <div className="title"><i className="material-icons">lock</i> PASSWORD
                                                </div>
                                                <input className="form-control" type="password" name="password" value={password}
                                                       onChange={this.handleChange}/>
                                                <div className={"alert alert-danger p-2 mt-2 mb-2" + (value.loginMessage?'':" d-none") }>
                                                    <button type="button" className="close" onClick={this.props.clearLoginMessage}>
                                                        &times;</button>
                                                    <strong>{value.loginMessage}</strong></div>
                                            </div>
                                            <div className="page-input"><input type="submit" value="ENTER"
                                                                               onClick={() => value.logIn({
                                                                                   daiictId: this.state.daiictId,
                                                                                   password: this.state.password
                                                                               })}/></div>
                                            <input type="button" className={'page-link-cstm'} value="Forgot Password"
                                                   onClick={this.openModal}/>
                                        </div>
                                        <div className="page signup">
                                            <TextInputUserName daiictId={daiictId}
                                                               handleChange={this.handleChange}/>
                                            <div className="page-input">
                                                <div className="title"><i className="material-icons">lock</i> PASSWORD
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input type={showPassword ? "text" : "password"}
                                                           className="form-control"
                                                           aria-label="password"
                                                           value={password}
                                                           onChange={this.handleChange}
                                                           name="password"
                                                           aria-describedby="basic-addon"/>
                                                    <div className="input-group-append">
                                                            <span className="input-group-text"
                                                                  id="basic-addon">
                                                                <i className="material-icons" style={{"cursor":"pointer"}}
                                                                                      onClick={this.changePassworVisibility}>
                                                    {!showPassword ? "visibility_off" : "visibility"}
                                                </i></span>
                                                    </div>
                                                </div>
                                                <div className={"alert alert-danger p-2 mt-2 mb-2" + (signupMessage?'':' d-none')}>
                                                    <button type="button" className="close" onClick={this.clearSignupMessage}>
                                                        &times;</button>
                                                    <strong>{signupMessage}</strong></div>
                                            </div>
                                            <div className="page-input"><input type="submit" value="SIGN ME UP!"
                                                                               onClick={this.handleSignUp}/></div>
                                            <div className={'alert alert-success p-2 mt-2 mb-2' + (isSignedup ? '' : ' d-none')}>
                                                <strong>Verification Link Sent!</strong>
                                                <span className={"alert-link"}
                                                     style={{"cursor": "pointer"}}
                                                     onClick={this.handleResendVerificationLink}> Resend
                                                </span>
                                        </div>
                                        </div>
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
