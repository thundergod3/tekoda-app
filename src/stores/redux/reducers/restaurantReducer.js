import * as types from "../../../constants/types";
import produce from "immer";

import collectionImage1 from "../../../assets/utils/collection_image1.png";
import collectionImage2 from "../../../assets/utils/collection_image2.png";
import collectionImage3 from "../../../assets/utils/collection_image3.png";
import collectionImage4 from "../../../assets/utils/collection_image4.png";
import collectionImage5 from "../../../assets/utils/collection_image5.png";

const listCollectionImage = [
	collectionImage1,
	collectionImage2,
	collectionImage3,
	collectionImage4,
	collectionImage5,
];

const initialState = {
	restaurantList: [],
	restaurantListEachPage: [],
	restaurantSearchDetail: {},
	saveRestaurantList: [],
	trendingRestaurantList: [],
	locationRestaurantList: [],
	behaviorRestaurantList: [],
	collectionRestaurantList: [],
	collectionList: [],
	statusSurvey: false,
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

			case types.FETCH_RECOMMEND_TRENDING_RESTAURANT_GUESS_SUCCEEDED:
			case types.FETCH_RECOMMEND_TRENDING_RESTAURANT_SUCCEEDED: {
				draft.trendingRestaurantList = [
					...action.trendingRestaurantList,
					...action.trendingRestaurantList,
				];
				break;
			}

			case types.FETCH_RECOMMEND_LOCATION_RESTAURANT_SUCCEEDED: {
				draft.locationRestaurantList = action.locationRestaurantList;
				break;
			}

			case types.FETCH_RECOMMEND_BEHAVIOR_RESTAURANT_SUCCEEDED: {
				draft.behaviorRestaurantList = action.behaviorRestaurantList;
				break;
			}

			case types.FETCH_LIST_RESTAURANT_PER_PAGE_SUCCEEDED: {
				draft.restaurantListEachPage = action.restaurantListEachPage;
				break;
			}

			case types.GET_LIST_COLLECTION_SUCCEEDED: {
				draft.collectionList = action.collectionList.map((item, index) => {
					return {
						...item,
						collection_image: listCollectionImage[index],
					};
				});
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
					listRating: [
						{
							title: "Đồ ăn",
							rate: action.restaurantSearchDetail?.detail?.QualityScore,
						},
						{
							title: "Dịch vụ",
							rate: action.restaurantSearchDetail?.detail?.ServiceScore,
						},
						{
							title: "Vị trí",
							rate: action.restaurantSearchDetail?.detail?.LocationScore,
						},
						{
							title: "Không gian",
							rate: action.restaurantSearchDetail?.detail?.SpaceScore,
						},
						{
							title: "Giá cả",
							rate: action.restaurantSearchDetail?.detail?.PriceScore,
						},
					],
				};
				draft.listKeyWord = [];
				break;
			}

			case types.SEND_SURVEY_FORM_SUCCEEDED: {
				draft.statusSurvey = true;
				break;
			}
			case types.SEND_SURVEY_FORM_FAILED: {
				draft.statusSurvey = false;
				break;
			}

			case types.GET_ALL_SEARCH_RESTAURANT_SUCCEEDED: {
				draft.restaurantList = action.allSearchRestaurant;
				break;
			}

			case types.SEARCH_RESTAURANT_SUCCEEDED: {
				draft.restaurantSearchDetail = {
					...action.restaurantSearchList[0],
					listRating: [
						{
							title: "Đồ ăn",
							rate: action.restaurantSearchList[0]?.detail?.QualityScore,
						},
						{
							title: "Dịch vụ",
							rate: action.restaurantSearchList[0]?.detail?.ServiceScore,
						},
						{
							title: "Vị trí",
							rate: action.restaurantSearchList[0]?.detail?.LocationScore,
						},
						{
							title: "Không gian",
							rate: action.restaurantSearchList[0]?.detail?.SpaceScore,
						},
						{
							title: "Giá cả",
							rate: action.restaurantSearchList[0]?.detail?.PriceScore,
						},
					],
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
			case types.DELETE_STORE_LIST_KEYWORD: {
				draft.listKeyWord = [];
				break;
			}
			case types.DELETE_ITEM_STORE_LIST_KEYWORD: {
				const index = draft.listKeyWord.findIndex(
					(item) => item === action.keyword
				);
				draft.listKeyWord.splice(index, 1);
				break;
			}

			case types.SAVE_RESTAURANT_SUCCEEDED: {
				draft.saveRestaurantList.push(action.restaurant);
				break;
			}

			case types.REMOVE_SAVE_RESTAURANT: {
				const index = draft.saveRestaurantList.findIndex(
					(restaurant) => restaurant.ResId === action.restaurant.ResId
				);
				console.log(index);
				draft.saveRestaurantList.splice(index, 1);
				break;
			}

			case types.SEND_REVIEW_SUCCEEDED: {
				console.log("action", action);
				draft.restaurantReviewList.push(action.reviewBody);
				break;
			}

			default:
				break;
		}
	});

export default restaurantReducer;
