import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import './App.css';

import _C from 'core/constantes';

import Runner from 'front/story/Runner/Runner';
import Home from 'front/home/Home';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    play() {
        let storyData = JSON.parse(this.state.storyData);
        this.setState({play:true,storyData:storyData});
    }

    render() {

        if (!this.state.play) {
            return (
                <div>
                    <div>Use "build Naraka" from Naraka Editor to create a serialized version of your story readable by Naraka</div>
                    <span>Naraka build : </span>
                    <input onChange={(e) => this.setState({storyData:e.target.value})}/>
                    <button onClick={() => this.play()}>Load</button>
                </div>
            );
        }

        else {
            return (<Runner storyData={this.state.storyData}/>);
        }
    }
}

export default App;
