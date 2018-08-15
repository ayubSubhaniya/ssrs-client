import React, {Component} from 'react';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem} from 'react-bootstrap'
import {Context} from "./App";
import Image from "./Image";
import logo from "../images/daiict.png";

class NavigationBar extends Component {
    render() {
        return (
            <Context.Consumer>{
                value => {
                    return (
                    <div>
                        <Image src={logo} className={'logo'}/>
                        <Navbar inverse collapseOnSelect className={'navbar'}>
                            <Navbar.Header>
                                <Navbar.Brand>
                                    <a href="/">Home</a>
                                </Navbar.Brand>
                            </Navbar.Header>
                            <Nav>
                                <NavDropdown eventKey={1} title="Order Mangement" id="basic-nav-dropdown">
                                    <MenuItem eventKey={1.1} href='/order'>All Orders</MenuItem>
                                    <MenuItem eventKey={1.2}>Another action</MenuItem>
                                    <MenuItem eventKey={1.3}>Something else here</MenuItem>
                                    <MenuItem divider/>
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
                                    <MenuItem divider/>
                                    <MenuItem eventKey={3.4}>Separated link</MenuItem>
                                </NavDropdown>
                                <NavItem eventKey={1} href="/help">
                                    Help
                                </NavItem>
                                <NavItem eventKey={2} href="/">
                                    My Profile
                                </NavItem>
                                <NavItem eventKey={3} onClick={value.logOut}>
                                    Logout
                                </NavItem>
                            </Nav>
                        </Navbar>
                    </div>)
                }}
            </Context.Consumer>
        );
    }
}

export default NavigationBar;
