import React from "react";

import { useSelector } from "react-redux";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import "./restaurants.scss";
import history from "../../constants/history";

import SaveRestaurantList from "../../components/restaurants/saveRestaurantList/SaveRestaurantList";

const SaveRestaurantPage = () => {
	const {
		restaurantReducer: { saveRestaurantList },
	} = useSelector((state) => state);

	return (
		<div className="save-restaurant-page">
			<div className="save-restaurant-page__backPage" onClick={() => history.goBack()}>
				<ArrowBackIosIcon />
				<p className="save-restaurant-page__backPageTitle">Quay lại </p>
			</div>
			<p className="save-restaurant-page__title">Danh sách nhà hàng đã lưu</p>
			{saveRestaurantList.length === 0 ? (
				<p className="save-restaurant-page__warning">Danh sách lưu nhà hàng của bạn hiện đang trống</p>
			) : (
				<SaveRestaurantList />
			)}
		</div>
	);
};

export default SaveRestaurantPage;
