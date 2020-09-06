import * as types from "../../../constants/types";

class utilAction {
	loadingUI(loading) {
		return {
			type: types.LOADING_UI,
			loading,
		};
	}
	loadedUI(loadedName) {
		return {
			type: types.LOADED_UI,
			loadedName,
		};
	}
}

export default new utilAction();
