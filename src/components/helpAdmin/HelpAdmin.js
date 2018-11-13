import React, {Component} from 'react';
import NavigationBar from '../NavigationBar';
import Header from '../Header';
import GettingStarted from './GettingStarted';
import GuideForServices from './GuideForServices';
import GuideForCollectionType from './GuideForCollectionType';
import GuideForParameters from './GuideForParameters';
import GuideForUsers from './GuideForUsers';
import GuideForProfile from './GuideForProfile';
import GuideForOrders from './GuideForOrders';
import GuideForPermissions from './GuideForPermissions';
import AuthorizedComponent from "../AuthorizedComponent";
import {isSuperAdmin} from "../../helper/userType";

class HelpAdmin extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Guide for Admin'}/>
                <div className="card card-body"
                     style={{marginLeft: "30px", marginRight: "30px", marginBottom: "30px", background: "#e4e4e4"}}>
                    <GettingStarted/>
                    <AuthorizedComponent permission={isSuperAdmin(this.props.user)}
                                         component={GuideForServices}/>
                    <AuthorizedComponent permission={isSuperAdmin(this.props.user)}
                                         component={GuideForUsers}/>
                    <GuideForOrders/>
                    <AuthorizedComponent permission={isSuperAdmin(this.props.user)}
                                         component={GuideForPermissions}/>
                    <GuideForCollectionType/>
                    <GuideForParameters/>
                    <GuideForProfile/>
                </div>
            </React.Fragment>
        );
    }
}

export default HelpAdmin;
