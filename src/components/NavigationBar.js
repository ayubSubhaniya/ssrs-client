import React, {Component} from 'react';
import {Context} from "./App";
import Image from "./Image";
import logo from "../images/daiict.png";
import {Link, withRouter} from "react-router-dom";

class NavigationBar extends Component {
    render() {
        console.log(this.props);
        return (
            <Context.Consumer>{
                value => {
                    return (
                        <div>
                            <Image src={logo} className={'logo'}/>
                            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav ml-5">
                                        <li className="nav-item active">
                                            <Link className="nav-link" to={{
                                                pathname: '/',
                                            }}>Home <span
                                                className="sr-only">(current)</span></Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Order Mangement
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>All Orders</Link>
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>Place Order</Link>
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>Something else here</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                Service Managment
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>All Services</Link>
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/add',
                                                }}>Add New Service</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                               role="button" data-toggle="dropdown" aria-haspopup="true"
                                               aria-expanded="false">
                                                User Mangement
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>
                                                    All Services
                                                </Link>
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>Add New Service</Link>
                                                <Link className="dropdown-item" to={{
                                                    pathname: '/service/',
                                                }}>Something else here</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={{
                                                pathname: '/cart/',
                                            }}>Cart</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to={{
                                                pathname: '/',
                                            }}>My Profile</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" onClick={value.logOut}
                                               style={{"cursor": "pointer"}} to={{
                                                pathname: '/'
                                            }}>Logout</Link>
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

export default withRouter(NavigationBar);
