import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, auth,  ...rest}) => {
    console.log(auth)
    return (
        <Route {...rest} render={props => (auth ? <Component {...props} /> : <Redirect to="/" /> )} />
    );
}

export default PrivateRoute;
