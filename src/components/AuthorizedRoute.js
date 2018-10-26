import {Route, Redirect} from "react-router-dom";
import React from "react";

const AuthorizedRoute = ({component: Component, ...rest, permission}) => (
    <Route
        {...rest}
        render={props =>
            permission ? (
                <Component {...props} {...rest}/>
            ) : (
               ''
            )
        }
    />
);

export default AuthorizedRoute
