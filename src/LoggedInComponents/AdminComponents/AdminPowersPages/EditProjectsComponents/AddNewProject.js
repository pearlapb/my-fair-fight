import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class AddNewProject extends Component {
    constructor(props) {
        super(props);
        this.state = { country: '', city: '', school: '', teacher: '' };
        this.handleChange = this.handleChange.bind(this);
        this.saveNewProject = this.saveNewProject.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    saveNewProject() {
        const {country, city, school, teacher} = this.state;
        let projectInfo = {country, city, school, teacher}
        axios.post('/saveNewProject', projectInfo).then((result) => {
            this.props.refreshProjectLists();
        })
    }

    render() {
        return (
            <div className="edit-projects-class">
                <h2>Add new project:</h2>
                <div id="add-new-project">
                    <input onChange={this.handleChange} name="country" placeholder="Country"></input>
                    <input onChange={this.handleChange} name="city" placeholder="City"></input>
                    <input onChange={this.handleChange} name="school" placeholder="School"></input>
                    <input onChange={this.handleChange} name="teacher" placeholder="Teacher"></input>
                </div>
                <Link onClick={this.saveNewProject}>Save</Link>
            </div>
        )
    }
}

export default AddNewProject;
