import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class NavBarLO extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="nav-bar" id="nav-bar-LO">
                <img src="/assets/logo/my-ff-white.svg"/>
                <Link id="login-reg-button" className="white-oval" onClick={this.props.toggleRegAndLogin}>{this.props.showReg ? 'Login' : 'Register'}</Link>
            </div>
        )
    }
}

export default NavBarLO;
