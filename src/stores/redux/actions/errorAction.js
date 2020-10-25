import * as types from "../../../constants/types";

class errorAction {
	getError(error) {
		return {
			type: types.GET_ERROR,
			error,
		};
	}
	clearError() {
		return {
			type: types.CLEAR_ERROR,
		};
	}
}

export default new errorAction();
