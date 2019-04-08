import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App/App';
import * as serviceWorker from './serviceWorker';

import arrData from './store/reducers/tableReducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(
    arrData
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
