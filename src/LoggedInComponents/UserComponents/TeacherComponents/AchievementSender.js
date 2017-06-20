import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class AchievementSender extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedStudents: [], achievementType: '', achievementName: '' };
        this.handleStudentChoice = this.handleStudentChoice.bind(this);
        this.handleAchievementChoice = this.handleAchievementChoice.bind(this);
        this.sendAchievements = this.sendAchievements.bind(this);
    }

    componentDidMount() {
        axios.get('/getCountryOfUser').then((result) => {
            axios.get(`/getAllStudentsFromCountry?country=${result.data.country}`).then((res) => {
                this.setState({
                    students: res.data.result,
                    achievementMap: {
                        "behaviour": [
                            { value: "concentration", label: "Concentration" },
                            { value: "courage", label: "Courage" },
                            { value: "great-effort", label: "Great Effort" },
                            { value: "perseverance", label: "Perseverance" },
                            { value: "respect", label: "Respect" },
                            { value: "self-control", label: "Self-Control" },
                            { value: "discipline", label: "Discipline" }
                        ],
                        "attendence": [
                            { value: "1month", label: "1month" },
                            { value: "3months", label: "3months" },
                            { value: "6months", label: "6months" },
                            { value: "1year", label: "1year" },
                            { value: "2year", label: "2year" },
                            { value: "2year", label: "2year" },
                            { value: "2year", label: "2year" }
                        ],
                        "belt": [
                            { value: "white", label: "white" },
                            { value: "yellow", label: "yellow" },
                            { value: "orange", label: "orange" },
                            { value: "green", label: "green" },
                            { value: "blue", label: "blue" },
                            { value: "brown", label: "brown" },
                            { value: "black", label: "black" }
                        ],
                        "kata": [
                            { value: "first", label: "first" },
                            { value: "second", label: "second" },
                            { value: "third", label: "third" },
                            { value: "fourth", label: "fourth" },
                            { value: "fifth", label: "fifth" }
                        ],
                        "technique": [
                            { value: "miaygeri", label: "miaygeri" },
                            { value: "maywashigeri", label: "maywashigeri" },
                            { value: "uramawashigeri", label: "uramawashigeri" }
                        ],
                    }
                })
            }).then(() => {
                this.setState({ achievementType: this.achievementType.value })
            })
        })
    }

    getStudentList() {
        if (!this.state.students) {
            return null;
        } else {
            return (this.state.students.map((student) => {
                return (
                    <div className="student-summary">
                        <input type="checkbox" name={student.id} value={student.id} className="chosen-student" onChange={this.handleStudentChoice}/>
                        <img src={student.profile_pic_url}/>
                        <h3>{student.first_name}</h3>
                    </div>
                )
            }))
        }
    }

    getAchievementNameField() {
        if (!this.state.achievementType) {
            return null;
        }
        return (
            <select name="achievement-name" ref={(achievementName) => { this.achievementName = achievementName }} onChange={this.handleAchievementChoice}>
                {this.getAchievementNameOptions(this.state.achievementType)}
            </select>
        )
        this.setState({ achievementName: this.achievementName.value })
    }

    getAchievementNameOptions(achievementType) {
        if (!this.state.achievementMap[achievementType]) {
            return null;
        } else {
            return this.state.achievementMap[achievementType].map((el, i) => {
                return <option key={i} value={el.value}>{el.label}</option>
            })
        }
    }

    handleAchievementChoice(e) {
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
        }
        if (!e.target.checked) {
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

        return (
            <div id="student-feed">
                <h2>Send achievements to your students: </h2>
                <div id="achievement-choice">
                    <label for="achievement-type"></label>
                    <select name="achievement-type" ref={(achievementType) => { this.achievementType = achievementType }} onChange={this.handleAchievementChoice}>
                        <option value="behaviour">Behaviour</option>
                        <option value="attendence">attendence</option>
                        <option value="belt">Belt</option>
                        <option value="technique">Technique</option>
                        <option value="kata">Kata</option>
                    </select>
                    <label for="achievement-name"></label>
                    {this.getAchievementNameField()}
                </div>
                <div id="student-list">
                    {this.getStudentList()}
                </div>
                <button onClick={this.sendAchievements}>Send achievements!</button>
            </div>
        )
    }
}

export default AchievementSender;
