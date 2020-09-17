import React from "react";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import "./restaurants.scss";

import SaveRestaurantList from "../../components/restaurants/saveRestaurantList/SaveRestaurantList";

const SaveRestaurantPage = () => {
	return (
		<div className="save-restaurant-page">
			<div className="save-restaurant-page__backPage">
				<ArrowBackIosIcon />
				<p className="save-restaurant-page__backPageTitle">Quay lại </p>
			</div>
			<p className="save-restaurant-page__title">Danh sách nhà hàng đã lưu</p>
			<SaveRestaurantList />
		</div>
	);
};

export default SaveRestaurantPage;
