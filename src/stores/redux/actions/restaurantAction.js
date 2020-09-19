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

	fetchRecommendRestaurantRequest() {
		return {
			type: types.FETCH_RECOMMEND_TRENDING_RESTAURANT_REQUEST,
		};
	}
	fetchRecommendRestaurantSucceeded(trendingRestaurantList) {
		return {
			type: types.FETCH_RECOMMEND_TRENDING_RESTAURANT_SUCCEEDED,
			trendingRestaurantList,
		};
	}

	fetchSaveRestaurantRequest() {
		return {
			type: types.FETCH_SAVE_LIST_RESTAURANT_REQUEST,
		};
	}
	fetchSaveRestaurantSucceeded(saveRestaurantList) {
		return {
			type: types.FETCH_SAVE_LIST_RESTAURANT_SUCCEEDED,
			saveRestaurantList,
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

	getAllSearchRestaurantRequest(listKeyword) {
		return {
			type: types.GET_ALL_SEARCH_RESTAURANT_REQUEST,
			listKeyword,
		};
	}
	getAllSearchRestaurantSucceeded(allSearchRestaurant) {
		return {
			type: types.GET_ALL_SEARCH_RESTAURANT_SUCCEEDED,
			allSearchRestaurant,
		};
	}

	searchRestaurantRequest(listKeyWord, page) {
		return {
			type: types.SEARCH_RESTAURANT_REQUEST,
			listKeyWord,
			page,
		};
	}
	searchRestaurantSucceeded(restaurantSearchList) {
		return {
			type: types.SEARCH_RESTAURANT_SUCCEEDED,
			restaurantSearchList,
		};
	}

	getSearchRestaurantPerPageRequest(listKeyWord, page) {
		return {
			type: types.GET_SEARCH_RESTAURANT_PER_PAGE_REQUEST,
			listKeyWord,
			page,
		};
	}
	getSearchRestaurantPerPageSucceeded(searchRestaurantPerPage) {
		return {
			type: types.GET_SEARCH_RESTAURANT_PER_PAGE_SUCCEEDED,
			searchRestaurantPerPage,
		};
	}

	getRestaurantReviewListRequest(restaurantId, count) {
		return {
			type: types.GET_RESTAURANT_REVIEW_LIST_REQUEST,
			restaurantId,
			count,
		};
	}
	getRestaurantReviewListSucceeded(restaurantReviewList) {
		return {
			type: types.GET_RESTAURANT_REVIEW_LIST_SUCCEEDED,
			restaurantReviewList,
		};
	}

	removeRestaurantReviewList() {
		return {
			type: types.REMOVE_RESTAURANT_REVIEW_LIST,
		};
	}

	storeListKeyword(listKeyWord) {
		return {
			type: types.STORE_LIST_KEYWORD,
			listKeyWord,
		};
	}

	addstoreListKeyword(keyword) {
		return {
			type: types.ADD_STORE_LIST_KEYWORD,
			keyword,
		};
	}

	deleleItemStoreListKeyword(keyword) {
		return {
			type: types.DELETE_ITEM_STORE_LIST_KEYWORD,
			keyword,
		};
	}

	trackingUserScrollReviewListRequest(restaurantId) {
		return {
			type: types.TRACKING_USER_SCROLL_REVIEW_LIST_REQUEST,
			restaurantId,
		};
	}
	trackingUserScrollReviewListSucceeded(enjoy) {
		return {
			type: types.TRACKING_USER_SCROLL_REVIEW_LIST_SUCCEEDED,
			enjoy,
		};
	}

	saveRestaurantRequest(restaurant) {
		return {
			type: types.SAVE_RESTAURANT_REQUEST,
			restaurant,
		};
	}
	saveRestaurantSucceeded(restaurant) {
		return {
			type: types.SAVE_RESTAURANT_SUCCEEDED,
			restaurant,
		};
	}

	removeSaveRestaurant(restaurant) {
		return { type: types.REMOVE_SAVE_RESTAURANT, restaurant };
	}

	getSaveRestaurantListRequest(restaurantId) {
		return {
			type: types.GET_SAVE_RESTAURANT_LIST_REQUEST,
			restaurantId,
		};
	}
	getSaveRestaurantListSucceeded(restaurantSaveList) {
		return {
			type: types.GET_SAVE_RESTAURANT_LIST_SUCCEEDED,
			restaurantSaveList,
		};
	}
}

export default new restaurantAction();
