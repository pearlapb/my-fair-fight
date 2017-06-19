import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import UploadProfilePic from '../UploadProfilePic.js';


class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="profile-wrapper">
                <p>Your profile</p>
                <div id="profile-picture-wrap">
                    <img src={this.props.profilePicUrl}/>
                    <UploadProfilePic setNewImage={this.props.setNewImage}/>
                </div>
            </div>
        )
    }
}

export default AdminProfile;
