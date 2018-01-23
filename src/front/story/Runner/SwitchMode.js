import React, { Component } from 'react';

import Sms from 'front/story/mode/Sms/Sms';
import ChatApp from 'front/story/mode/ChatApp/ChatApp';
import Irl from 'front/story/mode/Irl/Irl';

class SwitchMode extends Component {

    render() {

        let {mode,...props} = this.props;
        switch (mode) {
            case 'sms':
                return (<Sms {...props}/>);
                break;
            case 'chatapp':
                return (<ChatApp {...props}/>);
                break;
            case 'irl':
                return (<Irl {...props}/>);
                break;
            default:
                return (<div>ERROR MODE NOT FOUND</div>);
        }
    }

}

export default SwitchMode;
