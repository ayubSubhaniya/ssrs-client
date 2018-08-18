import React, {Component} from 'react';

import Header from "../Header";
import Tab from "./Tab";
import NavigationBar from "../NavigationBar";
import {fetch} from '../../helper/FetchData'

class Home extends Component {
    constructor() {
        super();
        this.fetch = fetch.bind(this);
        this.fetch("news");
        this.fetch("notification");
        this.state = {
            news: [],
            notification: []
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
