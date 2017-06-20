import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class ProgressBars extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.setState({
            progressMap: {
                belt: ["white", "yellow", "orange", "green", "blue", "brown", "black"],
                kata: ["first", "second", "third", "fourth", "fifth"],
            }
        })
    }

    makeProgressStages(progressType) {
        if (!this.state.progressMap) {
            return null;
        }
        let progressTypeArray = this.state.progressMap[progressType], progressStages = '';
        progressStages =  progressTypeArray.map((stage) => {
            let stageIndex = progressTypeArray.indexOf(stage);
            if (stageIndex == 0) {
                return <div id={stage} className="first-progress-point"></div>
            } else if (stageIndex == progressTypeArray.length - 1) {
                return <div id={stage} className="last-progress-point"></div>
            } else {
                return <div id={stage} className="progress-point"></div>
            }
        })
        return progressStages;

    }

    render() {
        return (
            <div id="progress-bars">
                <p>Belt Progress:</p>
                <div id="belts-progress" className="progress-bar">
                    {this.makeProgressStages('belt')}
                </div>
                <p>Kata Progress:</p>
                <div id="kata-progress" className="progress-bar">
                    {this.makeProgressStages('kata')}
                </div>
            </div>
        )
    }
}

export default ProgressBars;
