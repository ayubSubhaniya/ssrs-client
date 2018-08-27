import React from "react";

const AuthorizedComponent = ({component: Component, ...rest, permission}) => (
    permission ? (
            <Component {...rest}/>
        ) :
        ''
);

export default AuthorizedComponent
