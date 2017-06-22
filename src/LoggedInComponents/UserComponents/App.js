import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import NavBarUser from './NavBarUser.js';

class AdminApp extends Component {
    constructor(props) {
        super(props);
        this.state = { userId: '', userType: '', firstName: '', lastName: '', profilePicUrl: '', profileColor: '' };
        this.setNewImage = this.setNewImage.bind(this);
        this.setNewProfileBackground = this.setNewProfileBackground.bind(this);
        this.getRandomColor = this.getRandomColor.bind(this);
    }

    componentDidMount() {
        axios.get('/userProfileInfo').then((res) => {
            if (res.data.result.userType == 'student') {
                this.setState({ isStudent: true });
            } else {
                this.setState({ isTeacher: true });
            }
            const {userId, userType, userName, firstName, lastName, country, profilePicUrl, profileColor} = res.data.result;
            this.setState({ userId, userType, userName, firstName, lastName, country, profilePicUrl, profileColor });
        })
    }

    setNewImage(url) {
        this.setState({ profilePicUrl: url })
    }

    setNewProfileBackground() {
        let newBackground = { newColor: this.getRandomColor()};
        axios.post('/editProfileBackgroundColor', newBackground).then((result) => {
            this.setState({ profileColor: result.data.color });
        })
    }

    getRandomColor() {
        const backgrounds = [
            'bloody-mary',
            'rose-water',
            'lemon-twist',
            'emerald-water',
            'sunny-days',
            'playing-reds',
            'nimvelo',
            'purple-love',
            'old-blue',
            'holy',
        ];
        const getRandomNumber = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        let newColor = backgrounds[getRandomNumber(0, backgrounds.length)];
        return newColor;
    }

    render() {
        const {userId, userType, isStudent, isTeacher, userName, firstName, lastName, country, profilePicUrl, profileColor} = this.state;
        const children = React.cloneElement(this.props.children, {
            setNewImage: this.setNewImage, setNewProfileBackground: this.setNewProfileBackground, userId, userType, isStudent, isTeacher, userName, firstName, lastName, country, profilePicUrl, profileColor
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
