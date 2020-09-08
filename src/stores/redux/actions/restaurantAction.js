import * as types from "../../../constants/types";

class restaurantAction {
	fetchListRestaurantRequest() {
		return {
			type: types.FETCH_LIST_RESTAURANT_REQUEST,
		};
	}
	fetchListRestaurantSucceeded(restaurantList) {
		return {
			type: types.FETCH_LIST_RESTAURANT_SUCCEEDED,
			restaurantList,
		};
	}

	getRestaurantSearchDetailRequest(id) {
		return {
			type: types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST,
			id,
		};
	}
	getRestaurantSearchDetailSucceeded(restaurantSearchDetail) {
		return {
			type: types.GET_RESTAURANT_SEARCH_DETAIL_SUCCEEDED,
			restaurantSearchDetail,
		};
	}

	sendSurveyFormRequest(surveyForm) {
		return {
			type: types.SEND_SURVEY_FORM_REQUEST,
			surveyForm,
		};
	}
	sendSurveyFormSucceeded(surveyForm) {
		return {
			type: types.SEND_SURVEY_FORM_SUCCEEDED,
			surveyForm,
		};
	}
}

export default new restaurantAction();
