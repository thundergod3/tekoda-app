import * as types from "../../../constants/types";
import produce from "immer";
import cookieLocal from "../../../helpers/cookieLocal";

const initialState = {
	userData: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
	token: cookieLocal.getFromCookie("token") ? cookieLocal.getFromCookie("token") : "",
	authenticated: undefined,
};

const authReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.LOGIN_USER_SUCCEEDED:
			case types.REGISTER_USER_SUCCEEDED: {
				draft.token = action.token;
				break;
			}

			case types.GET_USER_SUCCEEDED: {
				draft.userData = action.userData;
				if (action.token) draft.token = action.token;
				break;
			}

			case types.CHECK_AUTHENTICATED_SUCCEEDED: {
				draft.authenticated = true;
				break;
			}
			case types.CHECK_AUTHENTICATED_FAILED: {
				draft.authenticated = false;
				draft.userData = {};
				break;
			}

			default:
				break;
		}
	});

export default authReducer;
