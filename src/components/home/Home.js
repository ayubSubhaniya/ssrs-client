import React, {Component} from 'react';

import Header from "../Header";
import Tab from "./Tab";
import NavigationBar from "../NavigationBar";
import {syncFetch} from '../../helper/FetchData'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            news: syncFetch('news'),
            notification: syncFetch('notification')
        }
    }

    render() {

        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Welcome to Student Service Request System'}/>
                <Tab news={this.state.news} notification={this.state.notification}/>
            </React.Fragment>
        );
    }
}

export default Home;
