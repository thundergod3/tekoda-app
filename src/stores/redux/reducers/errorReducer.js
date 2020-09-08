import * as types from "../../../constants/types";

const initialState = {
	errorList: [],
};

const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_ERROR: {
			return {
				...state,
				errorList:
					state.errorList.length === 0
						? [...state.errorList, action.error]
						: state.errorList.map((error) => {
								return error.name === action.error.name ? action.error : error;
						  }),
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
