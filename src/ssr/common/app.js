import React from 'react';
import {Route,Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {changeAdd} from '../common/store';

function index(){
	return <div>首页</div>
}
function home(){
	return <div>home</div>
}

@connect(
	state=>state,
	{changeAdd},
	undefined,
	{pure:false}  //不在此参数  无法响应Link的路由跳转
)
class App extends React.Component{
	constructor(props){
		super(props)
	}
	clickItem=()=>{
		this.props.changeAdd();
	}
	render(){
		return (
			<div>
				<div>
					<Link to='/'>首页</Link>
					<br/>
					<Link to = '/home'>HOME</Link>
				</div>
				---------------------
				{this.props.num}
				---------------------
				<Route exact path='/' component={index}></Route>
				<Route exact path='/home' component={home}></Route>
				<div onClick={this.clickItem}>这个是测试后端渲染无法渲染事件的问题</div>
			</div>
		)
	}
} 

export default App;