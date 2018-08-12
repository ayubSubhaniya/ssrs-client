import React, {Component} from 'react';
import '../styles/App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import PublicHomePage from './public-page/PublicHomePage';
import HomePage from './HomePage';
import Image from "./Image";
import logo from "../images/daiict.png";
import NavigationBar from "./NavigationBar";
import ManageService from "./service/ManageService";
import ServiceForm from "./service/ServiceForm";
import {getCookie,setCookie,checkCookie} from "../cookies";



export const authentication = {
    isAuthenticated:checkCookie(),
    authenticate() {
        this.isAuthenticated = true;
    },
    signout() {
        this.isAuthenticated = false;
    }
}
console.log(document.cookie)
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Main />
                    <PrivateRoute path="/" component={HomePage}/>
                    <PrivateRoute exact path="/service" component={ManageService}/>
                    <PrivateRoute exact path="/service/add" component={() => <ServiceForm title={'Add Service'} />}/>
                    <PrivateRoute exact path="/service/edit" component={() => <ServiceForm title={'Edit Service'} />}/>
                </div>
            </Router>
        )
    }
}

export default App;


const Main =
    () =>
        authentication.isAuthenticated ? (
            <React.Fragment>
                <Image src={logo} className={'logo'} />
                <NavigationBar />
            </React.Fragment>
        ) : (
            <PublicHomePage />
        );

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            authentication.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: {from: props.location}
                    }}
                />
            )
        }
    />
);

