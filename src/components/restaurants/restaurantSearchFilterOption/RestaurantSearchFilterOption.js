import React from "react";

import "./RestaurantSearchFilterOption.scss";

const RestaurantSearchFilterOption = ({ title }) => {
	return (
		<>
			{title !== "" && (
				<button className="restaurant-search-filter-option">
					<p className="restaurant-search-filter-option__title">{title}</p>
				</button>
			)}
		</>
	);
};

export default RestaurantSearchFilterOption;
