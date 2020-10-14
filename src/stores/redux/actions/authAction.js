import * as types from "../../../constants/types";

class authdaAction {
	getUserRequest(userData, tokenInfo) {
		return {
			type: types.GET_USER_REQUEST,
			userData,
			tokenInfo,
		};
	}
	getUserSucceeded(userData, token) {
		return {
			type: types.GET_USER_SUCCEEDED,
			userData,
			token,
		};
	}

	loginUserRequest(userForm) {
		return {
			type: types.LOGIN_USER_REQUEST,
			userForm,
		};
	}
	loginUserSucceeded(token) {
		return {
			type: types.LOGIN_USER_SUCCEEDED,
			token,
		};
	}

	registerUserRequest(userForm) {
		return {
			type: types.REGISTER_USER_REQUEST,
			userForm,
		};
	}
	registerUserSucceeded(userData) {
		return {
			type: types.REGISTER_USER_SUCCEEDED,
			userData,
		};
	}

	getUserDataRequest() {
		return {
			type: types.GET_USER_REQUEST,
		};
	}
	getUserDataSucceeded(userData) {
		return {
			type: types.GET_USER_SUCCEEDED,
			userData,
		};
	}

	checkAuthenticatedRequest() {
		return {
			type: types.CHECK_AUTHENTICATED_REQUEST,
		};
	}
	checkAuthenticatedSucceeded() {
		return {
			type: types.CHECK_AUTHENTICATED_SUCCEEDED,
		};
	}
	checkAuthenticatedFailed() {
		return {
			type: types.CHECK_AUTHENTICATED_FAILED,
		};
	}
}

export default new authdaAction();
