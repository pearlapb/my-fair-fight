import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class AchievementSender extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedStudents: [], achievementType: '', achievementName: '' };
        this.handleStudentChoice = this.handleStudentChoice.bind(this);
        this.handleAchivementChoice = this.handleAchivementChoice.bind(this);
        this.sendAchievements = this.sendAchievements.bind(this);
    }

    componentDidMount() {
        axios.get('/getCountryOfUser').then((result) => {
            axios.get('/getAllStudentsFromCountry', {
                params: {country: result.data.country}
            }).then((res) => {
                this.setState({ students: res.data.result })
            })
        })
    }

    handleAchivementChoice(e) {
        if (e.target.name == 'achievement-type') {
            this.setState({ achievementType: e.target.value });
        } else if (e.target.name == 'achievement-name') {
            this.setState({ achievementName: e.target.value });
        }
    }

    handleStudentChoice(e) {
        let newArray = this.state.selectedStudents;
        if (e.target.checked) {
            if (newArray.indexOf(Number(e.target.name)) < 0) {
                newArray.push(Number(e.target.name));
            }
        } if (!e.target.checked) {
            newArray = newArray.filter((id) => {
                return id != Number(e.target.name);
            })
        }
        this.setState({ selectedStudents: newArray })
    }

    sendAchievements() {
        const { selectedStudents, achievementType, achievementName } = this.state;
        let sendingInfo = { selectedStudents, achievementType, achievementName }
        axios.post('/giveAchievementToStudents', sendingInfo).then((res) => {
            console.log(res);
        })
    }

    render() {

        let students = '';
        if (this.state.students) {
            students = this.state.students.map((student) => {
                return (
                    <div className="student-summary">
                        <input type="checkbox" name={student.id} value={student.id} className="chosen-student" onChange={this.handleStudentChoice}/>
                        <img src={student.profile_pic_url}/>
                        <h3>{student.first_name}</h3>
                    </div>
                )
            })
        }
        return (
            <div id="student-feed">
                <h2>Send achievements to your students: </h2>
                <div id="achievement-choice">
                    <label for="achievement-type"></label>
                    <select name="achievement-type" onChange={this.handleAchivementChoice}>
                        <option value="behaviour">Behaviour</option>
                        <option value="belt">Belt</option>
                        <option value="technique">Technique</option>
                        <option value="kata">Kata</option>
                    </select>
                    <label for="achievement-name"></label>
                    <select name="achievement-name" onChange={this.handleAchivementChoice}>
                        <option value="courage">Courage</option>
                        <option value="effort">Great effort</option>
                        <option value="respect">Respect</option>
                        <option value="discipline">Discipline</option>
                    </select>
                </div>
                <div id="student-list">
                    {students}
                </div>
                <button onClick={this.sendAchievements}>Send achievements!</button>
            </div>
        )
    }
}

export default AchievementSender;
