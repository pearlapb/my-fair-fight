import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class SchoolOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let schools = "schools";

        return (
            <div>
                <label for="school">School</label>
                <select name="school" onChange={this.props.handleInput} className="blue-background-style">
                    {this.props.makeProjectSelections('schools', this.props.schools)}
                </select>
            </div>
        )
    }
}


export default SchoolOptions;
