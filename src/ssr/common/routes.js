


import Home from './home';
import React from 'react';

function index(){
	return <div>首页</div>
}

export default [
    {
        exact:true, 
        path:'/',
        component:index,
        key:'/'
    },
    {
        exact:true,
        path:'/home',
        key:'/home',
        component:Home,
        loadData:function(){
            return Home.loadData();
        }
    }
]