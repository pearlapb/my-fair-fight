import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import PostToFeed from './PostToFeed.js';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.refreshFeed = this.refreshFeed.bind(this);
    }

    componentDidMount() {
        let feedContent = [];
        axios.get('/getAllAchievements').then((achievements) => {
            achievements.data.result.map((achievement) => {
                feedContent.push(achievement)
            })
            axios.get('/getAllStudentFeed').then((feed) => {
                feed.data.result.map((post) => {
                    feedContent.push(post)
                })
                // ORDER ARRAY BY DATE!!
                console.log('this is the feed content', feedContent);
                this.setState({ feedContent: feedContent })
            })
        });
    }

    refreshFeed(newFeed) {
        this.setState({ fullFeed: newFeed });
    }

    render() {

        let feedContent = '';
        if (this.state.feedContent) {
            feedContent = this.state.feedContent.map((item) => {
                let imageUrl, sentence, message;
                if (item.achievement_type) {
                    imageUrl = `/public/assets/badges/${item.achievement_type}/${item.achievement_name}.svg`;
                    sentence = `You achieved a new ${item.achievement_type}!`;
                    message = `Congratulations on receiving a ${item.achievement_name} ${item.achievement_type} badge!`;
                } else {
                    imageUrl = item.photo;
                    sentence = `You posted to your timeline:`;
                    if (item.message) {
                        message = `${item.message}`;
                    } else {
                        message = `No description`;
                    }
                }
                return (
                    <li className="timeline-event">
                        <img className="event-logo" src={imageUrl}/>
                        <div className="event-content">
                            <h3>{sentence}</h3>
                            <p>{message}</p>
                            <span className="event-date">{item.created_at}</span>
                        </div>
                    </li>
                )
            })
        }
        return (
            <section id="achievement-feed">
                <PostToFeed refreshFeed={this.refreshFeed}/>
                <ul>
                    {feedContent}
                </ul>
            </section>
        )
    }
}

export default Timeline;
