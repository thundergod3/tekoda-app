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

	fetchListRestaurantPerPageRequest(page) {
		return {
			type: types.FETCH_LIST_RESTAURANT_PER_PAGE_REQUEST,
			page,
		};
	}
	fetchListRestaurantPerPageSucceeded(restaurantListEachPage) {
		return {
			type: types.FETCH_LIST_RESTAURANT_PER_PAGE_SUCCEEDED,
			restaurantListEachPage,
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

	getRestaurantById(id) {
		return {
			type: types.GET_RESTAURANT_BY_ID,
			id,
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

	searchRestaurantRequest(listKeyWord) {
		return {
			type: types.SEARCH_RESTAURANT_REQUEST,
			listKeyWord,
		};
	}
	searchRestaurantSucceeded(restaurantSearchList) {
		return {
			type: types.SEARCH_RESTAURANT_SUCCEEDED,
			restaurantSearchList,
		};
	}
}

export default new restaurantAction();
