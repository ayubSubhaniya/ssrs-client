import React, {Component} from 'react';

import Header from "../Header";
import Tab from "./Tab";
import NavigationBar from "../NavigationBar";
import {asyncFetch} from '../../helper/FetchData'
import Spinner from "../Spinner";
import UserList from '../UserList';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            notification: [],
            showSpinner: false
        }
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch('news');
        this.asyncFetch('notification');
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Welcome to Student Service Request System'}/>
                <Tab news={this.state.news} notification={this.state.notification}/>
                <Spinner open={this.state.showSpinner}/>
            </React.Fragment>
        );
    }
}

export default Home;
