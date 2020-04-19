import React from 'react';
import { Switch, Route } from "react-router-dom";
import { RouterPage } from '../Config';
import Login from '../modules/account/Login';
import Register from '../modules/account/Register';
import { AuthRouter } from './AuthRouter';
import Home from '../modules/dashboard/Dashboard';
import Product from '../modules/products/Product';
import ProductNew from '../modules/products/New';
import ProductEdit from '../modules/products/Edit';
import Location from '../modules/locations/Location';
import LocationNew from '../modules/locations/New';
import LocationEdit from '../modules/locations/Edit';
import Category from '../modules/categories/Category';
import CategoryNew from '../modules/categories/New';
import CategoryEdit from '../modules/categories/Edit';
import Setting from '../modules/company/Setting';
import Sales from '../modules/sales/New';

export const Routes = (
    <Switch>
        <Route exact path={RouterPage.account.login} component={Login} />
        <Route exact path={RouterPage.account.register} component={Register} />
        <AuthRouter exact path={RouterPage.home} component={Home}/>
        <AuthRouter exact path={RouterPage.products.index} component={Product}/>
        <AuthRouter exact path={RouterPage.products.new} component={ProductNew}/>
        <AuthRouter exact path={`${RouterPage.products.edit}:id`} component={ProductEdit}/>
        <AuthRouter exact path={RouterPage.locations.index} component={Location}/>
        <AuthRouter exact path={RouterPage.locations.new} component={LocationNew}/>
        <AuthRouter exact path={`${RouterPage.locations.edit}:id`} component={LocationEdit}/>
        <AuthRouter exact path={RouterPage.category.index} component={Category}/>
        <AuthRouter exact path={RouterPage.category.new} component={CategoryNew}/>
        <AuthRouter exact path={`${RouterPage.category.edit}:id`} component={CategoryEdit}/>
        <AuthRouter exact path={RouterPage.company.setting} component={Setting}/>
        <AuthRouter exact path={RouterPage.sales.new} component={Sales}/>
    </Switch>
);