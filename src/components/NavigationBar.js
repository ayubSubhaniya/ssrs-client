import React, {Component} from 'react';
import {Context} from "./App";
import Image from "./Image";
import logo from "../images/daiict.png";
import {Link, withRouter} from "react-router-dom";
import AuthorizedComponent from "./AuthorizedComponent";
import {isSuperAdmin} from "../helper/userType";

function NavLink({path, text, onClick, className, currPath}) {

    if(currPath){
        currPath = "/" + currPath.split('/')[1];
    }

    return (
        <li className={"nav-item " + (currPath === path ? "active" : "") + " " + className}>
            <Link className="nav-link" onClick={onClick} to={{
                pathname: path,
            }}>{text}</Link>
        </li>
    )
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
                                    <ul className="navbar-nav ml-5 mr-3">
                                        <NavLink path={'/'}
                                                 text={"Home"}
                                                 currPath={this.props.location.pathname}/>
                                        <NavLink path={'/service'}
                                                 text={'Services'}
                                                 currPath={this.props.location.pathname}/>
                                        <NavLink text={isSuperAdmin(value.user) ? "All Orders" : "My Orders"}
                                                 path={'/order'}
                                                 currPath={this.props.location.pathname}/>
                                        <AuthorizedComponent permission={!isSuperAdmin(value.user)}
                                                             path={'/cart'}
                                                             currPath={this.props.location.pathname}
                                                             component={NavLink}
                                                             text={"My Cart"}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path={'/users'}
                                                             currPath={this.props.location.pathname}
                                                             component={NavLink}
                                                             text={"Users"}/>
                                        <NavLink path={'/Myprofile'}
                                                 currPath={this.props.location.pathname}
                                                 text={'My Profile'}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path={'/parameter'}
                                                             currPath={this.props.location.pathname}
                                                             text={'Parameters'}
                                                             component={NavLink}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path='/collectionType'
                                                             currPath={this.props.location.pathname}
                                                             text={'CollectionTypes'}
                                                             component={NavLink}/>
                                        <AuthorizedComponent permission={isSuperAdmin(value.user)}
                                                             path='/permission'
                                                             currPath={this.props.location.pathname}
                                                             text={'Permissions'}
                                                             component={NavLink}/>
                                        <NavLink text={'Logout'}
                                                 className={"ml-auto"}
                                                 path={this.props.location.pathname}
                                                 currPath={""}
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
