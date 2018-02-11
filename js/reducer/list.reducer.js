import {
	GET_QUOTE,
	ADD_QUOTE,
	REMOVE_QUOTE,
	SET_QUOTE_SPAN,
} from "../action/list.action";

const ListReducer = (
	state = {
		share: [],
		quote: [],
		span: "day",
		interval: "5minute",
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
		case SET_QUOTE_SPAN:
			let interval = "5minute";
			let span = action.payload;
			// span = day or week, interval can be 5minute
			if (span === "year")
				interval = "day";
			if (span === "5year")
				interval = "week";
			return Object.assign({}, state, { span: span, interval: interval });
		default:
			return state;
	}
};

export default ListReducer;