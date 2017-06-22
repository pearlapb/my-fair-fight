import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

import ProgressBars from './StudentComponents/ProgressBars.js';
import Timeline from './StudentComponents/Timeline.js';
import EncouragingSentence from './StudentComponents/EncouragingSentence.js';

import AchievementSender from './TeacherComponents/AchievementSender.js';


class HomeFeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getStudentFeed = this.getStudentFeed.bind(this);
        this.refreshFeed = this.refreshFeed.bind(this);
    }

    componentDidMount() {
        this.getStudentFeed();
    }

    getStudentFeed() {
        let feedContent = [], achievementList = [];
        axios.get('/getAllAchievements').then((achievements) => {
            achievements.data.result.map((achievement) => {
                feedContent.push(achievement);
                achievementList.push(achievement)
            })
            axios.get('/getAllStudentFeed').then((feed) => {
                feed.data.result.map((post) => {
                    feedContent.push(post)
                })
                feedContent.sort((a, b) => {
                    return a.created_at - b.created_at;
                })
                this.setState({ feedContent, achievementList })
            })
        });
    }

    refreshFeed() {
        this.getStudentFeed();
    }

    render() {
        return (
            <div>
                <div id="profile-summary">
                    <div id="photo">
                        <img src={this.props.profilePicUrl}/>
                        <div>
                            <h2>Hello, {this.props.firstName}!</h2>
                            {this.props.isStudent && <EncouragingSentence />}
                        </div>
                    </div>
                    {this.props.isStudent && <ProgressBars achievementList={this.state.achievementList}/>}
                </div>
                {this.props.isStudent && <h1 className="page-heading ribbon">Your Timeline:</h1>}
                {this.props.isStudent && <Timeline feedContent={this.state.feedContent} refreshFeed={this.refreshFeed}/>}
                {this.props.isTeacher && <AchievementSender />}
            </div>
        )
    }
}

export default HomeFeedPage;
