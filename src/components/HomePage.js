import React, { Component } from 'react';
import logo from '../images/daiict.png'
import Image from './Image'

import Home from './Home';
import ServiceForm from './ServiceForm';
import NavigationBar from './NavigationBar';


class HomePage extends Component {
    constructor(){
        super();
        this.fetchNews();
        this.fetchNotification();
    }
    fetchNews = () => {
        this.news = [
            {
                "_id": "5b642a78e1c4be4200725fd8",
                "message": "service modified again service modified again service modified again service modified again service modified again service modified againservice modified againservice modified againservice modified againservice modified againservice modified again",
                "createdOn": "2018-08-03T10:12:24.249Z"
            },
            {
                "_id": "5b6a8c889452ab251021c064",
                "message": "service addded",
                "createdOn": "2018-08-08T06:24:08.710Z"
            },
            {
                "_id": "5b6a8d2c9452ab251021c066",
                "message": "New service Transcript created",
                "createdOn": "2018-08-08T06:26:52.659Z"
            },
            {
                "_id": "5b6a90bd95f9504820057e8a",
                "message": "New service Gown created",
                "createdOn": "2018-08-08T06:42:05.488Z"
            },
            {
                "_id": "5b6a90c895f9504820057e8c",
                "message": "New service Transcript created",
                "createdOn": "2018-08-08T06:42:16.951Z"
            }
        ]
    }
    fetchNotification = () => {
        this.notification = [{
            _id: 23,
            message: 'first news',
            createdOn: new Date(),
            createdBy: 201501407
        }];
    }
    render() {
        return (
            <React.Fragment>
                <Image src={logo} className={'logo'}/>
                <NavigationBar />
               <Home news={this.news} notification={this.notification}/>
            </React.Fragment>
        );
    }
}

export default HomePage;
