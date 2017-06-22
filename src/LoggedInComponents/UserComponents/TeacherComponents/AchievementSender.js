import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import Modal from 'react-modal';

class AchievementSender extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedStudents: [], achievementType: '', achievementName: '', showSentMessage: false };
        this.handleStudentChoice = this.handleStudentChoice.bind(this);
        this.handleAchievementChoice = this.handleAchievementChoice.bind(this);
        this.sendAchievements = this.sendAchievements.bind(this);
        this.handleSentMessage = this.handleSentMessage.bind(this);
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
                            { value: "first", label: "First Karate Class" },
                            { value: "1month", label: "1 Month" },
                            { value: "3months", label: "3 Months" },
                            { value: "6months", label: "6 Months" },
                            { value: "1year", label: "1 Year" },
                            { value: "2years", label: "2 Years" },
                            { value: "3years", label: "3 Years" }
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
                            { value: "1", label: "First" },
                            { value: "2", label: "Second" },
                            { value: "3", label: "Third" },
                            { value: "4", label: "Fourth" },
                            { value: "5", label: "Fifth" }
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
                        <img src={student.profile_pic_url}/>
                        <div>
                            <input type="checkbox" id={student.id} name={student.id} value={student.id} className="chosen-student" onChange={this.handleStudentChoice}/>
                            <label for='{sudent.id}'>{student.first_name}</label>
                        </div>
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
            <select className="achievement-selector" name="achievement-name" ref={(achievementName) => { this.achievementName = achievementName }} onChange={this.handleAchievementChoice}>
                <option value=""></option>
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
            this.handleSentMessage();
        })
    }

    handleSentMessage() {
        this.setState({ showSentMessage: !this.state.showSentMessage })
    }

    render() {

        let customStyle = {
            overlay : {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content : {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '0px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }

        return (
            <div id="student-feed">
                <h2>Send achievements to your students: </h2>

                {this.state.showSentMessage &&
                    <Modal
                        isOpen='true'
                        contentLabel="achievement-sent"
                        style={customStyle}
                    >
                        <div id="achievement-modal">
                            <h1>Achievement sent!</h1>
                            <a onClick={this.handleSentMessage}>Cool!</a>
                        </div>
                    </Modal>
                }

                <div id="achievement-choice">

                    <div>
                        <label for="achievement-type">Achievement Type:</label>
                        <select className="achievement-selector" name="achievement-type" ref={(achievementType) => { this.achievementType = achievementType }} onChange={this.handleAchievementChoice}>
                            <option value="behaviour">Behaviour</option>
                            <option value="attendence">Attendence</option>
                            <option value="belt">Belt</option>
                            <option value="kata">Kata</option>
                        </select>
                    </div>

                    <div>
                    <label for="achievement-name">Achievement:</label>
                    {this.getAchievementNameField()}
                    </div>

                </div>

                <div id="student-list">
                    {this.getStudentList()}
                </div>

                <a onClick={this.sendAchievements}>Send achievements!</a>
            </div>
        )
    }
}

export default AchievementSender;

/*
{this.state.showSentMessage && <div id="sent-achievement-message"><button onClick={this.handleSentMessage}>X</button><p>Sent!</p></div>}
{this.state.showSentMessage && <div onClick={this.handleSentMessage} className="overlay"></div>}
*/
