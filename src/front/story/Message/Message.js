import React, { Component } from 'react';
import _ from 'lodash';

import './Message.css';

class Message extends Component {

    getStyle() {
        let style = this.props.from === 'player' ? {float: 'right'} : {};

        style = _.assign(style, this.props.style);

        return style;
    }

    render() {
        return (
            <div className="Message">
                <span className="text" style={this.getStyle()}>{this.props.text}</span>
            </div>
        );
    }

}

export default Message;
