/* eslint-disable */
import {Map} from 'immutable';

const ADD = 'ADD';
const RED = 'RED';

let initState = Map({
	num: 1
});

//reducer
export function count(state = initState, action) {
	switch (action.type) {
		case ADD:
			return state = state.set('num',3);
		case RED:
			return state = state.set('num',2);
		default:
			return state;
	}
}


//action creator
export function add() {
	return {
		type: ADD
	}
}

export function red() {
	return {
		type: red
	}
}

export function syncTest() {
	return (dispatch, getState) => {

		setTimeout(()=>{
			dispatch(add());
		},2000)
		
	};
};