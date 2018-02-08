const ListReducer = (state = {}, action) => {
	switch(action.type) {
		case "GET_QUOTE":
			return action.payload;
		default:
			return state;
	}
};

export default ListReducer;