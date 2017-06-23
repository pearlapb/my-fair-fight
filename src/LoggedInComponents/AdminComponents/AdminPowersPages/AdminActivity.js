import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class AdminActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showAdminActivity = this.showAdminActivity.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllAdminActivity').then((res) => {
            let adminActivity = res.data.result;
            this.setState({ adminActivity });
        })
    }

    showAdminActivity() {
        if (!this.state.adminActivity) {
            return null;
        }
        if (this.state.adminActivity.length === 0) {
            return (
                <p>Nothing has been done yet</p>
            )
        }
        let adminActivity = this.state.adminActivity.map((item) => {
            return (
                <tr>
                    <td>{item.admin_id}</td>
                    <td>{item.activity_type}</td>
                    <td>{item.comments}</td>
                </tr>
            )
        })
        return (
            <table id="all-admin-activity" className="white-lines">
                <tr>
                    <th>Admin Id</th>
                    <th>Activity Type</th>
                    <th>Action</th>
                </tr>
                {adminActivity}
            </table>
        );
    }

    render() {
        return (
            <div id="admin-activity-component">
                <h1 className="page-heading">All Admin Activity</h1>
                    {this.showAdminActivity()}
            </div>
        )
    }
}

export default AdminActivity;
