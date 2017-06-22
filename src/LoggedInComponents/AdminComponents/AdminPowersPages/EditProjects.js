import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

import AddNewProject from './EditProjectsComponents/AddNewProject.js';
import OngoingProjects from './EditProjectsComponents/OngoingProjects.js';
import ClosedProjects from './EditProjectsComponents/ClosedProjects.js';

class EditProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.refreshProjectLists = this.refreshProjectLists.bind(this);
    }

    componentDidMount() {
        this.refreshProjectLists();
    }

    refreshProjectLists() {
        axios.get('/getAllProjects').then((result) => {
            let ongoingProjects = [], closedProjects = [], other = [];
            result.data.result.map((project) => {
                if (project.status == 'ongoing') {
                    ongoingProjects.push(project);
                } else if (project.status == 'closed') {
                    closedProjects.push(project);
                } else {
                    other.push(project);
                }
            })
            this.setState({ ongoingProjects, closedProjects })
        })
    }

    render() {
        return (
            <div id="edit-projects">
                <h1 className="page-heading">Edit Projects</h1>
                <AddNewProject ongoingProjects={this.state.ongoingProjects} closedProjects={this.state.closedProjects} refreshProjectLists={this.refreshProjectLists}/>
                <OngoingProjects ongoingProjects={this.state.ongoingProjects} closedProjects={this.state.closedProjects} refreshProjectLists={this.refreshProjectLists}/>
                <ClosedProjects ongoingProjects={this.state.ongoingProjects} closedProjects={this.state.closedProjects} refreshProjectLists={this.refreshProjectLists}/>
            </div>
        )
    }
}

export default EditProjects;
