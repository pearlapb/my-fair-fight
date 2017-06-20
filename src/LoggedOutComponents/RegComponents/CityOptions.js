import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router';

class CityOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <label for="city">City</label>
                <select name="city" onChange={this.props.handleInput} className="blue-background-style">
                    <option selected value="marondera">Marondera</option>
                    <option value="varanasi">Varanasi</option>
                </select>
            </div>
        )
    }
}


export default CityOptions;
