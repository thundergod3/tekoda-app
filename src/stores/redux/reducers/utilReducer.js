import * as types from "../../../constants/types";
import produce from "immer";

const initialState = {
	loading: false,
	active: false,
};

const utilReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.LOADING_UI: {
				draft.loading = true;
				break;
			}
			case types.LOADED_UI: {
				draft.loading = false;
				break;
			}

			case types.SHOW_ACTIVE: {
				draft.active = true;
				break;
			}
			case types.END_ACTIVE: {
				draft.active = false;
				break;
			}

			default:
				break;
		}
	});

export default utilReducer;
