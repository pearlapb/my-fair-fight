import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class OngoingProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closeOngoingProject = this.closeOngoingProject.bind(this);
    }

    listOngoingProjects() {
        let projects = '';
        if (this.props.ongoingProjects) {
            if (this.props.ongoingProjects.length === 0) {
                this.setState({ noOngoingProjects: true })
            }
            projects = this.props.ongoingProjects.map((project) => {
                return (
                    <tr>
                        <th className="button-in-row" id={project.id} onClick={this.closeOngoingProject}>Close</th>
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

    closeOngoingProject(e) {
        let idToClose = Number(e.target.id);
        let projectId = {projectId: idToClose}
        axios.post('/closeOngoingProject', projectId).then((result) => {
            this.props.refreshProjectLists();
        })
    }

    render() {
        return (
            <div className="edit-projects-class">
                <h2>Ongoing Projects</h2>
                <table id="ongoing-projects-table" className="projects-table">
                    <tr className="first ongoing">
                        <th className="button-column"></th>
                        <th className="column-header">Country</th>
                        <th className="column-header">City</th>
                        <th className="column-header">School</th>
                        <th className="column-header">Teacher</th>
                    </tr>
                    {this.listOngoingProjects()}
                </table>
            </div>
        )
    }
}

export default OngoingProjects;
