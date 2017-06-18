import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import NavBarLI from './NavBarLI.js';

class App extends Component {
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
            this.setState({
                userId: res.data.result.userId,
                userType: res.data.result.userType,
                userName: res.data.result.userName,
                firstName: res.data.result.firstName,
                lastName: res.data.result.lastName,
                profilePicUrl: res.data.result.profilePicUrl,
            })
            console.log(this.state);
        })
    }

    render() {
        const children = React.cloneElement(this.props.children, {
            setNewImage: this.setNewImage,
            userId: this.state.userId,
            userType: this.state.userType,
            userName: this.state.userName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            profilePicUrl: this.state.profilePicUrl,
        });
        return (
            <div>
                <NavBarLI />
                {children}
            </div>
        )
    }
}

export default App;
