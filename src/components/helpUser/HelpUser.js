import React, {PureComponent} from 'react';
import NavigationBar from '../NavigationBar';
import Header from '../Header';
import GettingUserStarted from './GettingUserStarted';
import GuideForOrders from './GuideForOrders';

class HelpUser extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Guide for User'}/>
                <div className="card card-body"
                     style={{marginLeft: "30px", marginRight: "30px", background: "#dcf8e8"}}>
                    <GettingUserStarted/>
                    <GuideForOrders/>
                </div>
            </React.Fragment>
        );
    }
}

export default HelpUser;
