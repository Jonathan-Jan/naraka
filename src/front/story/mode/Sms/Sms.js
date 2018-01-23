import React, { Component } from 'react';
import IconUser from 'material-ui/svg-icons/action/account-circle';
import IconPhone from 'material-ui/svg-icons/communication/phone';
import IconMenuPhone from 'material-ui/svg-icons/navigation/more-vert';
import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

import './Sms.css';
import {Flex,FlexRow} from 'front/FlexUtil';
import Messages from 'front/story/Message/Messages';
import Answers from 'front/story/Answers/Answers';

class Sms extends Component {

    render() {
        return (
            <div className="Sms">
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
                    <Messages messages={this.props.messages}/>

                    <Answers label="Saisissez un message..." disabled={!this.props.stepDone} answers={this.props.answers} onAnswer={this.props.onAnswer}/>
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

export default Sms;
