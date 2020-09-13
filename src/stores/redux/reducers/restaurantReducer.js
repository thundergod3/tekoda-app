import * as types from "../../../constants/types";

import restaurant from "../../../assets/restaurants/restaurant1.png";
import restaurant2 from "../../../assets/restaurants/restaurant2.png";
import restaurant3 from "../../../assets/restaurants/restaurant3.png";
import home from "../../../assets/icons/home.png";

const initialState = {
	restaurantList: [],
	restaurantListEachPage: [],
	restaurantSearchDetail: {},
	statusSurvey: localStorage.getItem("statusSurvey") ? JSON.parse(localStorage.getItem("statusSurvey")) : false,
};

const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.FETCH_LIST_RESTAURANT_SUCCEEDED: {
			return {
				...state,
				restaurantList: action.restaurantList,
			};
		}

		case types.FETCH_LIST_RESTAURANT_PER_PAGE_SUCCEEDED: {
			return {
				...state,
				restaurantListEachPage: action.restaurantListEachPage,
				restaurantSearchDetail: {
					...action.restaurantListEachPage[0],
					_source: {
						...action.restaurantListEachPage[0]._source,
						image: restaurant,
						optionList: [
							{
								title: "Inspiration",
							},
							{
								title: "Pizza",
							},
						],
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
				},
			};
		}

		case types.GET_RESTAURANT_SEARCH_DETAIL_SUCCEEDED: {
			return {
				...state,
				restaurantSearchDetail: {
					...action.restaurantSearchDetail,
					_source: {
						...action.restaurantSearchDetail._source,
						image: restaurant,
						optionList: [
							{
								title: "Inspiration",
							},
							{
								title: "Pizza",
							},
						],
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
				},
			};
		}

		case types.SEND_SURVEY_FORM_SUCCEEDED: {
			return {
				...state,
				statusSurvey: true,
			};
		}

		case types.SEARCH_RESTAURANT_SUCCEEDED: {
			return {
				...state,
				restaurantListEachPage: action.restaurantSearchList,
				restaurantSearchDetail: {
					...action.restaurantSearchList[0],
					_source: {
						...action.restaurantSearchList[0]._source,
						image: restaurant,
						optionList: [
							{
								title: "Inspiration",
							},
							{
								title: "Pizza",
							},
						],
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
				},
			};
		}

		default: {
			return state;
		}
	}
};

export default restaurantReducer;
