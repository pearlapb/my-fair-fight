import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';

import Identification from './LoggedOutComponents/Identification.js';
import Login from './LoggedOutComponents/Login.js';
import Registration from './LoggedOutComponents/Registration.js';

import App from './LoggedInComponents/UserComponents/App.js';
import HomeFeedPage from './LoggedInComponents/UserComponents/HomeFeedPage.js';
import ProfilePage from './LoggedInComponents/UserComponents/ProfilePage.js';

import AdminApp from './LoggedInComponents/AdminComponents/AdminApp.js';
import AdminHome from './LoggedInComponents/AdminComponents/AdminHome.js';
import AdminProfile from './LoggedInComponents/AdminComponents/AdminProfile.js';



const loggedOutRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Identification}>
            <Route path="/login" component={Login}/>
            <IndexRoute component={Registration}/>
        </Route>
    </Router>
)

const loggedInUserRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/profile" component={ProfilePage}/>
            <IndexRoute component={HomeFeedPage}/>
        </Route>
    </Router>
)

const loggedInAdminRouter = (
    <Router history={browserHistory}>
        <Route path="/admin" component={AdminApp}>
            <Route path="/admin/profile" component={AdminProfile}/>
            <IndexRoute component={AdminHome}/>
        </Route>
    </Router>
)

let elem;
if (location.pathname == '/identification') {
    elem = loggedOutRouter;
} else if (location.pathname == '/admin') {
    elem = loggedInAdminRouter;
} else {
    elem = loggedInUserRouter;
}

ReactDOM.render(
    elem,
    document.getElementById('main')
);
