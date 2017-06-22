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
                        <td className="capitalize">{project.country}</td>
                        <td className="capitalize">{project.city}</td>
                        <td className="capitalize">{project.school}</td>
                        <td className="capitalize">{project.teacher}</td>
                        <td></td>
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
                        <th className="column-header" >COUNTRY</th>
                        <th className="column-header" >CITY</th>
                        <th className="column-header" >SCHOOL</th>
                        <th className="column-header" >TEACHER</th>
                        <th className="button-column"></th>
                    </tr>
                    {this.listOngoingProjects()}
                </table>
            </div>
        )
    }
}

export default ClosedProjects;
