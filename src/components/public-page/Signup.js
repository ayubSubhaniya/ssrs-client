import React, { Component } from 'react';
import {domainUrl} from '../config/configuration'

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      daiictId: '',
      password: ''
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

  handleSignUp = () => {
    var url = domainUrl + '/account/signup'
    var userObj = this.state;
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.withCredentials = true;
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
      if (this.status == 202) {
        var res = JSON.parse(request.response)
        var user = res.user;
        console.log(user);
        // window.open("\homepage_admin.html", "_self");
      };
    };
    request.send(JSON.stringify(userObj));
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
        <input type="password" name="" placeholder="Confirm Password" id="passwd" />
        <input type="button" name="" value="SignUp" id="log" onClick={this.handleSignUp} /><br />
      </form>
    );
  }
}

export default SignUp;
