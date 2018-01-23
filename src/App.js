import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import './App.css';
import { Route } from 'react-router-dom';

import _C from 'core/constantes';
import appEm from 'core/appEm';
import history from 'front/app/history';

import Runner from 'front/story/Runner/Runner';
import Home from 'front/home/Home';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    play(data) {
        history.push(_C.ROUTE.PLAY);
    }

    componentDidMount() {
        appEm.on('play', (data) => this.play(data));
    }

    render() {

        return (
            <div className="App">
                <Route path={_C.ROUTE.HOME} render={(props) => <Home />}/>
                <Route path={_C.ROUTE.PLAY} render={(props) => <Runner />}/>
            </div>
        );
    }
}

export default App;
