import React, {PureComponent} from 'react';
import Header from "../Header";
import ServiceList from "./ServiceList";
import NavigationBar from "../NavigationBar";


class Services extends PureComponent {
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

