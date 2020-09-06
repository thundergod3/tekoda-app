import * as types from "../../../constants/types";

class authdaAction {
	getUserRequest(userData) {
		return {
			type: types.GET_USER_REQUEST,
			userData,
		};
	}
	getUserSucceeded(userData) {
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
