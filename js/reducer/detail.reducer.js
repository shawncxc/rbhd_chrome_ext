import {
	GET_DETAIL_QUOTE,
	GET_NEWS,
} from "../action/detail.action";

const DetailReducer = (
	state = {
		data: {},
		span: "day",
		interval: "5minute",
		news: [],
		totalNews: 0,
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
		default:
			return state;
	}
};

export default DetailReducer;