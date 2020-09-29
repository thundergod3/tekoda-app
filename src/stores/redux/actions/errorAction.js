import * as types from "../../../constants/types";

class errorAction {
	getError(errorMsg) {
		return {
			type: types.GET_ERROR,
			errorMsg,
		};
	}
	clearError() {
		return {
			type: types.CLEAR_ERROR,
		};
	}
}

export default new errorAction();
