const ListReducer = (
	state = {
		share: [],
		quote: [],
	},
	action
) => {
	switch(action.type) {
		case "GET_QUOTE":
			return Object.assign({}, state, { share: action.payload });
		case "ADD_QUOTE":
			let newQuotes = state.quote.slice();
			newQuotes.push(action.payload);
			return Object.assign({}, state, { quote: newQuotes });
		default:
			return state;
	}
};

export default ListReducer;