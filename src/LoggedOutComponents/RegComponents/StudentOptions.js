import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

import AgeOptions from './AgeOptions.js';
import CountryOptions from './CountryOptions.js';

class StudentOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getCitiesField() {
        if (!this.props.country) {
            return null;
        }
        return (
            <select name="city" onChange={this.props.handleInput} className="blue-background-style">
                <option value=""></option>
                {this.getCityOptions(this.props.country)}
            </select>
        )
    }

    getCityOptions(country) {
        if (!this.props.projectsMap[country]) {
            return null;
        } else {
            var cities = Object.keys(this.props.projectsMap[country]);
            return cities.map((city) => {
                return <option value={city} className="capitalize">{city}</option>
            })
        }
    }

    getSchoolsField() {
        console.log('motherfucker', this.props.city);

        if (!this.props.city) {
            return null;
        }
        return (
            <select name="school" onChange={this.props.handleInput} className="blue-background-style">
                <option value=""></option>
                {this.getSchoolOptions(this.props.city)}
            </select>
        )
    }

    getSchoolOptions(city) {
        let country = this.props.projectsMap[this.props.country]
        if (!country[city]) {
            return null;
        } else {
            var cities = country[city];
            return cities.schools.map((city) => {
                return <option value={city} className="capitalize">{city}</option>
            })
        }
    }

    render() {

        return (
            <div id="student-selections">
                <AgeOptions handleInput={this.props.handleInput}/>
                <CountryOptions country={this.props.country} projectsMap={this.props.projectsMap} makeProjectSelections={this.props.makeProjectSelections} handleInput={this.props.handleInput}/>
                <div className="selection-wrapper">
                    {this.props.country && <label for="city">City</label>}
                    {this.getCitiesField()}
                </div>
                <div className="selection-wrapper">
                    {this.props.city && <label for="school">Schools</label>}
                    {this.getSchoolsField()}
                </div>
            </div>
        )
    }
}

export default StudentOptions;
