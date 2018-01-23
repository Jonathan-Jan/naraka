import React, { Component } from 'react';
import shortid from 'shortid';

import Message from 'front/story/Message/Message';

class Messages extends Component {

    renderMessages() {
        return this.props.messages.map((msg) => {
            return (
                <Message key={shortid.generate()} from={msg.from} text={msg.text} style={msg.style}/>
            );
        });
    }

    render() {
        return (
            <div style={{display:'flex',flexDirection:'column'}}>
                {this.renderMessages()}
            </div>
        );
    }

}

export default Messages;
