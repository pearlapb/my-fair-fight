import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class StudentDiary extends Component {
    constructor(props) {
        super(props);
        this.state = { behaviour: [], belt: [], kata: [], attendence: [], showBehaviourBadges: false, showBeltsBadges: false, showKataBadges: false, showAttendenceBadges: false };
        this.showBadges = this.showBadges.bind(this);
    }

    componentDidMount() {
        axios.get('/getAllAchievements').then((res) => {
            const { behaviour, belt, kata, attendence } = this.state;
            res.data.result.map((badge) => {
                if (badge.achievement_type == "behaviour") {
                    behaviour.push(badge.achievement_name);
                } else if (badge.achievement_type == "belt") {
                    belt.push(badge.achievement_name);
                } else if (badge.achievement_type == "kata") {
                    kata.push(badge.achievement_name);
                } else if (badge.achievement_type == "attendence") {
                    attendence.push(badge.achievement_name);
                }
            })
            this.setState({ behaviour, belt, kata, attendence })
        })
    }

    showBadges(e) {
        if (e.target.name == "behaviour") {
            this.setState({ showBehaviourBadges: !this.state.showBehaviourBadges, showBeltsBadges: false, showKataBadges: false, showAttendenceBadges: false })
        } else if (e.target.name == "belt") {
            this.setState({ showBeltsBadges: !this.state.showBeltsBadges, showBehaviourBadges: false, showKataBadges: false, showAttendenceBadges: false })
        } else if (e.target.name == "kata") {
            this.setState({ showKataBadges: !this.state.showKataBadges, showBehaviourBadges:false, showBeltsBadges: false, showAttendenceBadges: false })
        } else if (e.target.name == "attendence") {
            this.setState({ showAttendenceBadges: !this.state.showAttendenceBadges, showBehaviourBadges: false, showBeltsBadges: false, showKataBadges: false })
        }
    }

    makeBadgeListFor(badgeTypeState, badgeType) {
        if (!badgeTypeState) {
            return null;
        } else {
            if (badgeTypeState.length == 0) {
                return (
                    <p> No badges yet, but soon! </p>
                );
            } else {
                let badgeList = badgeTypeState.map((badge) => {
                    let badgeUrl = `/public/assets/badges/${badgeType}/${badge}.svg`;
                    return (
                        <img className="badge" src={badgeUrl}/>
                    )
                })
                return badgeList;
            }
        }
    }

    render() {

        return (
            <div id="student-diary">
                <h3>Student Diary</h3>
                <div className="inline-buttons">
                    <button className="white badges" onClick={this.showBadges} name="behaviour">Behaviour Badges</button>
                    <button className="white badges" onClick={this.showBadges} name="belt">Belts Badges</button>
                    <button className="white badges" onClick={this.showBadges} name="kata">Kata Badges</button>
                    <button className="white badges" onClick={this.showBadges} name="attendence">Attendence Badges</button>
                </div>
                {this.state.showBehaviourBadges &&
                    <div className="badge-page">
                        {this.makeBadgeListFor(this.state.behaviour, 'behaviour')}
                    </div>
                }
                {this.state.showBeltsBadges &&
                    <div className="badge-page">
                        {this.makeBadgeListFor(this.state.belt, 'belt')}
                    </div>
                }
                {this.state.showKataBadges &&
                    <div className="badge-page">
                        {this.makeBadgeListFor(this.state.kata, 'kata')}
                    </div>
                }
                {this.state.showAttendenceBadges &&
                    <div className="badge-page">
                        {this.makeBadgeListFor(this.state.attendence, 'attendence')}
                    </div>
                }
            </div>
        )
    }
}

export default StudentDiary;
