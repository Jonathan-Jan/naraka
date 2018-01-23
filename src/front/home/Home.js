import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import appEm from 'core/appEm';

class Home extends Component {

    render() {
        return (
            <div>
                <RaisedButton label="Nouveau" onClick={() => appEm.emit('play')}/>
            </div>
        );
    }

}

export default Home;
