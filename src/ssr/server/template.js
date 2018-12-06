import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../common/app';
import { StaticRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import {count,changeList} from '../common/store';
import thunk from 'redux-thunk';
import { matchRoutes } from 'react-router-config'
import routes from '../common/routes';

export function render(str,req,res){
	let store = createStore(count,applyMiddleware(thunk));
	
	//匹配路由
	let components = matchRoutes(routes,req.url);
	let promises = [];
	components.forEach(item => {
		if(item&&item.route&&item.route.loadData){
			promises.push(item.route.loadData(store));
		}
	});
	//加载数据
	Promise.all(promises).then(()=>{
		
		let component = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={{isServer:true}}>
					<App/>
				</StaticRouter>
			</Provider>
		);

		res.end(`
			<html>
				<head>
					<meta charset="UTF-8">
					<title>ssr</title>
				</head>
				<body>
					<script>window.sreverData = ${JSON.stringify(store.getState())}</script>
					<div id='app'>${component}</div>
					<script src='main.js'></script>
				</body>	
			</html>
		`)
	}).catch(()=>{
		return res.end(<p>ERROR</p>);
	})

}