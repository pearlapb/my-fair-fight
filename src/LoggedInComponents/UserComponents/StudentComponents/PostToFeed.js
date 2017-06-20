import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class PostToFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    sendNewPost(e) {
        e.preventDefault();
        var formData = new FormData();
        var file = $('input[type="file"]').get(0).files[0];
        if (file) {
            formData.append('file', file);
            var message = this.textInput.value;
            formData.append('message', message);
            axios.post('/uploadImageForFeed', formData).then((res) => {
                this.props.refreshFeed(res);
            })
        } else if (!file) {
            var message = { message: this.textInput.value};
            axios.post('/sendNewPostForFeed', message).then((res) => {
                this.props.refreshFeed(res);
            })
        }

    }

    render() {

        return (
            <form id="post-to-feed">
                <textarea ref={(message) => { this.textInput = message; }} placeholder="Write your post here"></textarea>
                <label htmlFor="choose-file">Upload a picture:</label>
                <div>
                    <input type="file" id="choose-image"/>
                    <button onClick={this.sendNewPost.bind(this)}>SEND</button>
                </div>
            </form>
        )
    }
}

export default PostToFeed;
