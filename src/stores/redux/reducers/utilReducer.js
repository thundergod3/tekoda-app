import * as types from "../../../constants/types";

const initialState = {
	loadingList: [],
	changeUI: false,
};

const utilReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOADING_UI: {
			return {
				...state,
				loadingList:
					state.loadingList.length === 0
						? [...state.loadingList, action.loading]
						: state.loadingList.map((loading) =>
								loading.name !== action.loading.name ? action.loading : loading
						  ),
			};
		}
		case types.LOADED_UI: {
			return {
				...state,
				loadingList: state.loadingList.filter((loading) => loading.name !== action.loadedName),
			};
		}

		default: {
			return state;
		}
	}
};

export default utilReducer;
