import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class CityOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        let cities = "cities";

        return (
            <div>
                <label for="city">City</label>
                <select name="city" onChange={this.props.handleInput} className="blue-background-style">
                    {this.props.makeProjectSelections('cities', this.props.cities)}
                </select>
            </div>
        )
    }
}


export default CityOptions;
