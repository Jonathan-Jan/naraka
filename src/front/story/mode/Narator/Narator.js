import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconLeft from 'material-ui/svg-icons/navigation/chevron-left';

import _ from 'lodash';
import shortid from 'shortid';

import './Narator.css';
import {Flex,FlexRow} from 'front/FlexUtil';
import Answers from 'front/story/Answers/Answers';

class Narator extends Component {

    constructor(props){
        super(props);
    }

    render() {

        let messages = this.props.messages.map((msg) => {
            return (
                <div key={shortid.generate()} className="message">{msg.text}</div>
            )
        });

        return (
            <div className='Narator'>
                <Flex/>
                {messages}
                <Flex/>
                <Answers label="Que choisissez-vous de faire..." disabled={!this.props.stepDone} answers={this.props.answers} onAnswer={this.props.onAnswer}/>
            </div>
        );
    }

}

export default Narator;
