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
            let stageIndex = progressTypeArray.indexOf(stage), newClass = '';
            var achieved = this.checkForProgressMade(stage) ? 'achieved' : '';
            var beltColor = progressType === 'belt' ? `${stage}` : '';
            if (stageIndex === 0) {
                newClass = `first-progress-point ${beltColor} ${achieved}`;
            } else if (stageIndex === progressTypeArray.length - 1) {
                newClass = `last-progress-point ${beltColor} ${achieved}`;
            } else {
                newClass = `progress-point ${beltColor} ${achieved}`;
            }
            return <div id={stage} className={newClass}></div>
        })
        return progressStages;

    }

    checkForProgressMade(stage) {
        if (this.props.achievementList) {
            let achieved = false;
            this.props.achievementList.map((achievement) => {
                if (stage == achievement.achievement_name) {
                    return achieved = true;
                }
            });
            return achieved;
        } else {
            return null;
        }
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
