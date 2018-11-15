import {Redirect, Route, withRouter} from "react-router-dom";
import React from "react";

const AuthorizedRoute = ({component: Component, ...rest, permission}) => {
    return (<Route
        {...rest}
        render={props =>
            permission ? (
                <Component {...props} {...rest}/>
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: rest.location.pathname
                }}/>
            )
        }
    />)
}

export default withRouter(AuthorizedRoute)
