import React from 'react';
import { Switch, Route } from "react-router-dom";
import { RouterPage } from '../Config';
import Login from '../modules/account/Login';
import Register from '../modules/account/Register';
import { AuthRouter } from './AuthRouter';
import Home from '../modules/dashboard/Dashboard';

export const Routes = (
    <Switch>
        <Route exact path={RouterPage.account.login} component={Login} />
        <Route exact path={RouterPage.account.register} component={Register} />
        <AuthRouter exact path={RouterPage.home} component={Home}/>
    </Switch>
);