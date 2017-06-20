import React, {Component} from 'react';

class EncouragingSentence extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let randomSentence = this.giveRandomSentence();
        this.setState({ randomSentence })
    }

    giveRandomSentence() {
        const welcomeSentences = [
            `You're doing great!`,
            `We're really proud of you`,
            `See how far you've come!`,
        ];
        const getRandomNumber = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        };
        return welcomeSentences[getRandomNumber(0, welcomeSentences.length)];
    }

    render() {
        return (
            <h3>{this.state.randomSentence}</h3>
        )
    }
}

export default EncouragingSentence;
