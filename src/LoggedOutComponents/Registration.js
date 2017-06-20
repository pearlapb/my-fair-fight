import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import AgeOptions from './RegComponents/AgeOptions.js';
import UserTypeChecks from './RegComponents/UserTypeChecks.js';
import CountryOptions from './RegComponents/CountryOptions.js';
import CityOptions from './RegComponents/CityOptions.js';
import SchoolOptions from './RegComponents/SchoolOptions.js';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', username: '', pw: '', userType: '', age: '', country: '', city: '', school: '', isStudent: false, isTeacher: false, isFFmember: false };
        this.handleInput = this.handleInput.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.makeProjectSelections = this.makeProjectSelections.bind(this);
    }

    componentWillMount() {
        if (!this.state.countries && !this.state.cities && !this.state.school) {
            axios.get('/getAllOngoingProjectsForReg').then((result) => {
                const {countries, cities, schools} = result.data;
                this.setState({countries, cities, schools})
            })
        }
    }

    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCheckChange(e) {
        if (e.target.value == 'student') {
            if (e.target.checked) {
                this.setState({ isStudent: true, userType: e.target.value })
            } else {
                this.setState({ isStudent: false })
            }
        } else if (e.target.value == 'teacher') {
            if (e.target.checked) {
                this.setState({ isTeacher: true, userType: e.target.value })
            } else {
                this.setState({ isTeacher: false })
            }
        } else {
            this.setState({ isStudent: false, isTeacher: false, isFFmember: true, userType: e.target.value })
        }
    }

    handleRegistrationSubmit(e) {
        e.preventDefault();
        const {firstName, lastName, userName, pw, userType, age, country, city, school} = this.state;
        let newUserInfo;
        if (this.state.userType == 'student') {
            newUserInfo = { firstName, lastName, userName, pw, userType, age, country, city, school };
        } else if (this.state.userType == 'teacher') {
            newUserInfo = { firstName, lastName, userName, pw, userType, country };
        } else if (this.state.userType == 'FFmember') {
            newUserInfo = { firstName, lastName, userName, pw, userType };
        }
        this.registerNewUser(newUserInfo);
    }

    registerNewUser(newUserInfo) {
        for (var key in newUserInfo) {
            if (newUserInfo[key] == '') {
                this.setState({error: 'You need to fill in all the form!'});
                return;
            }
        }
        axios.post('/registerNewUser', newUserInfo).then((res) => {
            if (res.data.success) {
                location.href = '/';
                this.setState({ success: true })
            } else if (res.data.alreadyRegistered) {
                this.setState({ error: 'You already have an account with this email. Please Log in!' })
            } else {
                this.setState({ error: 'Something went wrong. Please try again' })
            }
        }).catch((err) => {
            console.log(err);
            this.setState({ error: 'Something went wrong. Please try again' })
        })
    }

    makeProjectSelections(selectionType, selectionArray) {
        selectionType = '';
        if (!selectionArray) {
            return null;
        } else {
            selectionType = selectionArray.map((item) => {
                return ( <option value={item}>{item}</option> )
            })
            return selectionType;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleRegistrationSubmit.bind(this)} className="reg-login-forms">

                {this.state.error && <div className="error"> {this.state.error}</div>}

                <p id="registration-form-intro">Register</p>

                <input onChange={this.handleInput} name="firstName" className="blue-background-style" placeholder="first name"/>
                <input onChange={this.handleInput} name="lastName" className="blue-background-style" placeholder="last name"/>
                <input onChange={this.handleInput} name="userName" className="blue-background-style" placeholder="username"/>
                <input onChange={this.handleInput} type="password" name="pw" className="blue-background-style" placeholder="password"/>

                <UserTypeChecks handleCheckChange={this.handleCheckChange}/>

                {this.state.isTeacher && <CountryOptions handleInput={this.handleInput}/> }

                {this.state.isStudent &&
                    <div id="student-selections">
                        <AgeOptions handleInput={this.handleInput}/>
                        <CountryOptions countries={this.state.countries} makeProjectSelections={this.makeProjectSelections} handleInput={this.handleInput}/>
                        <CityOptions cities={this.state.cities} makeProjectSelections={this.makeProjectSelections} handleInput={this.handleInput}/>
                        <SchoolOptions schools={this.state.schools} makeProjectSelections={this.makeProjectSelections} handleInput={this.handleInput}/>
                    </div>
                }

                <button className="white-oval">GO</button>

            </form>
        )
    }
}

export default Registration;
