import * as types from "../../../constants/types";
import produce from "immer";

const initialState = {
	errorMsg: "",
	errorActive: false,
	errorStatus: 0,
};

const errorReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.GET_ERROR: {
				draft.errorMsg = action.error?.data?.error;
				draft.errorActive = true;
				draft.errorStatus = action.error?.status;
				break;
			}

			case types.CLEAR_ERROR: {
				draft.errorMsg = "";
				draft.errorActive = false;
				draft.errorStatus = 0;
				break;
			}

			default:
				break;
		}
	});

export default errorReducer;
