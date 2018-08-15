import React, { Component } from 'react';
import Header from "../Header";
import ServiceList from "./ServiceList";
import NavigationBar from "../NavigationBar";


class ManageService extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Manage Services'}/>
                <ServiceList/>
            </div>
        );
    }
}

export default ManageService;

