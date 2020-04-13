import React from 'react';
import { Switch, Route } from "react-router-dom";
import { RouterPage } from '../Config';
import Login from '../modules/account/Login';
import Register from '../modules/account/Register';
import { AuthRouter } from './AuthRouter';
import Home from '../modules/dashboard/Dashboard';
import Product from '../modules/products/Product';
import Location from '../modules/locations/Location';
import LocationNew from '../modules/locations/New';
import LocationEdit from '../modules/locations/Edit';

export const Routes = (
    <Switch>
        <Route exact path={RouterPage.account.login} component={Login} />
        <Route exact path={RouterPage.account.register} component={Register} />
        <AuthRouter exact path={RouterPage.home} component={Home}/>
        <AuthRouter exact path={RouterPage.products.index} component={Product}/>
        <AuthRouter exact path={RouterPage.locations.index} component={Location}/>
        <AuthRouter exact path={RouterPage.locations.new} component={LocationNew}/>
        <AuthRouter exact path={`${RouterPage.locations.edit}:id`} component={LocationEdit}/>
    </Switch>
);