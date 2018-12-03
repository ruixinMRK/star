import React from 'react';

import Child from './child';

export default class Parent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [{ name: '首页', path: '/home' }, { name: '一级', path: '/one' }, { name: '二级', path: '/two' }]
		}
	}
	render() {
		return (
			<div>
				<Child content={this.state.items}>
				</Child>
			</div>
		)
	}
}