import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';

import Identification from './LoggedOutComponents/Identification.js';
import Login from './LoggedOutComponents/Login.js';
import Registration from './LoggedOutComponents/Registration.js';

import App from './LoggedInComponents/App.js';
import HomeFeedPage from './LoggedInComponents/HomeFeedPage.js';
import ProfilePage from './LoggedInComponents/ProfilePage.js';

const loggedOutRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={Identification}>
            <Route path="/login" component={Login}/>
            <IndexRoute component={Registration}/>
        </Route>
    </Router>
)

const loggedInRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/profile" component={ProfilePage}/>
            <IndexRoute component={HomeFeedPage}/>
        </Route>
    </Router>
)

let elem;
if (location.pathname == '/identification') { //change to lowercase
    elem = loggedOutRouter;
} else {
    elem = loggedInRouter;
}

ReactDOM.render(
    elem,
    document.getElementById('main')
);
