import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import * as HttpStatus from 'http-status-codes'


class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            daiictId: '',
            password: '',
            confirmPassword: '',
            isSignup: false,
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        })
    }

    handleSignUp = () => {
        if (this.state.password != this.state.confirmPassword) {
            alert("Password and Confirmed Password are not same");
            return;
        }

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
            }
            ;
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


    render() {
        return (
            this.state.isSignup
                ? (<input type="button" value="Resend confirmation link"
                          onClick={this.handleResendVerificationLink}/>)
                : (<form>
                    <p>DA-IICT ID</p>
                    <input type="text" name={'daiictId'} placeholder="Enter Student ID"
                           value={this.state.daiictId} onChange={this.handleChange}
                    />
                    <p>Password</p>
                    <input type="password" name={'password'} placeholder="Enter Password"
                           value={this.state.password} onChange={this.handleChange}
                    />
                    <p>Confirm Password</p>
                    <input type="password" name={'confirmPassword'} placeholder="Confirm Password"
                           value={this.state.confirmPassword} onChange={this.handleChange}
                    />
                    <input type="button" value="SignUp" onClick={this.handleSignUp}/><br/>
                </form>)
        );
    }
}

export default SignUp;
