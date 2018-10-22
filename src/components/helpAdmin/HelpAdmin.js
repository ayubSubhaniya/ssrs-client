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

class HelpAdmin extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Guide for Admin'}/>
                <div className="card card-body" style = {{marginLeft:"30px", marginRight:"30px", marginBottom:"30px", background:"#e4e4e4"}}>
                    <GettingStarted/>
                    <GuideForCollectionType/>
                    <GuideForParameters/>
                    <GuideForServices/>
                    <GuideForUsers/>
                    <GuideForProfile/>
                    <GuideForOrders/>
                    <GuideForPermissions/>
                </div>
            </React.Fragment>
        );
    }
}

export default HelpAdmin;