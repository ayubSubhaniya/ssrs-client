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
        <li className={"nav-item " + (currPath === path ? "active" : "") + " " + className} >
            <Link className="nav-link" onClick={onClick} to={{
                pathname: path,
            }}>
                {
                    text === 'Logout' ? <i className="fa fa-sign-out" style={{ marginRight: "5px" }} />
                    : text === "My Profile" ? <i className="fa fa-user" style={{ marginRight: "5px" }} />
                    : text === "Users" ? <i className="fa fa-users" style={{ marginRight: "5px" }} />
                    : text === "All Orders" ? <i className="fa fa-shopping-basket" style={{ marginRight: "5px" }} />
                    : text === "My Orders" ? <i className="fa fa-list-ul" style={{ marginRight: "5px" }} />
                    : text === "Home" ? <i className="fa fa-home" style={{ marginRight: "5px" }} />
                    : text === "Services" ? <i className="fa fa-handshake-o" style={{ marginRight: "5px" }} />
                    : text === "Parameters" ? <i className="fa fa-cog" style={{ marginRight: "5px" }} />
                    : text === "Permissions" ? <i className="fa fa-lock" style={{ marginRight: "5px" }} />
                    : text === "CollectionTypes" ? <i className="fa fa-archive" style={{ marginRight: "5px" }} /> 
                    : text === "My Cart" ? <i className="fa fa-cart-plus" style={{ marginRight: "5px" }}></i>
                    : <i></i>
                }{text}
            </Link>
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
