import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

function HomePageChoices(props) {
    return (
        <div id="home-page-links-wrapper">
            <Link className="home-page-links red" to="/admin/projects">Edit Projects</Link>
            <Link className="home-page-links purple" to="/admin/manage-users">Manage Users</Link>
            <Link className="home-page-links mustard" to="/admin/stats">See Project Stats</Link>
            <Link className="home-page-links green" to="/admin/user-profiles">See User Profiles</Link>
        </div>
    )
}

export default HomePageChoices
