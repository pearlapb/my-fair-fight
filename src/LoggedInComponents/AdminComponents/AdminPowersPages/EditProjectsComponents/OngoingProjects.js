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
            projects = this.props.ongoingProjects.map((project) => {
                return (<li>Country: {project.country}, City: {project.city}, School: {project.school}, Teacher: {project.teacher}  |  <Link name={project.id} onClick={this.closeOngoingProject}>Close Project</Link></li>)
            })
            return projects;
        }
        return null;
    }

    closeOngoingProject(e) {
        let projectId = {projectId: e.target.name}
        axios.post('/closeOngoingProject', projectId).then((result) => {
            this.props.refreshProjectLists();
        })
    }

    render() {
        return (
            <div>
                <h3>Ongoing Projects</h3>
                <ul>
                    {this.listOngoingProjects()}
                </ul>
            </div>
        )
    }
}

export default OngoingProjects;
