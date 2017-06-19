import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import UploadProfilePic from '../UploadProfilePic.js';
import StudentDiary from './StudentDiary.js';
import StudentSummaries from './StudentSummaries.js';


class ProfilePage extends Component {
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
                {this.props.isStudent && <StudentDiary />}
                {this.props.isTeacher && <StudentSummaries />}
            </div>
        )
    }
}

export default ProfilePage;
