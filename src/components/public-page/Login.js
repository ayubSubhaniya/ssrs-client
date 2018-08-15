import React, {Component} from 'react';
import {domainUrl} from '../../config/configuration'
import {Redirect} from "react-router-dom";
import {Context} from "../App";
import * as HttpStatus from 'http-status-codes'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            daiictId: '',
            password: '',
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

    render() {
        return (
            <Context.Consumer>
            {
                value => {
                    return (<form>
                        <p>DA-IICT ID</p>
                        <input
                            type="text"
                            name=""
                            placeholder="Enter Student ID"
                            id="username"
                            value={this.state.daiictId}
                            onChange={this.handleDaiictIdChange}/>
                        <p>Password</p>
                        <input
                            type="password"
                            name=""
                            placeholder="Enter Password"
                            id="passwd"
                               value={this.state.password} onChange={this.handlePasswordChange}/>
                        <input type="button" name="" value="Login" id="log" onClick={() => value.logIn({
                            daiictId: this.state.daiictId,
                            password: this.state.password
                        })}/><br/>
                    </form>)
                }
            }
            </Context.Consumer>
        )
    }
}

export default Login;
