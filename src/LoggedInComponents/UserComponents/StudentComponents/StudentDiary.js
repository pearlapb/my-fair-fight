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
                    <button className="white badges" onClick={this.showBadges} name="technique">Technique Badges</button>
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
                {this.state.showTechniqueBadges &&
                    <div className="badge-page">
                        {this.makeBadgeListFor(this.state.technique, 'technique')}
                    </div>
                }
            </div>
        )
    }
}

export default StudentDiary;
