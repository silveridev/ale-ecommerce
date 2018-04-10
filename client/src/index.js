import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './reducers';
import App from './container/App';

const store = createStore(reducers);

const Root = () => (
    <Provider store={store} >
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
