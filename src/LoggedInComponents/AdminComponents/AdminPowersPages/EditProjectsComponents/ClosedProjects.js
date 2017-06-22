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
                return (
                    <tr>
                        <th></th>
                        <th>{project.country}</th>
                        <th>{project.city}</th>
                        <th>{project.school}</th>
                        <th>{project.teacher}</th>
                    </tr>
                )
            })
            return projects;
        }
        return null;
    }

    render() {
        return (
            <div className="edit-projects-class">
                <h2>Closed Projects</h2>
                <table id="closed-projects-table" className="projects-table">
                    <tr className="first closed">
                        <th className="button-column"></th>
                        <th className="column-header" >Country</th>
                        <th className="column-header" >City</th>
                        <th className="column-header" >School</th>
                        <th className="column-header" >Teacher</th>
                    </tr>
                    {this.listOngoingProjects()}
                </table>
            </div>
        )
    }
}

export default ClosedProjects;
