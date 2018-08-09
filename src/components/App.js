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

class App extends Component {
  render() {
   return (<Router>
        <div>
        <Route exact path="/" component={PublicHomePage}/>
        <Route path="/home" component={HomePage} />
        </div>
    </Router>)
  }
}

export default App;
