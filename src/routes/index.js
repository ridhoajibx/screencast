import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import * as Middleware from '../middleware';

export default function index() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login">
                    <Middleware.Guest render={<Login/>} />
                </Route>
                <Route path="/register">
                    <Middleware.Guest render={<Register/>} />
                </Route>
                <Route path="/dashboard">
                    <Middleware.Authenticated render={<Dashboard/>} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
