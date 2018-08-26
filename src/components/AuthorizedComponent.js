import {Route} from "react-router-dom";
import React from "react";

const AuthorizedComponent = ({component: Component, ...rest, permission}) => (
    <Route
        {...rest}
        render={props =>
            permission ? (
                    <Component {...props} {...rest}/>
                ) :
                ''

        }
    />
);

export default AuthorizedComponent
