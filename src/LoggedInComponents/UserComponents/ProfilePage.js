import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import UploadProfilePic from '../UploadProfilePic.js';
import StudentDiary from './StudentComponents/StudentDiary.js';
import StudentSummaries from './TeacherComponents/StudentSummaries.js';


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="profile-wrapper" className={this.props.profileColor}>
                <img id="edit" src="/public/assets/edit.png" onClick={this.props.setNewProfileBackground}/>
                <h2>My Profile</h2>
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
