import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class ProgressBars extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="progress-bars">
                <p>Belt Progress:</p>
                <div id="belts-progress" className="progress-bar">
                    <div id="yellow-belt" className="first-progress-point achieved"></div>
                    <div id="orange-belt" className="progress-point"></div>
                    <div id="green-belt" className="progress-point"></div>
                    <div id="blue-belt" className="progress-point"></div>
                    <div id="brown-belt" className="last-progress-point"></div>
                </div>
                <p>Kata Progress:</p>
                <div id="kata-progress" className="progress-bar">
                    <div id="1-kata" className="first-progress-point achieved"></div>
                    <div id="2-kata" className="progress-point"></div>
                    <div id="3-kata" className="progress-point"></div>
                    <div id="4-kata" className="progress-point"></div>
                    <div id="5-kata" className="last-progress-point"></div>
                </div>
                <div id="kicking-progress"></div>
                <div id="sparing-progress"></div>
            </div>
        )
    }
}

export default ProgressBars;
