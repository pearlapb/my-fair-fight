import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class ManageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = { countryFilter: 'all' };
        this.makeUserList = this.makeUserList.bind(this);
        this.deleteUserFromDb = this.deleteUserFromDb.bind(this);
        this.handleCountryFilter = this.handleCountryFilter.bind(this);
    }

    componentDidMount() {
        this.refreshUserList();
    }

    handleCountryFilter(e) {
        this.setState({ countryFilter: e.target.value })
    }

    refreshUserList() {
        axios.get('/getAllUsers').then((result) => {
            let teachers = [], students = [], admins = [];
            result.data.result.map((user) => {
                if (user.user_type == 'teacher') {
                    teachers.push(user);
                } else if (user.user_type == 'student') {
                    students.push(user);
                } else {
                    if (user.id != this.props.userId)
                    admins.push(user);
                }
            })
            this.setState({ teachers, students, admins })
        })
    }

    deleteUserFromDb(e) {
        let idToDelete = {idToDelete: e.target.name}
        axios.post('/deleteUserFromDb', idToDelete).then((result) => {
            this.refreshUserList();
        })
    }

    makeUserList(userType, userTypeArray) {
        let userTypeList = '';
        if (!userTypeArray) {
            return null;
        }
        if (userTypeArray.length == 0) {
            return (
                <div className="user-type-list">
                    <p>No {userType == 'FFmember' ? 'other admins' : userType} </p>
                </div>
            );
        }
        userTypeList = userTypeArray.map((user) => {
            if (this.state.countryFilter == 'all' || this.state.countryFilter == user.country || user.user_type == 'FFmember') {
                return (
                    <div className="user-wrapper">
                        <h3 className="capitalize">{user.first_name} {user.last_name}</h3>
                        {user.user_type != 'FFmember' && <Link className="delete-user" name={user.id} onClick={this.deleteUserFromDb}>Delete</Link>}
                        <div className="user-info">
                            <img className="user-pic" src={user.profile_pic_url}/>
                            <ul>
                                {userType === 'student' && <li className="capitalize">Age: {user.age}</li>}
                                {userType !== 'FFmember' && <li className="capitalize">Country: {user.country}</li>}
                                {userType === 'student' && <li className="capitalize">City: {user.city}</li>}
                                {userType === 'student' && <li className="capitalize">School: {user.school}</li>}
                            </ul>
                        </div>
                    </div>
                )
            }
        })
        return (
            <div className="user-type-list">
                {userTypeList}
            </div>
        );
    }

    render() {
        return (
            <div id="manage-users">
                <h1 className="page-heading">Manage Users</h1>
                <h2>Admins</h2>
                {this.makeUserList('FFmember', this.state.admins)}
                <p>Show:</p>
                <select name="countryFilter" className="achievement-selector" onChange={this.handleCountryFilter}>
                    <option value="all">All</option>
                    <option value="zimbabwe">Zimbabwe</option>
                    <option value="india">India</option>
                </select>
                <div id="student-teachers">
                    <h2>Teachers</h2>
                    {this.makeUserList('teacher', this.state.teachers)}
                    <h2>Students</h2>
                    {this.makeUserList('student', this.state.students)}
                </div>
            </div>
        )
    }
}

export default ManageUsers;
