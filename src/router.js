import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './pages/app';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import Detail from './pages/detail';

export default function AppRouter() {
    return <Router>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/detail/:id" component={Detail}></Route>
            <Route path="*" component={NotFound}></Route>
        </Switch>
    </Router>
}