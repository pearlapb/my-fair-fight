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
            const {userId, userType, userName, firstName, lastName, country, profilePicUrl} = res.data.result;
            this.setState({ userId, userType, userName, firstName, lastName, country, profilePicUrl });
            console.log(this.state);
        })
    }

    render() {
        const {userId, userType, isStudent, isTeacher, userName, firstName, lastName, country, profilePicUrl} = this.state;
        const children = React.cloneElement(this.props.children, {
            setNewImage: this.setNewImage, userId, userType, isStudent, isTeacher, userName, firstName, lastName, country, profilePicUrl
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
