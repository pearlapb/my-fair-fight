import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class CountryOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getCountriesField() {
        let countries = [];
        for (var key in this.props.projectsMap) {
            countries.push(key);
        }
        let countryOptions = countries.map((country) => {
            return ( <option key={country} value={country}>{country}</option> )
        });
        return (
            <select name="country" onChange={this.props.handleInput} className="blue-background-style">
                <option value=""></option>
                {countryOptions}
            </select>
        )
    }

    render() {

        return (
            <div className="selection-wrapper">
                <label for="country">Country</label>
                {this.getCountriesField()}
            </div>
        )
    }
}


export default CountryOptions;
