import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';
import axios from 'axios';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section id="achievement-feed">

                <ul>
                    <li className="timeline-event">
                        <div className="event-content">
                            <h3>Title of event</h3>
                            <p>Chupa chups gummies candy canes cupcake bear claw muffin. Cotton candy lemon drops danish. Caramels brownie jujubes bear claw macaroon pudding cake gummies. Apple pie halvah tootsie roll marshmallow tart muffin biscuit candy I love. Icing bonbon I love dessert oat cake. Cake wafer I love gummi bears wafer. Chupa chups candy canes dessert cotton candy. Jelly-o ice cream lemon drops I love tart gummi bears cupcake I love oat cake.</p>
                            <span className="event-date">Jan 14</span>
                        </div>
                    </li>

                    <li className="timeline-event">
                        <div className="event-content">
                            <h3>Title of event N2</h3>
                            <p>Chupa chups gummies candy canes cupcake bear claw muffin. Cotton candy lemon drops danish. Caramels brownie jujubes bear claw macaroon pudding cake gummies. Apple pie halvah tootsie roll marshmallow tart muffin biscuit candy I love. Icing bonbon I love dessert oat cake. Cake wafer I love gummi bears wafer. Chupa chups candy canes dessert cotton candy. Jelly-o ice cream lemon drops I love tart gummi bears cupcake I love oat cake.</p>
                            <span className="event-date">Jan 12</span>
                        </div>
                    </li>

                    <li className="timeline-event">
                        <div className="event-content">
                            <h3>Title of event N3</h3>
                            <p>Chupa chups gummies candy canes cupcake bear claw muffin. Cotton candy lemon drops danish. Caramels brownie jujubes bear claw macaroon pudding cake gummies. Apple pie halvah tootsie roll marshmallow tart muffin biscuit candy I love. Icing bonbon I love dessert oat cake. Cake wafer I love gummi bears wafer. Chupa chups candy canes dessert cotton candy. Jelly-o ice cream lemon drops I love tart gummi bears cupcake I love oat cake.</p>
                            <span className="event-date">Jan 12</span>
                        </div>
                    </li>

                    <li className="timeline-event">
                        <div className="event-content">
                            <h3>Title of event N4</h3>
                            <p>Chupa chups gummies candy canes cupcake bear claw muffin. Cotton candy lemon drops danish. Caramels brownie jujubes bear claw macaroon pudding cake gummies. Apple pie halvah tootsie roll marshmallow tart muffin biscuit candy I love. Icing bonbon I love dessert oat cake. Cake wafer I love gummi bears wafer. Chupa chups candy canes dessert cotton candy. Jelly-o ice cream lemon drops I love tart gummi bears cupcake I love oat cake.</p>
                            <span className="event-date">Jan 12</span>
                        </div>
                    </li>

                </ul>
            </section>
        )
    }
}

export default Timeline;
