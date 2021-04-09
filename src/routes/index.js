import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import Dashboard from '../views/Dashboard';
import Home from '../views/Home';
import * as Middleware from '../middleware';
import * as Series from '../views/playlists/App';
import * as Lessons from '../views/lessons/App';
import Cart from '../views/orders/Cart';
import PaymentSuccess from '../views/orders/PaymentSuccess';

export default function index() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/series" component={Series.Index} />
                <Route exact path="/series/:slug" component={Series.Show} />
                <Route path="/series/:slug/:episode" component={Lessons.Show} />
                <Route path="/login">
                    <Middleware.Guest render={<Login/>} />
                </Route>
                <Route path="/register">
                    <Middleware.Guest render={<Register/>} />
                </Route>
                <Route path="/your-cart">
                    <Middleware.Authenticated render={<Cart/>} />
                </Route>
                <Route path="/your-payment-success">
                    <Middleware.Authenticated render={<PaymentSuccess />} />
                </Route>
                <Route path="/dashboard">
                    <Middleware.Authenticated render={<Dashboard/>} />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}
