import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
        <form>
          <p>Student ID</p>
          <input type="text" name="" placeholder="Enter Student ID" id="username" />
          <p>Password</p>
          <input type="password" name="" placeholder="Enter Password" id="passwd" />
          <p>Confirm Password</p>
          <input type="password" name="" placeholder="Confirm Password" id="passwd" />
          <input type="button" name="" value="SignUp" id="log" /><br />
        </form>
    );
  }
}

export default Login;
