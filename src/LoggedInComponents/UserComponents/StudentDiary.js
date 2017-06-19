import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class StudentDiary extends Component {
    constructor(props) {
        super(props);
        this.state = { behaviour: [], belt: [], kata: [], technique: [], showBehaviourBadges: false, showBeltsBadges: false, showKataBadges: false, showTechniqueBadges: false };
        this.showBadges = this.showBadges.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllAchievements').then((res) => {
            console.log(res.data.result);
            const { behaviour, belt, kata, technique } = this.state;
            res.data.result.map((badge) => {
                if (badge.achievement_type == "behaviour") {
                    behaviour.push(badge.achievement_name);
                } else if (badge.achievement_type == "belt") {
                    belt.push(badge.achievement_name);
                } else if (badge.achievement_type == "kata") {
                    kata.push(badge.achievement_name);
                } else if (badge.achievement_type == "technique") {
                    technique.push(badge.achievement_name);
                }
            })
            this.setState({ behaviour, belt, kata, technique })
        })
    }

    showBadges(e) {
        if (e.target.name == "behaviour") {
            this.setState({ showBehaviourBadges: !this.state.showBehaviourBadges, showBeltsBadges: false, showKataBadges: false, showTechniqueBadges: false })
        } else if (e.target.name == "belt") {
            this.setState({ showBeltsBadges: !this.state.showBeltsBadges, showBehaviourBadges: false, showKataBadges: false, showTechniqueBadges: false })
        } else if (e.target.name == "kata") {
            this.setState({ showKataBadges: !this.state.showKataBadges, showBehaviourBadges:false, showBeltsBadges: false, showTechniqueBadges: false })
        } else if (e.target.name == "technique") {
            this.setState({ showTechniqueBadges: !this.state.showTechniqueBadges, showBehaviourBadges: false, showBeltsBadges: false, showKataBadges: false })
        }
    }

    render() {

        let behaviour = '';
        if (this.state.behaviour) {
            behaviour = this.state.behaviour.map((badge) => {
                let badgeUrl = `/public/assets/badges/behaviour/${badge}.svg`;
                return (
                    <img className="badge" src={badgeUrl}/>
                )
            })
        }

        let belt = '';
        if (this.state.belt) {
            belt = this.state.belt.map((badge) => {
                let badgeUrl = `/public/assets/badges/belt/${badge}.svg`;
                return (
                    <img className="badge" src={badgeUrl}/>
                )
            })
        }

        let kata = '';
        if (this.state.kata) {
            kata = this.state.kata.map((badge) => {
                let badgeUrl = `/public/assets/badges/kata/${badge}.svg`;
                return (
                    <img className="badge" src={badgeUrl}/>
                )
            })
        }

        let technique = '';
        if (this.state.technique) {
            technique = this.state.technique.map((badge) => {
                let badgeUrl = `/public/assets/badges/technique/${badge}.svg`;
                return (
                    <img className="badge" src={badgeUrl}/>
                )
            })
        }

        return (
            <div id="student-diary">
                <h3>Student Diary</h3>
                <ul id="my-summary">
                    <li>Hello</li>
                    <li>Im</li>
                    <li>Cool</li>
                </ul>
                <div className="inline-buttons">
                    <button className="white badges" onClick={this.showBadges} name="behaviour">Behaviour Badges</button>
                    <button className="white badges" onClick={this.showBadges} name="belt">Belts Badges</button>
                    <button className="white badges" onClick={this.showBadges} name="kata">Kata Badges</button>
                    <button className="white badges" onClick={this.showBadges} name="technique">Technique Badges</button>
                </div>
                {this.state.showBehaviourBadges &&
                    <div className="badge-page">
                        {behaviour}
                    </div>
                }
                {this.state.showBeltsBadges &&
                    <div className="badge-page">
                        {belt}
                    </div>
                }
                {this.state.showKataBadges &&
                    <div className="badge-page">
                        {kata}
                    </div>
                }
                {this.state.showTechniqueBadges &&
                    <div className="badge-page">
                        {technique}
                    </div>
                }
            </div>
        )
    }
}

export default StudentDiary;
