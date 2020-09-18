import React, { useRef } from "react";

import "./RestaurantFilterItem.scss";
import star from "../../../assets/icons/star.png";
import numeral from "numeral";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import { useDispatch } from "react-redux";

const RestaurantFilterItem = ({
	restaurant: { Name, AvgRatingText, comments, Address, PhotoUrl },
	id,
	scrollTopRestaurantDetail,
}) => {
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest } = restaurantAction;

	return (
		<div
			className="restaurant-filter-item"
			onClick={() => {
				dispatch(getRestaurantSearchDetailRequest(id));
				setTimeout(() => {
					scrollTopRestaurantDetail();
				}, 200);
			}}>
			<img src={PhotoUrl} alt={Name} className="restaurant-filter-item__image" />
			<div className="restaurant-filter-item__info">
				<div className="restaurant-filter-item__infoNavbar">
					<div className="restaurant-filter-item__infoNavbarContainer">
						<p className="restaurant-filter-item__infoNavTitle">{Name}</p>
						<p className="restaurant-filter-item__infoNavBio">T{Address}</p>
					</div>
					<FavoriteBorderIcon />
				</div>
				<div className="restaurant-filter-item__infoFooter">
					<div className="restaurant-filter-item__rating">
						<img src={star} alt={star} className="restaurant-filter-item__star" />
						<span className="restaurant-filter-item__rateStar">{AvgRatingText}</span>
						<span className="restaurant-filter-item__comment">(110 đánh giá)</span>
					</div>
					<p className="restaurant-filter-item__price">Giá: vnd 100-400k</p>
				</div>
			</div>
		</div>
	);
};

export default RestaurantFilterItem;
