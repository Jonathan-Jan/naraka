import React, { Component } from 'react';

import './Irl.css';
import {Flex,FlexRow} from 'front/FlexUtil';
import Messages from 'front/story/Message/Messages';
import Answers from 'front/story/Answers/Answers';

class Irl extends Component {

    render() {
        return (
            <div className="Irl">
                <header>
                    <FlexRow>
                        <Flex/>
                        <FlexRow>
                            <div>{this.props.title}</div>
                        </FlexRow>
                        <Flex/>
                    </FlexRow>
                </header>

                <div style={{display:'flex',flexDirection:'column',position: 'absolute',bottom: '50px',width: '100%'}}>
                    <Messages messages={this.props.messages}/>

                    <Answers label="Répondre..." disabled={!this.props.stepDone} answers={this.props.answers} onAnswer={this.props.onAnswer}/>
                </div>

            </div>
        );
    }

}

const styles = {
    icon: {
        height:'40px',
        width:'40px',
        color:'white'
    }
}

export default Irl;
