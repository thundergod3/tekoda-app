import * as types from "../../../constants/types";
import produce from "immer";
import saveLocal from "../../../helpers/saveLocal";

const initialState = {
	userData: {},
	token: saveLocal.getFromLocal("token") ? saveLocal.getFromLocal("token") : "",
	authenticated: undefined,
};

const authReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.LOGIN_USER_SUCCEEDED: {
				draft.token = action.token;
				break;
			}

			case types.REGISTER_USER_SUCCEEDED: {
				console.log(action.userData);
				draft.userData = action.userData;
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
