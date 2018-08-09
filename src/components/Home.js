import React, { Component } from 'react';
import Header from './Header';
import Tab from '../components/Tab'

class Home extends Component {
  render() {
    return (
        <React.Fragment>
            <Header title={'Welcome to Student Service Request System'}/>
            <Tab news={this.props.news} notification={this.props.notification}/>
        </React.Fragment>
    );
  }
}

export default Home;
