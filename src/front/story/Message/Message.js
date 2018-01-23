import React, { Component } from 'react';
import _ from 'lodash';

import './Message.css';

class Message extends Component {

    getStyle() {
        let style = _.assign({}, this.props.style);

        return style;
    }

    render() {
        //{this.props.from !== 'player' && <IconUser className='icon-user'/>}
        return (
            <div className={this.props.from === 'player' ? "Message Message-player" : "Message"}>
                    <div className="text" style={this.getStyle()}>{this.props.text}</div>
            </div>
        );
    }

}

export default Message;
