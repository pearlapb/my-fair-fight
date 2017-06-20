import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class ClosedProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    listOngoingProjects() {
        let projects = '';
        if (this.props.closedProjects) {
            if (this.props.closedProjects.length === 0) {
                return (<p>No closed projects</p>)
            }
            projects = this.props.closedProjects.map((project) => {
                return (<li>Country: {project.country}, City: {project.city}, School: {project.school}, Teacher: {project.teacher}</li>)
            })
            return projects;
        }
        return null;
    }

    render() {
        return (
            <div>
                <h3>Closed Projects</h3>
                <ul>
                    {this.listOngoingProjects()}
                </ul>
            </div>
        )
    }
}

export default ClosedProjects;
