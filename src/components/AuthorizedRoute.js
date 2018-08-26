import {Route} from "react-router-dom";
import NotFound from "../errors/NotFound";
import React from "react";

const AuthorizedRoute = ({component: Component, ...rest, permission}) => (
    <Route
        {...rest}
        render={props =>
            permission ? (
                <Component {...props} {...rest}/>
            ) : (
                <NotFound/>
            )
        }
    />
);

export default AuthorizedRoute
