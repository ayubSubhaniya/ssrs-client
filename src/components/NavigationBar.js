import React, {Component} from 'react';
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
                            <nav className="navbar navbar-expand-lg navbar-dark nav-bg">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/">Home <span
                                                className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Order Mangement
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <a className="dropdown-item" href='/orders'>All Orders</a>
                                                <a className="dropdown-item" href="/place-order">Place Order</a>
                                                <a className="dropdown-item" href="/">Something else here</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Service Managment
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <a className="dropdown-item" href="/service">All Services</a>
                                                <a className="dropdown-item" href="/service/add">Add New Service</a>
                                                <a className="dropdown-item" href="/">Something else here</a>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                User Mangement
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <a className="dropdown-item" href="/service">All Services</a>
                                                <a className="dropdown-item" href="/service/add">Add New Service</a>
                                                <a className="dropdown-item" href="/">Something else here</a>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/cart">Cart</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/">My Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" onClick={value.logOut} style={{"cursor":"pointer"}}>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>)
                }}
            </Context.Consumer>
        );
    }
}

export default NavigationBar;
