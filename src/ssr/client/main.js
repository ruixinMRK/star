import React from 'react';
import ReactDOM from 'react-dom';
import App from '../common/app';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import {createStore} from 'redux';
import {count} from '../common/store';

let store = createStore(count);

ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</Provider>
	,document.getElementById('app')
);