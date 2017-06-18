import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 'userName':'', 'pw':'' };
        this.handleInput = this.handleInput.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    }

    handleInput(e) {
        this.setState( {[e.target.name]: e.target.value} );
    }

    handleLoginSubmit(e) {
        e.preventDefault();
        const userLoginInfo = {
            userName: this.state.userName,
            pw: this.state.pw
        }
        console.log(userLoginInfo);
        for (var key in userLoginInfo) {
            if (userLoginInfo[key] == '') {
                this.setState({error: 'You have to fill in the entire form.'})
                return;
            }
        }
        axios.post('/userLogin', userLoginInfo).then((res) => {
            if (res.data.success) {
                location.href = '/'; //change this to login!!
                this.setState({ success: true })
            } else {
                this.setState({ error: 'Something went wrong.' });
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ error: 'Something went wrong.' });
        })
    }
    render() {
        return (
            <form id="login-form" className="reg-login-forms" onSubmit={this.handleLoginSubmit}>
                {this.state.error && <div className="error"> {this.state.error}</div>}
                <p id="login-form-intro">Log in</p>
                <input onChange={this.handleInput} name="userName" className="blue-background-style" placeholder="username"/>
                <input onChange={this.handleInput} type="password" name="pw" className="blue-background-style" placeholder="password"/>
                <button type="submit" className="white-oval">GO</button>
            </form>
        )
    }
}


export default Login;
