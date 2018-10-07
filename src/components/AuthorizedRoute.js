import {Route} from "react-router-dom";
import NotFound from "../errors/NotFound";
import React from "react";
import PublicPage from "./public-page/PublicPage";

const AuthorizedRoute = ({component: Component, ...rest, permission}) => (
    <Route
        {...rest}
        render={props =>
            permission ? (
                <Component {...props} {...rest}/>
            ) : (
                <PublicPage/>
            )
        }
    />
);

export default AuthorizedRoute
