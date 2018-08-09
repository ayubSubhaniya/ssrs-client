import React, { Component } from 'react';
import logo from '../images/daiict.png'
import Image from './Image'

import ServiceForm from './ServiceForm';
import NavigationBar from './NavigationBar';


class AddService extends Component {
    constructor(){
        super();
    }
    render() {
        return (
            <React.Fragment>
                <Image src={logo} className={'logo'}/>
                <NavigationBar />
                <ServiceForm />
            </React.Fragment>
        );
    }
}

export default AddService;
