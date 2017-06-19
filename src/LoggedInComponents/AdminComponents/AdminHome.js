import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class AdminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div id="profile-summary">
                    <div id="photo">
                        <img src={this.props.profilePicUrl}/>
                        <div>
                            <h2>Hello, {this.props.firstName}!</h2>
                            <p>You're an admin</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome;
