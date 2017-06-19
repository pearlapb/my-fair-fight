import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import ProgressBars from './ProgressBars.js';
import Timeline from './Timeline.js';
import AchievementSender from './AchievementSender.js';
import EncouragingSentence from './EncouragingSentence.js';

class HomeFeedPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.userType);
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
                    {this.props.isStudent && <ProgressBars />}
                </div>
                {this.props.isStudent && <Timeline />}
                {this.props.isTeacher && <AchievementSender />}
            </div>
        )
    }
}

export default HomeFeedPage;
