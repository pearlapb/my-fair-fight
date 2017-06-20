import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class SchoolOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <label for="school">School</label>
                <select name="school" onChange={this.props.handleInput} className="blue-background-style">
                    <option selected value="nagleHouse">Nagle House</option>
                    <option value="otherHouse">Other House</option>
                    <option value="asha" selected>Asha</option>
                    <option value="disha" selected>Disha</option>
                </select>
            </div>
        )
    }
}


export default SchoolOptions;
