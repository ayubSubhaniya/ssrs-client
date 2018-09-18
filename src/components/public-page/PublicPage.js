import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import logo from "../../images/dalogo.jpg";
import ForgotPassword from "./ForgotPassword";

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
        this.setState({
            login: !this.state.login,
            daiictId: '',
            password: '',
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
                                            <div className="page-input">
                                                <div className="title"><i
                                                    className="material-icons">account_box</i> DA-IICT ID
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input type="text" className="form-control"
                                                           placeholder="DA-IICT ID"
                                                           aria-label="username"
                                                           value={daiictId}
                                                           onChange={this.handleChange}
                                                           name="daiictId"
                                                           aria-describedby="basic-addon"/>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text"
                                                                  id="basic-addon">@daiict.ac.in</span>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="page-input">
                                                <div className="title"><i className="material-icons">lock</i> PASSWORD
                                                </div>
                                                <input className="form-control" type="password" name="password" value={password}
                                                       onChange={this.handleChange}/>
                                                <div className={"alert alert-danger p-2 mt-2 mb-2" + (value.loginMessage?'':" d-none") }><strong>{value.loginMessage}</strong></div>
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
                                            <div className="page-input">
                                                <div className="title"><i
                                                    className="material-icons">account_box</i> DA-IICT ID
                                                </div>
                                                <div className="input-group mb-3">
                                                    <input type="text" className="form-control"
                                                           placeholder="DA-IICT ID"
                                                           aria-label="username"
                                                           value={daiictId}
                                                           onChange={this.handleChange}
                                                           name="daiictId"
                                                           aria-describedby="basic-addon"/>
                                                    <div className="input-group-append">
                                                            <span className="input-group-text"
                                                                  id="basic-addon">@daiict.ac.in</span>
                                                    </div>
                                                </div>
                                            </div>
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
                                                <div className={"alert alert-danger p-2 mt-2 mb-2" + (signupMessage?'':' d-none')}><strong>{signupMessage}</strong></div>
                                            </div>
                                            <div className="page-input"><input type="submit" value="SIGN ME UP!"
                                                                               onClick={this.handleSignUp}/></div>
                                            <div className={'alert alert-success alert-dismissible p-2 mt-2 mb-2' + (isSignedup ? '' : ' d-none')}>
                                                <button type="button" className="close"
                                                        data-dismiss="alert">&times;</button>
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
