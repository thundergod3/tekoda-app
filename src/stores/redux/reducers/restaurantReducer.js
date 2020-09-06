import * as types from "../../../constants/types";

import restaurant from "../../../assets/restaurants/restaurant1.png";
import restaurant2 from "../../../assets/restaurants/restaurant2.png";
import restaurant3 from "../../../assets/restaurants/restaurant3.png";
import home from "../../../assets/icons/home.png";

const initialState = {
	foodList: [],
	restaurantFilterList: [
		{
			id: 1,
			title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
			rates: 4.7,
			comments: 110,
			location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
			image: restaurant,
			optionList: [
				{
					title: "Inspiration",
				},
				{
					title: "Pizza",
				},
			],
			priceMin: 100000,
			priceMax: 400000,
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
		{
			id: 2,
			title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
			rates: 4.7,
			comments: 110,
			location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
			image: restaurant2,
			optionList: [
				{
					title: "Inspiration",
				},
				{
					title: "Pizza",
				},
			],
			priceMin: 100000,
			priceMax: 400000,
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
		{
			id: 3,
			title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
			rates: 4.7,
			comments: 110,
			location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
			image: restaurant3,
			optionList: [
				{
					title: "Inspiration",
				},
				{
					title: "Pizza",
				},
			],
			priceMin: 100000,
			priceMax: 400000,
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
		{
			id: 4,
			title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
			rates: 4.7,
			comments: 110,
			location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
			image: restaurant,
			optionList: [
				{
					title: "Inspiration",
				},
				{
					title: "Pizza",
				},
			],
			priceMin: 100000,
			priceMax: 400000,
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
		{
			id: 5,
			title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
			rates: 4.7,
			comments: 110,
			location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
			image: restaurant,
			optionList: [
				{
					title: "Inspiration",
				},
				{
					title: "Pizza",
				},
			],
			priceMin: 100000,
			priceMax: 400000,
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
		{
			id: 6,
			title: "Langmandi -Beca Room, Pretty House in Centre Hanoi",
			rates: 4.7,
			comments: 110,
			location: "T116C5 Nghĩa Tân, Quận Cầu Giấy, Hà Nội",
			image: restaurant,
			optionList: [
				{
					title: "Inspiration",
				},
				{
					title: "Pizza",
				},
			],
			priceMin: 100000,
			priceMax: 400000,
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
	],
	restaurantSearchDetail: {},
};

const restaurantReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST: {
			return {
				...state,
				restaurantSearchDetail: state.restaurantFilterList.filter(
					(restaurant) => action.id === restaurant.id
				)[0],
			};
		}

		default: {
			return state;
		}
	}
};

export default restaurantReducer;
