import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class AgeOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    makeAgeOptions(min, max) {
        let ageArray = [];
        for (var i = min; i < max; i++) {
            ageArray.push(i);
        }
        return ageArray.map((i) => {
            return <option key={i} value={i}>{i}</option>
        })
    }

    render() {
        return (
            <div className="selection-wrapper">
                <label for="age">Age</label>
                <select name="age" onChange={this.props.handleInput} className="blue-background-style">
                    <option value=""></option>
                    {this.makeAgeOptions(5, 90)}
                </select>
            </div>
        )
    }
}

export default AgeOptions;
