import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './pages/app';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import NotFound from './pages/NotFound';

export default function AppRouter() {
    return <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="*" component={NotFound} />
        </Switch>
    </Router>
}