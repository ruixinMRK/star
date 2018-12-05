import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/app';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import {count} from '../common/store';
import thunk from 'redux-thunk';

let store = createStore(count,applyMiddleware(thunk));

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	,document.getElementById('app')
);