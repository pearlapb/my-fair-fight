import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class NavBarUser extends Component {
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
            <div className="nav-bar with-border" id="nav-bar-LI">
                <Link to="/"><img src="/assets/logo/my-ff-grey.svg"/></Link>
                {this.state.showLargePopupMenu && <div id="large-popup-menu" className="new-blue">
                    <img id="nav-bar-cross" src="/assets/cross/cross-white.svg" onClick={this.showLargePopupMenu}/>
                    <ul>
                        <li><Link onClick={this.showLargePopupMenu} to="/">Home</Link></li>
                        <li><Link onClick={this.showLargePopupMenu} to="profile">My Profile</Link></li>
                        <li className="logout" onClick={this.handleLogout}>Logout <img src="/assets/exit.svg"/></li>
                    </ul>
                </div>}
                <img id="nav-bar-cross" src="/assets/cross/hamburgermenu.svg" onClick={this.showLargePopupMenu}/>
            </div>
        )
    }
}

export default NavBarUser;
