import React, { Component } from 'react';
import Header from './Header';
import Tab from './home/Tab'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {authentication} from "./App";
import {domainUrl} from "../config/configuration";
import * as HttpStatus from "http-status-codes";

class NavigationBar extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect className={'navbar'}>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="/home">Home</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavDropdown eventKey={1} title="Order Mangement" id="basic-nav-dropdown">
            <MenuItem eventKey={1.1}  href='/order'>All Orders</MenuItem>
            <MenuItem eventKey={1.2}>Another action</MenuItem>
            <MenuItem eventKey={1.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={1.4}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={1} title="Service Mangement" id="basic-nav-dropdown">
            <MenuItem eventKey={1.1} href='/service'>All Services</MenuItem>
            <MenuItem eventKey={1.2} href='/service/add'>Add New Service</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="User Mangement" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
            <NavItem eventKey={1} href="/help">
                Help
            </NavItem>
            <NavItem eventKey={2} href="/">
                My Profile
            </NavItem>
            <NavItem eventKey={3} onClick={() => {
                const url = domainUrl + '/account/signout'
                var request = new XMLHttpRequest();
                request.open('GET', url, true);
                request.withCredentials = true;
                request.onload = function () {
                    if (this.status == HttpStatus.OK) {
                        authentication.isAuthenticated = false;
                        window.location.reload();
                    };
                };
                request.send();
            }} >
                Logout
            </NavItem>
        </Nav>
    </Navbar>
    );
  }
}

export default NavigationBar;
