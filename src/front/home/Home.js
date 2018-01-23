import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {

    render() {
        return (
            <div>
                <RaisedButton label="Nouveau" onClick={() => this.props.onPlay()}/>
            </div>
        );
    }

}

export default Home;
