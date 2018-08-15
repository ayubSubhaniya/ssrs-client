import React, {Component} from 'react';
import {domainUrl} from '../config/configuration'

import Header from "./Header";
import Tab from "./home/Tab";
import * as HttpStatus from 'http-status-codes'
import NavigationBar from "./NavigationBar";


class HomePage extends Component {
    constructor() {
        super();
        this.fetchNews();
        this.fetchNotification();
        this.state = {
            news: [],
            notification: []
        }
    }

    fetchNews = () => {
        const that = this;
        const url = domainUrl + '/news'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                try {
                    const obj = JSON.parse(request.responseText);
                    that.setState({
                        news: obj.news
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            ;
        };
        request.send();
    }

    fetchNotification = () => {
        const that = this;
        const url = domainUrl + '/notification'
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.withCredentials = true;
        request.onload = function () {
            if (this.status == HttpStatus.ACCEPTED) {
                try {
                    const obj = JSON.parse(request.responseText);
                    that.setState({
                        notification: obj.notification
                    })
                } catch (e) {
                    console.error(e);
                }
            }
            ;
        };
        request.send();
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

export default HomePage;
