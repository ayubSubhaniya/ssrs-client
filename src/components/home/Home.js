import React, {Component} from 'react';

import Header from "../Header";
import Tab from "./Tab";
import NavigationBar from "../NavigationBar";
import {asyncFetch} from '../../helper/FetchData'
import Spinner from "../Spinner";
import {domainUrl} from "../../config/configuration";
import * as HttpStatus from "http-status-codes";
import _ from "lodash"

class Home extends Component {
    constructor() {
        super();
        this.state = {
            news: [],
            notification: [],
            showSpinner: false
        };
        this.asyncFetch = asyncFetch.bind(this);
    }

    componentDidMount(){
        this.asyncFetch('news');
        this.asyncFetch('notification');
    }

    deleteNews = (id) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/news/' + id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                that.setState({
                    news: _.filter(that.state.news,(o)=>o._id!==id)
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
    };

    deleteNotification = (id) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/notification/' + id;
        const request = new XMLHttpRequest();
        request.open('DELETE', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                that.setState({
                    notification: _.filter(that.state.notification,(o)=>o._id!==id)
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send();
    };

    updateNews = (id, message) => {
        this.setState({
            showSpinner: true
        });
        const that = this;
        const url = domainUrl + '/news/' + id;
        const request = new XMLHttpRequest();
        request.open('PATCH', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const index = _.findIndex(that.state.news,(o) => o._id===id);
                const news = that.state.news;
                news[index] = response.news;
                that.setState({
                    news: news
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify({message}));
    };

    addNews = (message) => {
        console.log("add news");
        this.setState({
            showSpinner: true
        });

        const that = this;
        const url = domainUrl + '/news/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const news = that.state.news;
                that.setState({
                    news: that.state.news.push(news)
                })
            }
            that.setState({
                showSpinner: false
            })
        };
        request.send(JSON.stringify({message}));
    };

    addNews = (message) => {
        console.log("add news");
        this.setState({
            showSpinner: true
        });

        const that = this;
        const url = domainUrl + '/news/';
        const request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.withCredentials = true;
        request.setRequestHeader("Content-type", "application/json");
        request.onload = function () {
            if (this.status === HttpStatus.OK) {
                const response = JSON.parse(request.response);
                const news = that.state.news;
                that.setState({
                    news: that.state.news.push(news)
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
                <Tab user={this.props.user} news={this.state.news} addNews={this.addNews} deleteNews={this.deleteNews} updateNews={this.updateNews} notification={this.state.notification} deleteNotification={this.deleteNotification}/>
                <Spinner open={this.state.showSpinner}/>
            </React.Fragment>
        );
    }
}

export default Home;
