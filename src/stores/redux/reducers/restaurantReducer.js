import * as types from "../../../constants/types";
import produce from "immer";

import restaurant from "../../../assets/restaurants/restaurant1.png";
import restaurant2 from "../../../assets/restaurants/restaurant2.png";
import restaurant3 from "../../../assets/restaurants/restaurant3.png";
import home from "../../../assets/icons/home.png";

const initialState = {
	restaurantList: [],
	restaurantListEachPage: [],
	restaurantSearchDetail: {},
	saveRestaurantList: [],
	trendingRestaurantList: [],
	statusSurvey: localStorage.getItem("statusSurvey") ? JSON.parse(localStorage.getItem("statusSurvey")) : false,
	restaurantReviewList: [],
	listKeyWord: [],
};

const restaurantReducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case types.FETCH_LIST_RESTAURANT_SUCCEEDED: {
				draft.restaurantList = action.restaurantList;
				draft.listKeyWord = [];
				break;
			}

			case types.FETCH_RECOMMEND_TRENDING_RESTAURANT_SUCCEEDED: {
				draft.trendingRestaurantList = action.trendingRestaurantList;
				break;
			}

			case types.FETCH_LIST_RESTAURANT_PER_PAGE_SUCCEEDED: {
				draft.restaurantListEachPage = action.restaurantListEachPage;
				break;
			}

			case types.REMOVE_LIST_RESTAURANT_PER_PAGE: {
				draft.restaurantListEachPage = [];
				break;
			}

			case types.FETCH_SAVE_LIST_RESTAURANT_SUCCEEDED: {
				draft.saveRestaurantList = action.saveRestaurantList;
				break;
			}

			case types.GET_RESTAURANT_SEARCH_DETAIL_SUCCEEDED: {
				draft.restaurantSearchDetail = {
					...action.restaurantSearchDetail,
					_source: {
						...action.restaurantSearchDetail._source,
						image: restaurant,
						descriptionList: [
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
						],
					},
				};
				draft.listKeyWord = [];
				break;
			}

			case types.SEND_SURVEY_FORM_SUCCEEDED: {
				draft.statusSurvey = true;
				break;
			}

			case types.GET_ALL_SEARCH_RESTAURANT_SUCCEEDED: {
				draft.restaurantList = action.allSearchRestaurant;
				break;
			}

			case types.SEARCH_RESTAURANT_SUCCEEDED: {
				draft.restaurantSearchDetail = {
					...action.restaurantSearchList[0],
					_source: {
						...action.restaurantSearchList[0]._source,
						image: restaurant,
						descriptionList: [
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
							{
								title: "Món ăn",
								icon: home,
								desc: "Kiểu Nhật, Kiểu Mỹ, Tốt cho sức khỏe, Kiểu Hawai, Hải sản, Kiểu Á",
							},
						],
					},
				};
				break;
			}

			case types.GET_SEARCH_RESTAURANT_PER_PAGE_SUCCEEDED: {
				draft.restaurantListEachPage = action.searchRestaurantPerPage;
				break;
			}

			case types.GET_RESTAURANT_REVIEW_LIST_SUCCEEDED: {
				draft.restaurantReviewList = action.restaurantReviewList;
				break;
			}

			case types.REMOVE_RESTAURANT_REVIEW_LIST: {
				draft.restaurantReviewList = [];
				break;
			}

			case types.STORE_LIST_KEYWORD: {
				draft.listKeyWord = action.listKeyWord;
				break;
			}

			case types.ADD_STORE_LIST_KEYWORD: {
				draft.listKeyWord.push(action.keyword);
				break;
			}

			case types.DELETE_ITEM_STORE_LIST_KEYWORD: {
				const index = draft.listKeyWord.findIndex((item) => item === action.keyword);
				draft.listKeyWord.splice(index, 1);
				break;
			}

			case types.SAVE_RESTAURANT_SUCCEEDED: {
				draft.saveRestaurantList.push(action.restaurant);
				break;
			}

			case types.REMOVE_SAVE_RESTAURANT: {
				const index = draft.saveRestaurantList.findIndex(
					(restaurant) => restaurant._id === action.restaurant._id
				);
				draft.saveRestaurantList.splice(index, 1);
				break;
			}

			default:
				break;
		}
	});

export default restaurantReducer;
