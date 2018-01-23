import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Router} from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import history from 'front/app/history';

injectTapEventPlugin();
ReactDOM.render(
    <MuiThemeProvider>
        <Router history={history}>
            <App />
        </Router>
    </MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
