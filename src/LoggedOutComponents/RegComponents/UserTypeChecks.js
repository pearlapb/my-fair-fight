import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class UserTypeChecks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="user-type-checks">
                <div className="user-type">
                    <input type="checkbox" id="teacher" name="teacher" value="teacher" className="user-type-checkbox" onChange={this.props.handleCheckChange}/>
                    <label for="teacher">teacher</label>
                </div>
                <div className="user-type">
                    <input type="checkbox" id="FFmember" name="FFmember" value="FFmember" className="user-type-checkbox" onChange={this.props.handleCheckChange}/>
                    <label for="FFmember">FFmember</label>
                </div>
                <div className="user-type">
                    <input type="checkbox" id="student" name="student" value="student" className="user-type-checkbox" onChange={this.props.handleCheckChange}/>
                    <label for="student">student</label>
                </div>
            </div>
        )
    }
}


export default UserTypeChecks;
