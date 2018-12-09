import React from 'react';
import {load,changeList} from './store';
import { connect } from 'react-redux';
import css from '../asset/main.css';
import {RenderHoc} from './extract_css';

@connect(state=>({list:state.list}),{load,changeList})
@RenderHoc(css)
class Home extends React.Component{
    constructor(props){
        super(props);
	}
	componentDidMount(){
		if(this.props.list.length < 1){
			this.props.load();
		}
	}
	clickItem=()=>{
		// this.props.changeList([{name:'1'},{name:"2"}]);
	}
    render(){
		console.log(this.props);
        return (<div onClick={this.clickItem} className={css.test}>
			home123456
			<ul>
			{
				this.props.list.map((item)=>{
					return <li key ={item.name}>{item.name}</li>
				})
			}
			</ul>
		</div>)
    }
}

Home.loadData = (store)=>{
	return store.dispatch(load()) ;
}

export default Home;