import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import NavBarUser from './NavBarUser.js';

class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = { userId: '', userType: '', firstName: '', lastName: '', profilePicUrl: '' };
        this.setNewImage = this.setNewImage.bind(this);
    }

    setNewImage(url) {
        this.setState({ profilePicUrl: url })
    }

    componentDidMount() {
        axios.get('/userProfileInfo').then((res) => {
            if (res.data.result.userType == 'student') {
                this.setState({ isStudent: true });
            } else {
                this.setState({ isTeacher: true });
            }
            console.log(res.data.result);
            const {userId, userType, userName, firstName, lastName, country, profilePicUrl, profileColor} = res.data.result;
            this.setState({ userId, userType, userName, firstName, lastName, country, profilePicUrl, profileColor });
            console.log(this.state);
        })
    }

    render() {
        const {userId, userType, isStudent, isTeacher, userName, firstName, lastName, country, profilePicUrl, profileColor} = this.state;
        const children = React.cloneElement(this.props.children, {
            setNewImage: this.setNewImage, userId, userType, isStudent, isTeacher, userName, firstName, lastName, country, profilePicUrl, profileColor
        });
        return (
            <div>
                <NavBarUser isStudent={this.state.isStudent} isTeacher={this.state.isTeacher}/>
                {children}
            </div>
        )
    }
}

export default AdminApp;
