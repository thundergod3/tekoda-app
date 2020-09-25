import * as types from "../../../constants/types";
import produce from "immer";

const initialState = {
	errorList: [],
};

const errorReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.GET_ERROR: {
				let checkErrorExist = false;
				for (let i = 0; i < draft.loadingList; i++) {
					if (draft.loadingList[i].name === action.loading.name) checkErrorExist = true;
					else checkErrorExist = false;
				}

				if (checkErrorExist) {
					draft.errorList = draft.errorList.map((error) =>
						error.name === action.error.name ? action.error : error
					);
					break;
				} else {
					draft.errorList.push(action.error);
					break;
				}
			}

			case types.CLEAR_ERROR: {
				const index = draft.errorList.findIndex((error) => error.name === action.errorName);
				draft.errorList.splice(index, 1);
				break;
			}

			default:
				break;
		}
	});

export default errorReducer;
