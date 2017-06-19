import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = { firstName: '', lastName: '', username: '', pw: '', userType: '', age: '', country: '', city: '', school: '', isStudent: false, isTeacher: false, isFFmember: false };
        this.handleInput = this.handleInput.bind(this);
        this.handleRegistrationSubmit = this.handleRegistrationSubmit.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleInput(e) {
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    };

    handleCheckChange(e) {
        console.log(e.target.name, e.target.value, e.target.checked);
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

    render() {
        return (
            <form onSubmit={this.handleRegistrationSubmit.bind(this)} className="reg-login-forms">

                {this.state.error && <div className="error"> {this.state.error}</div>}

                <p id="registration-form-intro">Register</p>

                    <input onChange={this.handleInput} name="firstName" className="blue-background-style" placeholder="first name"/>
                    <input onChange={this.handleInput} name="lastName" className="blue-background-style" placeholder="last name"/>
                    <input onChange={this.handleInput} name="userName" className="blue-background-style" placeholder="username"/>
                    <input onChange={this.handleInput} type="password" name="pw" className="blue-background-style" placeholder="password"/>

                <div id="user-type-checks">
                    <div>
                        <input type="checkbox" id="teacher" name="teacher" value="teacher" className="user-type-checkbox" onChange={this.handleCheckChange}/>
                        <label for="teacher">teacher</label>
                    </div>
                    <div>
                        <input type="checkbox" id="FFmember" name="FFmember" value="FFmember" className="user-type-checkbox" onChange={this.handleCheckChange}/>
                        <label for="FFmember">FFmember</label>
                    </div>
                    <div>
                        <input type="checkbox" id="student" name="student" value="student" className="user-type-checkbox" onChange={this.handleCheckChange}/>
                        <label for="student">student</label>
                    </div>
                </div>

                {this.state.isTeacher &&
                    <div>
                        <label for="country">Country</label>
                        <select name="country" onChange={this.handleInput} className="blue-background-style">
                            <option selected value="zimbabwe">Zimbabwe</option>
                            <option value="india">India</option>
                        </select>
                    </div>
                }

                {this.state.isStudent &&
                    <div id="student-selections">
                        <label for="country">Country</label>
                        <select name="country" onChange={this.handleInput} className="blue-background-style">
                            <option selected value="zimbabwe">Zimbabwe</option>
                            <option value="india">India</option>
                        </select>
                        <label for="city">City</label>
                        <select name="city" onChange={this.handleInput} className="blue-background-style">
                            <option selected value="marondera">Marondera</option>
                            <option value="varanasi">Varanasi</option>
                        </select>

                        <label for="school">School</label>
                        <select name="school" onChange={this.handleInput} className="blue-background-style">
                            <option selected value="nagleHouse">Nagle House</option>
                            <option value="otherHouse">Other House</option>
                            <option value="asha" selected>Asha</option>
                            <option value="disha" selected>Disha</option>
                        </select>

                        <label for="age">Age</label>
                        <select name="age" onChange={this.handleInput} className="blue-background-style">
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="24">24</option>
                        </select>

                    </div>
                }

                <button className="white-oval">GO</button>
            </form>
        )
    }
}

export default Registration;
