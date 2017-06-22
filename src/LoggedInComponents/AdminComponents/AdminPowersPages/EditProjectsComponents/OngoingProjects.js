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
                        <td className="capitalize">{project.country}</td>
                        <td className="capitalize">{project.city}</td>
                        <td className="capitalize">{project.school}</td>
                        <td className="capitalize">{project.teacher}</td>
                        <td className="button-in-row" id={project.id} onClick={this.closeOngoingProject}>Close</td>
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
                        <th className="column-header">COUNTRY</th>
                        <th className="column-header">CITY</th>
                        <th className="column-header">SCHOOL</th>
                        <th className="column-header">TEACHER</th>
                        <th className="button-column red-text">Close?</th>
                    </tr>
                    {this.listOngoingProjects()}
                </table>
            </div>
        )
    }
}

export default OngoingProjects;
