import React, { Component } from 'react';
import {domainUrl} from '../config/configuration'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";


class Login extends Component {

  constructor() {
    super();
    this.state = {
      daiictId: '',
      password: '',
      redirectToReferrer: false
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

  handleLogIn = () => {
    const that = this;
    var url = domainUrl + '/account/signin'
    var userObj = {
      daiictId: this.state.daiictId,
      password: this.state.password
    };
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.withCredentials = true;
    request.setRequestHeader("Content-type", "application/json");
    request.onload = function () {
      if (this.status == 202) {
        var res = JSON.parse(request.response)
        var user = res.user;
        that.setState({ redirectToReferrer: true });
      };
    };
    request.send(JSON.stringify(userObj));
  }

  render() {
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to='/home' />;
    }

    return (
      <form >
        <p>DA-IICT ID</p>
        <input type="text" name="" placeholder="Enter Student ID" id="username"
          value={this.state.daiictId} onChange={this.handleDaiictIdChange} />
        <p>Password</p>
        <input type="password" name="" placeholder="Enter Password" id="passwd"
          value={this.state.password} onChange={this.handlePasswordChange} />
        <input type="button" name="" value="Login" id="log" onClick={this.handleLogIn} /><br />
      </form>
    );
  }
}

export default Login;
