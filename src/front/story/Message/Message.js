import React, { Component } from 'react';

import './Message.css';

class Message extends Component {

    render() {
        return (
            <div className="Message">
                <span className="text" style={this.props.from === 'player' ? {float: 'right'} : null}>{this.props.text}</span>
            </div>
        );
    }

}

export default Message;
