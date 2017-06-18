import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import NavBarLO from './NavBarLO.js';
import Login from './Login.js';
import Registration from './Registration.js';

class Identification extends Component {
    constructor(props) {
        super(props);
        this.state = { showLogin: false, showReg: true };
        this.toggleRegAndLogin = this.toggleRegAndLogin.bind(this);
    }

    toggleRegAndLogin() {
        this.setState({ showLogin: !this.state.showLogin, showReg: !this.state.showReg });
    }

    render() {
        return (
            <div className="main-component new-blue ">
                <NavBarLO toggleRegAndLogin={this.toggleRegAndLogin} showLogin={this.state.showLogin} showReg={this.state.showReg}/>
                <div className="side-by-side-elements">
                    <img src="/public/assets/logo/bright-yellow-logo.svg"/>
                    {this.state.showReg && <Registration />}
                    {this.state.showLogin && <Login />}
                </div>
            </div>
        )
    }
}

export default Identification;
