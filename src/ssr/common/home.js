import React from 'react';
import {connect} from 'react-redux';
import {load} from './store';

@connect(state=>state,{load})
class Home extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>home</div>
    }
}

Home.loadData = function(){
    load();
}
export default Home;