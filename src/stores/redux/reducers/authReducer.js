import * as types from "../../../constants/types";

import cookieLocal from "../../../helpers/cookieLocal";

const initialState = {
	userData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
	token: cookieLocal.getFromCookie("token") ? cookieLocal.getFromCookie("token") : "",
	authenticated: undefined,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOGIN_USER_SUCCEEDED:
		case types.REGISTER_USER_SUCCEEDED: {
			return {
				...state,
				token: action.token,
			};
		}

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
