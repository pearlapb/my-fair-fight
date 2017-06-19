import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import NavBarAdmin from './NavBarAdmin.js';

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
        console.log('hey');
        axios.get('/userProfileInfo').then((res) => {
            const {userId, userType, userName, firstName, lastName, profilePicUrl} = res.data.result;
            this.setState({ userId, userType, userName, firstName, lastName, profilePicUrl })
        })
    }

    render() {
        const {userId, userType, userName, firstName, lastName, profilePicUrl} = this.state;
        const children = React.cloneElement(this.props.children, {
            setNewImage: this.setNewImage, userId, userType, userName, firstName, lastName, profilePicUrl
        });
        return (
            <div>
                <NavBarAdmin />
                {children}
            </div>
        )
    }
}

export default App;
