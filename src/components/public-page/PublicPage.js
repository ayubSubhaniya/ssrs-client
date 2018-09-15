import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import logo from "../../images/dalogo.jpg";
import Modal from 'react-bootstrap4-modal';
import ForgotPassword from "./ForgotPassword";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class PublicPage extends Component {
    constructor() {
        super();
        this.state = {
            daiictId: '',
            password: '',
            login: true,
            isSignup: false,
            signupMessage: '',
            showPassword: false,
            modalIsOpen: false
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value,
            isSignup: false
        })
    }

    switchTab = () => {
        this.setState({
            login: !this.state.login,
            daiictId: '',
            password: '',
            isSignup: false
        })
    }

    handleSignUp = () => {
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
                that.setState({isSignup: true});
            }else if(this.status===HttpStatus.FORBIDDEN){
                that.setState({
                    signupMessage: "User already exist"
                })
            }
            else  {
                that.setState({
                    signupMessage: "Please enter valid details"
                })
            }
        };
        console.log(userObj);
        request.send(JSON.stringify(userObj));
    }

    handleResendVerificationLink = () => {
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
        this.setState({modalIsOpen: true});
    }

    closeModal = () => {
        this.setState({modalIsOpen: false});
    }

    onForgetPassword = () => {
        this.setState({modalIsOpen: false});
        console.log(this.state.daiictId);
    }


    render() {
        const {daiictId, password, login, isSignup, signupMessage, showPassword} = this.state
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
                                                <div className="alert-danger page-input pl-1 pr-1 radius">{value.loginMessage}</div>
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
                                                <div className="alert-danger page-input pl-1 pr-1 radius">{signupMessage}</div>
                                            </div>
                                            <div className="page-input"><input type="submit" value="SIGN ME UP!"
                                                                               onClick={this.handleSignUp}/></div>
                                            <input type="button" className={'page-link-cstm' + (isSignup ? '' : ' d-none')}
                                                   value="Resend Verification link"
                                                   onClick={this.handleResendVerificationLink}/>
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
                                                value={this.state.daiictId}
                                                handleChange={this.handleChange}
                                                onSubmit={this.onForgetPassword}/>
                            </React.Fragment>)
                    }}
            </Context.Consumer>
        )
    }
}

export default PublicPage;
