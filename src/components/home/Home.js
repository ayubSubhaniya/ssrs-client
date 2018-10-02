import React, {Component} from 'react';

import Header from "../Header";
import Tab from "./Tab";
import NavigationBar from "../NavigationBar";
import {asyncFetch} from '../../helper/FetchData'
import Spinner from "../Spinner";
import UserList from '../user/UserList';
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";

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

    deleteNews = (index) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/news/' + this.state.news[index]._id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const news = that.state.news;
                that.setState({
                    news: [...news.slice(0,index),...news.slice(index+1)]
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
    };

    deleteNotification = (index) => {
        this.setState({
            showSpinner: true
        });
        console.log(this.state.notification);

        const that = this;
        const url = domainUrl + '/notification/' + this.state.notification[index]._id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const notification = that.state.notification;
                that.setState({
                    notification: [...notification.slice(0,index),...notification.slice(index+1)]
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
    };

    updateNews = (index, message) => {
        this.setState({
            showSpinner: true
        });

        const that = this;
        const url = domainUrl + '/news/' + this.state.news[index]._id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const news = that.state.news;
                that.setState({
                    news: [...news.slice(0,index),response.news,...news.slice(index+1)]
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify({message}));
    };

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Welcome to Student Service Request System'}/>
                <Tab user={this.props.user} news={this.state.news} deleteNews={this.deleteNews} updateNews={this.updateNews} notification={this.state.notification} deleteNotification={this.deleteNotification}/>
                <Spinner open={this.state.showSpinner}/>
            </React.Fragment>
        );
    }
}

export default Home;
