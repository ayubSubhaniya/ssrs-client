import React, {Component} from 'react';
import Header from "../Header";
import ServiceList from "./ServiceList";
import NavigationBar from "../NavigationBar";


class Services extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Header title={'Services'}/>
                <ServiceList {...this.props}/>
            </div>
        );
    }
}

export default Services;

