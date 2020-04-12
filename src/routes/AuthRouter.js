import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { RouterPage } from '../Config';
import Authenticate from '../services/Authenticate';

export const AuthRouter = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        Authenticate.isAuth() ?
            <Component {...props} />                
            : <Redirect to={RouterPage.account.login} />
    )} />
);