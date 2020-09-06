import * as types from "../../../constants/types";

const initialState = {
	userData: {},
	authenticated: undefined,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_USER_SUCCEEDED: {
			return {
				...state,
				userData: action.userData,
			};
		}

		case types.CHECK_AUTHENTICATED_SUCCEEDED: {
			return {
				...state,
				authenticated: true,
			};
		}
		case types.CHECK_AUTHENTICATED_FAILED: {
			return {
				...state,
				authenticated: false,
				userData: {},
			};
		}

		default: {
			return state;
		}
	}
};

export default authReducer;
