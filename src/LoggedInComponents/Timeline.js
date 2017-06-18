import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('/getAllAchievements').then((res) => {
            console.log('hey these are the achievements --> ', res.data.result);
            this.setState({ achievementsArray: res.data.result })
        })
    }

    render() {

        let achievements = '';
        if (this.state.achievementsArray) {
            achievements = this.state.achievementsArray.map((achievement) => {
                return (
                    <li className="timeline-event">
                        <div className="event-content">
                            <h3>You achieved a new {achievement.achievement_type}!</h3>
                            <p>Congratulations on receiving a {achievement.achievement_name} {achievement.achievement_type} badge!</p>
                            <span className="event-date">(add date when updated database)</span>
                        </div>
                    </li>
                )
            })
        }
        return (
            <section id="achievement-feed">
                <ul>
                    {achievements}
                </ul>
            </section>
        )
    }
}

export default Timeline;
