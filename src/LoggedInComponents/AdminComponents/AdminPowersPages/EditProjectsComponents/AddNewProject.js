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
            <div>
                <input onChange={this.handleChange} name="country" placeholder="Country"></input>
                <input onChange={this.handleChange} name="city" placeholder="City"></input>
                <input onChange={this.handleChange} name="school" placeholder="School"></input>
                <input onChange={this.handleChange} name="teacher" placeholder="Teacher"></input>
                <button onClick={this.saveNewProject}>Save</button>
            </div>
        )
    }
}

export default AddNewProject;
