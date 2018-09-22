import React, {Component} from 'react';
import {Context} from "./App";
import Image from "./Image";
import logo from "../images/daiict.png";
import {Link, withRouter} from "react-router-dom";
import AuthorizedComponent from "./AuthorizedComponent";
import {isSuperAdmin} from "../helper/userType";

function NavLink({path, text, onClick}) {
    return (<li className="nav-item">
        <Link className="nav-link" onClick={onClick} to={{
            pathname: path,
        }}>{text}</Link>
    </li>)
}

class NavigationBar extends Component {
    render() {
        return (
            <Context.Consumer>{
                value => {
                    return (
                        <div>
                            <Image src={logo} className={'logo'}/>
                            <nav className="navbar navbar-expand-lg navbar-dark nav-custom bg-dark">
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                                        aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav ml-5">
                                        <NavLink path={'/'}
                                                 text={"Home"}/>
                                        <NavLink path={'/service'}
                                                 text={'Services'}/>
                                        <NavLink text={isSuperAdmin(value.user) ? "All Orders" : "My Orders"}
                                                 path={'/order'}/>
                                        <AuthorizedComponent permission={!isSuperAdmin(value.user)}
                                                             path={'/cart'}
                                                             component={NavLink}
                                                             text={"My Cart"}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path={'/users'}
                                                             component={NavLink}
                                                             text={"User Management"}/>
                                        <NavLink path={'/'}
                                                 text={'My Profile'}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path={'parameter'}
                                                             text={'Parameter Management'}
                                                             component={NavLink}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path='/collectionType'
                                                             text={'CollectionType Management'}
                                                             component={NavLink}/>
                                        <NavLink text={'Logout'}
                                                 path={this.props.location.pathname}
                                                 onClick={value.logOut}/>
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
