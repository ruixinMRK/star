import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { syncTest } from './cout.redux';
import {Map,is} from 'immutable'
import css from './main.less';


@connect(
	function(state){
		return {count:state.get('count')}
	},
	// state => {count:state.get('count')},
	{ syncTest }
)
@withRouter
class Child extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data:Map({
				a:1,
				b:2
			})
		}
	}

	fly = () => {
		this.props.syncTest();
	}

	go = () => {
		// this.props.history.push('/one');
		// let o = this.state.data.set('a','3');
		// this.setState({data:o});
		this.props.syncTest();
	}

	shouldComponentUpdate (nextProps = {}, nextState = {}) {
		const thisProps = this.props || {}, thisState = this.state || {};
	  
		if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
			Object.keys(thisState).length !== Object.keys(nextState).length) {
		  return true;
		}
	  
		for (const key in nextProps) {
		  if (!is(thisProps[key], nextProps[key])) {
			return true;
		  }
		}
	  
		for (const key in nextState) {
		  if (thisState[key] !== nextState[key] && !is(thisState[key], nextState[key])) {
			return true;
		  }
		}
		return false;
	  }

	render() {
		let children = this.props.content.map((item, index) => {
			return <Link key={index} to={item.path} >{item.name}<i className={css.testI}>opp</i></Link>;
		});
		return (
			<div>
				<div className={css.nav}> {children}</div>
				<div onClick={this.go}>{this.props.count.get('num')}</div>
				{this.props.num == 1 ? '默认状态' : '已经改变'}
			</div>
		);
	}
}
export default Child;
