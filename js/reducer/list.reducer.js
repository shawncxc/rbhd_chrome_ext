import { GET_QUOTE, ADD_QUOTE, REMOVE_QUOTE } from "../action/list.action";

const ListReducer = (
	state = {
		share: [],
		quote: [],
	},
	action
) => {
	switch(action.type) {
		case GET_QUOTE:
			return Object.assign({}, state, { share: action.payload });
		case ADD_QUOTE:
			let newQuotes = state.quote.slice();
			newQuotes.push(action.payload);
			return Object.assign({}, state, { quote: newQuotes });
		case REMOVE_QUOTE:
			let removedQuote = state.quote.slice().filter(q => q !== action.payload);
			return Object.assign({}, state, { quote: removedQuote });
		default:
			return state;
	}
};

export default ListReducer;