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
            //verificationLink: ''
        }
    }

    handleDaiictIdChange = (event) => {
        this.setState({
            daiictId: event.target.value
        })
    }

    handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleConfirmPasswordChange = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    }

    handleSignUp = () => {
        if (this.state.password != this.state.confirmPassword) {
            alert("Password not same");
            return;
        }
        //delete this.state.confirmPassword;
        

        var url = domainUrl + '/account/signup'
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
                /*var response = JSON.parse(request.responseText);
                that.setState({verificationLink:response.resendVerificationLink})
                console.log(that.state.verificationLink);*/
                // window.open("\homepage_admin.html", "_self");
            }
            ;
        };
        request.send(JSON.stringify(userObj));
    }

    handleResendVerificationLink = () => {
      var url = domainUrl + '/account/resendVerificationLink/' + this.state.daiictId;
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.withCredentials =  true;
      request.send();
    }


    render() {
        return (
            <form>
                <p>DA-IICT ID</p>
                <input type="text" name="" placeholder="Enter Student ID" id="username"
                       value={this.state.daiictId} onChange={this.handleDaiictIdChange}
                />
                <p>Password</p>
                <input type="password" name="" placeholder="Enter Password" id="passwd"
                       value={this.state.password} onChange={this.handlePasswordChange}
                />
                <p>Confirm Password</p>
                <input type="password" name="" placeholder="Confirm Password" id="passwd"
                       value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange}
                />
                <input type="button" name="" value="SignUp" id="log" onClick={this.handleSignUp}/><br/>
                {
                  this.state.isSignup
                  ?<input type="button" name="" value="Resend confirmation link" id="resendVerificationLink" onClick={this.handleResendVerificationLink}/>
                  :''
                }
            </form>
        );
    }
}

export default SignUp;
