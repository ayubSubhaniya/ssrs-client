import {Route, Redirect} from "react-router-dom";
import React from "react";

const AuthorizedRoute = ({component: Component, ...rest, permission}) => (
    <Route
        {...rest}
        render={props =>
            permission ? (
                <Component {...props} {...rest}/>
            ) : (
                <Redirect to="/"/>
            )
        }
    />
);

export default AuthorizedRoute
