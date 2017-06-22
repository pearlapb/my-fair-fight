import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import UploadProfilePic from '../UploadProfilePic.js';


class AdminProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showAdminActivity = this.showAdminActivity.bind(this);
    }

    componentDidMount() {
        axios.get('/getMyAdminActivity').then((res) => {
            let adminActivity = res.data.result.rows;
            this.setState({ adminActivity });
        })
    }

    showAdminActivity() {
        if (!this.state.adminActivity) {
            console.log('heyyy');
            return null;
        }
        if (this.state.adminActivity.length === 0) {
            return (
                <p>This admin has not changed anything yet</p>
            )
        }
        console.log('about to run showAdminActivity', this.state.adminActivity);
        let adminActivity = this.state.adminActivity.map((item) => {
            return (
                <tr>
                    <td>{item.activity_type}</td>
                    <td>{item.comments}</td>
                </tr>
            )
        })
        return (
            <table className="white-lines">
                <tr>
                    <th>Activity Type</th>
                    <th>Action</th>
                </tr>
                {adminActivity}
            </table>
        );
    }

    render() {

        return (
            <div id="admin-profile-component">
                <h1 className="page-heading">Profile</h1>
                <div id="profile-wrapper" className="admin-profile">
                    <div id="profile-picture-wrap">
                        <img src={this.props.profilePicUrl}/>
                        <UploadProfilePic setNewImage={this.props.setNewImage}/>
                    </div>
                    <h3>Last activity:</h3>
                    {this.showAdminActivity()}
                </div>
            </div>
        )
    }
}

export default AdminProfile;
