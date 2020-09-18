import React from "react";

import { useSelector } from "react-redux";

import SaveRestaurantItem from "../saveRestaurantItem/SaveRestaurantItem";

import "./SaveRestaurantList.scss";

const SaveRestaurantList = () => {
	const {
		restaurantReducer: { saveRestaurantList },
	} = useSelector((state) => state);

	return (
		<div className="save-restaurant-list">
			{saveRestaurantList.map((restaurant) => (
				<SaveRestaurantItem key={restaurant._id} restaurant={restaurant} />
			))}
		</div>
	);
};

export default SaveRestaurantList;
