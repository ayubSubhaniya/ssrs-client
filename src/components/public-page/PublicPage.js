import React, {Component} from 'react';
import '../../styles/publicpage.css'
import {Context} from "../App";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import logo from "../../images/dalogo.jpg";
import Modal from "react-modal";


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
        console.log(target.name);
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
            } else {
                that.setState({
                    signupMessage: "Please enter valid details"
                })
            }
        };
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
                                                <input className="text" type="text" name="daiictId" value={daiictId}
                                                       onChange={this.handleChange}/></div>
                                            <div className="page-input">
                                                <div className="title"><i className="material-icons">lock</i> PASSWORD
                                                </div>
                                                <input className="text" type="password" name="password" value={password}
                                                       onChange={this.handleChange}/>
                                                <div className="alert-danger page-input">{value.loginMessage}</div>
                                            </div>
                                            <div className="page-input"><input type="submit" value="ENTER"
                                                                               onClick={() => value.logIn({
                                                                                   daiictId: this.state.daiictId,
                                                                                   password: this.state.password
                                                                               })}/></div>
                                            <input type="button" className={'page-link'} value="Forgot Password"
                                                   onClick={this.openModal}/>
                                        </div>
                                        <div className="page signup">
                                            <div className="page-input">
                                                <div className="title"><i
                                                    className="material-icons">account_box</i> DA-IICT ID
                                                </div>
                                                <input className="text" type="text" name="daiictId" value={daiictId}
                                                       onChange={this.handleChange}/></div>
                                            <div className="page-input">
                                                <div className="title"><i className="material-icons">lock</i> PASSWORD
                                                </div>
                                                <input className="text" type={showPassword ? "text" : "password"}
                                                       name="password" value={password}
                                                       onChange={this.handleChange} style={{"padding-right": "32px"}}/>
                                                <i className="material-icons icon-eye"
                                                   onClick={this.changePassworVisibility}>
                                                    {showPassword ? "visibility_off" : "visibility"}
                                                </i>
                                                <div className="alert-danger page-input">{signupMessage}</div>
                                            </div>
                                            <div className="page-input"><input type="submit" value="SIGN ME UP!"
                                                                               onClick={this.handleSignUp}/></div>
                                            <input type="button" className={'page-link' + (isSignup ? '' : ' hide')}
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

                                <Modal
                                    isOpen={this.state.modalIsOpen}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    contentLabel="Forgot Password Modal"
                                >
                                    <div className={"modal-close-btn" + (this.state.modalIsOpen ? '' : " hide")}
                                         onClick={this.closeModal}>
                                        <i className="material-icons">close</i>
                                    </div>
                                    <form>
                                        <input type="text" placeholder={"Enter DA-IICT ID"}/>
                                        <input type="submit"/>
                                    </form>
                                </Modal>
                            </React.Fragment>)
                    }}
            </Context.Consumer>
        )
    }
}

export default PublicPage;
