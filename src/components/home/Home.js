import React, {PureComponent} from 'react';

import Header from "../Header";
import Tab from "./Tab";
import NavigationBar from "../NavigationBar";
import _ from "lodash"
import {makeCall} from "../../helper/caller";
import {handleError} from "../../helper/error";

class Home extends PureComponent {
    constructor() {
        super();
        this.state = {
            news: [],
            notification: [],
            isTourOpen: false
        };
    }

    componentDidMount() {
        this.getNews();
        this.getNotification()
    }

    getNews = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/news'
        })
            .then((response) => {
                this.setState({
                    news: response.news
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    getNotification = () => {
        makeCall({
            jobType: 'GET',
            urlParams: '/notification'
        })
            .then((response) => {
                this.setState({
                    notification: response.notification
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }


    deleteNews = (index) => {
        makeCall({
            jobType: 'DELETE',
            urlParams: '/news/' + this.state.news[index]._id
        })
            .then(() => {
                this.setState({
                    news: [...this.state.news.slice(0, index), ...this.state.news.slice(index + 1)]

                })

            })
            .catch((error) => {
                handleError(error);
            })
    };

    deleteNotification = (index) => {
        makeCall({
            jobType: 'DELETE',
            urlParams: '/notification/' + this.state.notification[index]._id
        })
            .then(() => {
                this.setState({
                    notification: [...this.state.notification.slice(0, index), ...this.state.notification.slice(index + 1)]
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

    updateNews = (id, message) => {
        makeCall({
            jobType: 'PATCH',
            urlParams: '/news/' + id,
            params: {
                message: message
            }
        })
            .then((response) => {
                const index = _.findIndex(this.state.news, (o) => o._id === id);
                const news = this.state.news;
                news[index] = response.news;
                this.setState({
                    news: news
                })
            })
            .catch((error) => {
                handleError(error);
            })
    };

    addNews = (message) => {
        makeCall({
            jobType: 'POST',
            urlParams: '/news',
            params: {
                message: message
            }
        })
            .then((response) => {
                this.setState({
                    news: [...this.state.news, response.news]
                })
            })
            .catch((error) => {
                handleError(error);
            })
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header title={'Welcome to Student Service Request System'}/>
                <Tab user={this.props.user}
                     news={this.state.news}
                     addNews={this.addNews}
                     deleteNews={this.deleteNews}
                     updateNews={this.updateNews}
                     notification={this.state.notification}
                     deleteNotification={this.deleteNotification}/>

            </React.Fragment>
        );
    }
}

export default Home;
