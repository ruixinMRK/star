
import axios from 'axios';

let initState = {num:1,list:[]};

//constact
export const ADD = 'ADD';
export const GET_LIST = 'GET_LIST';
//reducer
export function count(state = initState,action){
	switch(action.type){
		case ADD:
			return state = {...state,num:state.num + 1};
		case ADD:
			return state = {...state,num:state.num - 1};
		case GET_LIST:
			return {...state,list:action.list};
		default:
			return state;
	}
}


//action creator
export function changeAdd(){
	return {type:ADD};
}

export function changeList(arr){
	return {type:GET_LIST,list:arr}
}

export function load(){
	return (dispatch)=>{
		return axios.get("http://localhost:3000/api/list").then((res)=>{
			dispatch({type:GET_LIST,list:res.data.list});
		}).catch((error)=>{
			console.log(error);
		})
	}
}