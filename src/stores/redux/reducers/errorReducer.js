import * as types from "../../../constants/types";

const initialState = {
	errorList: [],
};

const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ERROR: {
			let checkErrorExist = false;
			for (let i = 0; i < state.loadingList; i++) {
				if (state.loadingList[i].name === action.loading.name) checkErrorExist = true;
				else checkErrorExist = false;
			}
			return {
				...state,
				errorList: checkErrorExist
					? state.errorList.map((error) => (error.name === action.error.name ? action.error : error))
					: [...state.errorList, action.error],
			};
		}

		case types.CLEAR_ERROR: {
			return {
				...state,
				errorList: state.errorList.map((error) =>
					error.name === action.errorName ? { ...error, error: "" } : error
				),
			};
		}

		default: {
			return state;
		}
	}
};

export default errorReducer;
