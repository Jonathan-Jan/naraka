import { createBrowserHistory } from 'history';
import _C from 'core/constantes';

let history = createBrowserHistory({});

function goHome() {
    this.push(_C.ROUTE.HOME);
}

function goPlay() {
    this.push(_C.ROUTE.PLAY);
}

history.goHome = goHome.bind(history);
history.goPlay = goPlay.bind(history);

export default history
