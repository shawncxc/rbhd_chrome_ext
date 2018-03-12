import {
	GET_QUOTE,
	ADD_WATCHLIST,
	REMOVE_WATCHLIST,
	SET_QUOTE_SPAN,
	GET_WATCHLIST,
	GET_PORTFOILO,
	GET_POSITIONS,
	GET_POSLIST,
	GET_QUOTE_POS,
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
		case GET_WATCHLIST:
			return Object.assign({}, state, { quote: action.payload });
		case ADD_WATCHLIST:
			let newQuotes = state.quote.slice();
			newQuotes.push(action.payload);
			return Object.assign({}, state, { quote: newQuotes });
		case REMOVE_WATCHLIST:
			let removedQuote = state.quote.slice().filter(q => q !== action.payload);
			return Object.assign({}, state, { quote: removedQuote });
		case SET_QUOTE_SPAN:
			let interval = "5minute";
			let span = action.payload;
			if (span === "week")
				interval = "10minute"
			if (span === "year")
				interval = "day";
			if (span === "5year")
				interval = "week";
			return Object.assign({}, state, { span: span, interval: interval });
		case GET_PORTFOILO:
			return Object.assign({}, state, { portfolio: action.payload });
		case GET_POSITIONS:
			return Object.assign({}, state, { positions: action.payload });
		case GET_POSLIST:
			return Object.assign({}, state, { poslist: action.payload });
		case GET_QUOTE_POS:
			return Object.assign({}, state, { sharePos: action.payload });
		default:
			return state;
	}
};

export default ListReducer;