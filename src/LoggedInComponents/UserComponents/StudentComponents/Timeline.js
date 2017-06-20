import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';
import PostToFeed from './PostToFeed.js';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let feedContent = '';
        if (this.props.feedContent) {
            feedContent = this.props.feedContent.map((item) => {
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
                <PostToFeed refreshFeed={this.props.refreshFeed} feedContent={this.props.feedContent}/>
                <ul>
                    {feedContent}
                </ul>
            </section>
        )
    }
}

export default Timeline;
