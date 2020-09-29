import * as types from "../../../constants/types";
import produce from "immer";

const initialState = {
	errorMsg: "",
	errorActive: false,
};

const errorReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.GET_ERROR: {
				draft.errorMsg = action.errorMsg;
				draft.errorActive = true;
				break;
			}

			case types.CLEAR_ERROR: {
				draft.errorMsg = "";
				draft.errorActive = false;
				break;
			}

			default:
				break;
		}
	});

export default errorReducer;
