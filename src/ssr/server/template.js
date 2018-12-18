import React from 'react';
import { renderToString,renderToNodeStream } from 'react-dom/server';
import App from '../common/app';
import { StaticRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import {createStore,applyMiddleware} from 'redux';
import {count,changeList} from '../common/store';
import thunk from 'redux-thunk';
import { matchRoutes } from 'react-router-config'
import routes from '../common/routes';
import LRU from 'lru-cache';


let options = { max: 500, 
	length: function (n, key) { return n * 2 + key.length }, 
	dispose: function (key, n) { n.close() }, 
	maxAge: 1000 * 60 * 60 
}
let	cache = new LRU(options);
	// sets just the max size

function genHTML({css,component,store}){
	return `<html>
		<head>
			<meta charset="UTF-8">
			<title>ssr</title>
			<style data-type='server-render'>
			${[...css].join('\n')}
			</style>
		</head>
		<body>
			<script>window.sreverData = ${JSON.stringify(store.getState())}</script>
			<div id='app'>${component}</div>
			<script src='main.js'></script>
		</body>	
	</html>`
}
export function render(str,req,res){
	let store = createStore(count,applyMiddleware(thunk));
	
	let path = req.path;
	let v = cache.get(path);

	if(v){
		res.end(v);
	}else{
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
			
			const css = new Set(); // CSS for all rendered React components
			const context = { insertCss: (style) => css.add(style._getCss()) };

			
			let component = renderToString(
				<Provider store={store}>
					<StaticRouter location={req.url} context={{isServer:true,...context}}>
						<App/>
					</StaticRouter>
				</Provider>
			);
			let html = genHTML({component,css,store});
			cache.set(path,html);
			res.end(html);

			// res.write("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>ssr</title></head><body>");
			// res.write(`<script>window.sreverData = ${JSON.stringify(store.getState())}</script><div id='app'>`);
			// const stream = renderToNodeStream(<Provider store={store}>
			// 	 		<StaticRouter location={req.url} context={{isServer:true,...context}}>
			// 				<App/>
			// 			</StaticRouter>
			// 		</Provider>
			// );
			// stream.pipe(res, { end: false });
			// stream.on('end', () => {
			// 	res.write("</div></body></html>");
			// 	res.end();
			// });   

		}).catch((error)=>{
			console.log(error)
			return res.end(<p>ERROR</p>);
		})
	}
	

}