import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../common/app';
import { StaticRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import {count} from '../common/store';
import thunk from 'redux-thunk';



export function render(str,req){
	let store = createStore(count,applyMiddleware(thunk));
	let component = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={{}}>
				<App/>
			</StaticRouter>
		</Provider>
	);

	return (`
		<html>
			<head>
				<meta charset="UTF-8">
				<title>ssr</title>
			</head>
			<body>
				<div id='app'>${component}</div>
				<script src='main.js'></script>
			</body>	
		</html>
	`)

}