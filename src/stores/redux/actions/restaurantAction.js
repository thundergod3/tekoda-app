import * as types from "../../../constants/types";

class restaurantAction {
	getRestaurantSearchDetailRequest(id) {
		return {
			type: types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST,
			id,
		};
	}
	getRestaurantSearchDetailSucceeded(id) {
		return {
			type: types.GET_RESTAURANT_SEARCH_DETAIL_SUCCEEDED,
			id,
		};
	}
}

export default new restaurantAction();
