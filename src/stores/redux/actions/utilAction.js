import * as types from "../../../constants/types";

class utilAction {
	loadingUI() {
		return {
			type: types.LOADING_UI,
		};
	}
	loadedUI() {
		return {
			type: types.LOADED_UI,
		};
	}

	showActive() {
		return {
			type: types.SHOW_ACTIVE,
		};
	}
	endActive() {
		return {
			type: types.END_ACTIVE,
		};
	}
}

export default new utilAction();
