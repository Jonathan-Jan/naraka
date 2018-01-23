import React, { Component } from 'react';
import IconUser from 'material-ui/svg-icons/action/account-circle';
import IconPhone from 'material-ui/svg-icons/communication/phone';
import IconMenuPhone from 'material-ui/svg-icons/navigation/more-vert';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton  from 'material-ui/FlatButton';

import shortid from 'shortid';

import './Smartphone.css';
import {Flex,FlexColumn,FlexRow} from 'front/FlexUtil';
import Message from 'front/story/Message/Message';
import Answers from 'front/story/Answers/Answers';

class Smartphone extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let messages = this.props.messages.map((msg) => {
            return (
                <Message key={shortid.generate()} from={msg.from} text={msg.text}/>
            );
        });

        return (
            <div className="Smartphone">
                <header>
                    <FlexRow>
                        <IconBack style={styles.icon}/>
                        <Flex/>
                        <FlexRow>
                            <IconUser style={styles.icon}/>
                            <div>{this.props.title}</div>
                        </FlexRow>
                        <Flex/>
                        <IconPhone style={styles.icon}/>
                        <IconMenuPhone style={styles.icon}/>
                    </FlexRow>
                </header>

                <div style={{display:'flex',flexDirection:'column',position: 'absolute',bottom: '50px',width: '100%'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        {messages}
                    </div>

                    <Answers disabled={!this.props.stepDone} answers={this.props.answers} onAnswer={this.props.onAnswer}/>

                </div>

            </div>
        );
    }

}

const styles = {
    icon: {
        height:'40px',
        width:'40px',
        color: 'white'
    }
}

export default Smartphone;
