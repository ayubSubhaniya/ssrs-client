import React, { Component } from 'react';
import '../styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import PublicHomePage from './PublicHomePage';
import HomePage from './HomePage';
import AddService from './AddService';

class App extends Component {
  render() {
   return (<Router>
        <div>
        <Route exact path="/" component={PublicHomePage}/>
        <Route path="/home" component={HomePage} />
        <Route path="/addservice" component={AddService} />
        </div>
    </Router>)
  }
}

export default App;
