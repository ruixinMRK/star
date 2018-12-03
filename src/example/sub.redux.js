/* eslint-disable */
const TEST = 'TEST';

let initState = {
	test:1
};

//reducer
export function sub(state = initState,action){
	switch(action.type){
		case TEST:
			return {...state,test:state.test+1};
		default:
			return state;
	}
}


//action creator

export function test(){
	return {type:TEST}
}

