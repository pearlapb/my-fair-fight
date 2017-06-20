import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

import HomePageChoices from './HomePageComponents/HomePageChoices.js';

import EditProjects from './AdminPowersPages/EditProjects.js';
import ManageUsers from './AdminPowersPages/ManageUsers.js';
import ProjectStats from './AdminPowersPages/ProjectStats.js';
import UserProfiles from './AdminPowersPages/UserProfiles.js';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div id="admin-welcome-picture">
                    <img src={this.props.profilePicUrl}/>
                    <h2>Hello, {this.props.firstName}!</h2>
                    <p>What are you doing today?</p>
                </div>
                <HomePageChoices />
            </div>
        )
    }
}

export default AdminHome;
