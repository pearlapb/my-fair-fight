import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class AchievementSender extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios.get('/getCountryOfUser').then((result) => {
            let country = result.data.country;
            axios.get('/getAllStudentsFromCountry', {
                params: {country: country}
            }).then((res) => {
                console.log(res.data.result);
            })
        })
    }

    render() {
        return (
            <div>
                <p>Achievement Sender</p>
            </div>
        )
    }
}

export default AchievementSender;
