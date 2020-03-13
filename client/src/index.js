import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from './App';

import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const initialstore = {
    data: null,
    value: 0,
    validUser: false,
    username: ''
};

const reducer = function(state = initialstore, action) {
    switch(action.type) {
        case 'SET_DATA' :
            return {
                ...state,
                validUser: action.data.value,
                username: action.data.username
            }
        default: {
            return {
                ...state
            }
        }
    }
	return state;
}

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));