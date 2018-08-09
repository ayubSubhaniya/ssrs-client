import React, { Component } from 'react';
import Header from './Header';
import Tab from '../components/Tab'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class NavigationBar extends Component {
  render() {
    return (
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="/home">Home</a>
            </Navbar.Brand>
        </Navbar.Header>
        <Nav>
            <NavDropdown eventKey={3} title="Request Mangement" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Service Mangement" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1} href='/addservice'>Add Service</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="User Mangement" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
            <NavItem eventKey={1} href="/">
                Logout 
            </NavItem>
        </Nav>
    </Navbar>
    );
  }
}

export default NavigationBar;
