import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class CountryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        return (
            <div>
                <label for="country">Country</label>
                <select name="country" onChange={this.props.handleInput} className="blue-background-style">
                    {this.props.makeProjectSelections('countries', this.props.countries)}
                </select>
            </div>
        )
    }
}


export default CountryOptions;
