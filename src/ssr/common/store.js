
let initState = {num:1};

//constact
export const ADD = 'ADD';

//reducer
export function count(state = initState,action){
	switch(action.type){
		case ADD:
			return {...state,num:state.num + 1};
		case ADD:
			return {...state,num:state.num - 1};
		default:
			return state;
	}
}


//action creator
export function changeAdd(){
	return {type:ADD};
}
