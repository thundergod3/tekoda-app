import * as types from "../../../constants/types";

const initialState = {
	loading: false,
	active: false,
};

const utilReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOADING_UI: {
			return {
				...state,
				loading: true,
			};
		}
		case types.LOADED_UI: {
			return {
				...state,
				loading: false,
			};
		}

		case types.SHOW_ACTIVE: {
			return {
				...state,
				active: true,
			};
		}
		case types.END_ACTIVE: {
			return {
				...state,
				active: false,
			};
		}

		default: {
			return state;
		}
	}
};

export default utilReducer;
