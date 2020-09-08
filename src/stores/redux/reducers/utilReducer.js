import * as types from "../../../constants/types";

const initialState = {
	loadingList: [],
	changeUI: false,
};

const utilReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.LOADING_UI: {
			let checkLoadingExist = false;
			for (let i = 0; i < state.loadingList; i++) {
				if (state.loadingList[i].name === action.loading.name) checkLoadingExist = true;
				else checkLoadingExist = false;
			}
			console.log("checkLoadingExist", checkLoadingExist);
			return {
				...state,
				loadingList: checkLoadingExist
					? state.loadingList.map((loading) =>
							loading.name === action.loading.name ? action.loading : loading
					  )
					: [...state.loadingList, action.loading],
			};
		}
		case types.LOADED_UI: {
			return {
				...state,
				loadingList: state.loadingList.map((loading) =>
					loading.name === action.loadedName ? { ...loading, loading: false } : loading
				),
			};
		}

		default: {
			return state;
		}
	}
};

export default utilReducer;
