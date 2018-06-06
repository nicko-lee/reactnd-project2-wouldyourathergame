import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers/root';

const defaultStore = createStore(rootReducers);

ReactDOM.render(
    <Provider store={defaultStore} >
        <App />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
