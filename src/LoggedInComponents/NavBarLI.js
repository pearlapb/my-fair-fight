import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class NavBarLI extends Component {
    constructor(props) {
        super(props);
        this.state = { showLargePopupMenu: false };
        this.showLargePopupMenu = this.showLargePopupMenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    showLargePopupMenu() {
        this.setState({ showLargePopupMenu: !this.state.showLargePopupMenu });
    }

    handleLogout(e) {
        e.preventDefault();
        axios.get('/userLogout').then((res) => {
            location.href='/';
        });
    }

    render() {
        return (
            <div className="nav-bar" id="nav-bar-LI">
                <Link to="/"><img src="/public/assets/logo/my-ff-grey.svg"/></Link>
                {this.state.showLargePopupMenu && <div id="large-popup-menu" className="new-blue">
                    <img id="nav-bar-cross" src="/public/assets/cross/cross-white.svg" onClick={this.showLargePopupMenu}/>
                    <ul>
                        <li onClick={this.handleLogout}>Logout</li>
                        <li><Link to="/">Home</Link></li>
                        <li><Link onClick={this.showLargeMenu} to="profile">My Profile</Link></li>
                    </ul>
                </div>}
                <img id="nav-bar-cross" src="/public/assets/cross/cross-blue.svg" onClick={this.showLargePopupMenu}/>
            </div>
        )
    }
}

export default NavBarLI;
