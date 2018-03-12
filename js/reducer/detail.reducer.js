import {
	GET_DETAIL_QUOTE,
	SET_DETAIL_QUOTE_SPAN,
	GET_NEWS,
	GET_FUNDAMENTAL,
	GET_RATING,
	GET_POPULARITY,
} from "../action/detail.action";

const DetailReducer = (
	state = {
		data: {},
		span: "day",
		interval: "5minute",
		news: [],
		totalNews: 0,
		fundamental: {},
	},
	action
) => {
	switch(action.type) {
		case GET_DETAIL_QUOTE:
			return Object.assign({}, state, { data: action.payload });
		case GET_NEWS:
			return Object.assign(
				{}, state, 
				{
					news: action.payload.results,
					totalNews: action.payload.count,
					nextNews: action.payload.next,
					prevNews: action.payload.previous,
				}
			);
		case GET_FUNDAMENTAL:
			return Object.assign({}, state, { fundamental: action.payload });
		case SET_DETAIL_QUOTE_SPAN:
			let interval = "5minute";
			let span = action.payload;
			// span = day or week, interval can be 5minute
			if (span === "year")
				interval = "day";
			if (span === "5year")
				interval = "week";
			return Object.assign({}, state, { span: span, interval: interval });
		case GET_RATING:
			return Object.assign({}, state, { rating: action.payload });
		case GET_POPULARITY:
			return Object.assign({}, state, { popularity: action.payload });
		default:
			return state;
	}
};

export default DetailReducer;