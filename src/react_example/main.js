/* eslint-disable */

import  '@babel/polyfill';
import React from 'react';
import ReactDom from 'react-dom';
import {store} from './example/root.redux';
import {Provider} from 'react-redux';
import Parent from './example/parent';
import {BrowserRouter, Route,Switch} from 'react-router-dom';
import './example/main.less';
import asyncComponent from './example/async_component';

if(process.env.NODE_ENV === 'development'){
	
}

if (module.hot) {
    module.hot.accept();
}

function home(props){
	return <div className='redText'>我是首页</div>
}
function one(){
	return <div className='redText'>我是一级</div>
}


const two = asyncComponent(() => import(/* webpackChunkName:'sync' */"./example/sync"));


class App extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<Provider store={store}>
				
				<BrowserRouter>
					<div>
						<Parent></Parent>
						<Switch>
							<Route exact path='/home' component={home}></Route>
							<Route exact path='/one' component={one}></Route>
							<Route exact path='/two' component={two}></Route>
							<Route exact component={home}></Route>
						</Switch>
					</div>
				</BrowserRouter >
				
			</Provider>
		)
	}
}
  
  ReactDom.render(
	<App />,
	document.getElementById('app')
  );