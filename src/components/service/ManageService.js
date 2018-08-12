import React, { Component } from 'react';
import Header from "../Header";
import ServiceList from "./ServiceList";


class ManageService extends Component {
    render() {
        return (
            <div>
                <Header title={'Manage Services'}/>
                <ServiceList/>
            </div>
        );
    }
}

export default ManageService;

