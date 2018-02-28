import {
	GET_DETAIL_QUOTE,
} from "../action/detail.action";

const DetailReducer = (
	state = {
		data: {},
		span: "day",
		interval: "5minute",
	},
	action
) => {
	switch(action.type) {
		case GET_DETAIL_QUOTE:
			return Object.assign({}, state, { data: action.payload });
		default:
			return state;
	}
};

export default DetailReducer;