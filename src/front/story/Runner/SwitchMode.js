import React, { Component } from 'react';

import Sms from 'front/story/mode/Sms/Sms';
import ChatApp from 'front/story/mode/ChatApp/ChatApp';
import Irl from 'front/story/mode/Irl/Irl';
import Narator from 'front/story/mode/Narator/Narator';

class SwitchMode extends Component {

    render() {

        let {mode,...props} = this.props;
        switch (mode) {
            case 'sms':
                return (<Sms {...props}/>);
            case 'chatapp':
                return (<ChatApp {...props}/>);
            case 'irl':
                return (<Irl {...props}/>);
            case 'narator':
                return (<Narator {...props}/>);
            default:
                return (<div>ERROR MODE NOT FOUND</div>);
        }
    }

}

export default SwitchMode;
