import React from "react";

import "./RestaurantSearchFilterList.scss";
import AddBoxIcon from "@material-ui/icons/AddBox";

import RestaurantSearchFilterOption from "../restaurantSearchFilterOption/RestaurantSearchFilterOption";

const listFilter = [
	{
		title: "Nhóm 3 người",
	},
	{
		title: "Thoáng đãng",
	},
	{
		title: "Giá sinh viên",
	},
];

const RestaurantSearchFilterList = () => {
	return (
		<div className="search-restaurant-search-filter-list">
			<div className="search-restaurant-search-filter-list__container">
				{listFilter.map((filter, index) => (
					<RestaurantSearchFilterOption key={index} filter={filter} />
				))}
			</div>
			<div className="search-restaurant-search__buttonAdd">
				<span>Thêm filters</span>
				<AddBoxIcon />
			</div>
		</div>
	);
};

export default RestaurantSearchFilterList;
