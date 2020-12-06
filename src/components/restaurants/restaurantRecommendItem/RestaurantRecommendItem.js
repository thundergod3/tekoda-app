import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import "./RestaurantRecommendItem.scss";
import numeral from "numeral";

import star from "../../../assets/icons/star.png";
import defaultImage from "../../../assets/restaurants/restaurant1.png";

const RestaurantRecommendItem = ({ restaurant }) => {
	const {
		detail: { ResId, Name, AvgRatingText, Address, PriceRange },
		image_link,
	} = restaurant;
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest } = restaurantAction;
	const { loadingUI } = utilAction;
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);

	useEffect(() => {
		const splitPrice = PriceRange?.split("-");
		const tempMinPrice = splitPrice ? splitPrice[0]?.split("đ")[0].split(".")[0] : 0;
		const tempMaxPrice = splitPrice ? splitPrice[1]?.split("đ")[0].split(".")[0] : 0;

		setMinPrice(tempMinPrice);
		setMaxPrice(tempMaxPrice);
	}, [restaurant]);

	return (
		<Link to={`/today-eat/${restaurant.detail.ResId}/page=1`}>
			<div
				key={ResId}
				className="restaurant-recommend-item"
				onClick={() => {
					dispatch(loadingUI());
					dispatch(getRestaurantSearchDetailRequest(ResId));
				}}>
				<img
					src={!image_link ? defaultImage : image_link[0]}
					alt={Name}
					style={{ ...(!image_link ? { height: "240px", objectFit: "cover" } : {}) }}
				/>
				<div className="restaurant-recommend-item__info">
					<div className="restaurant-recommend-item__rating">
						<img src={star} alt={star} className="restaurant-recommend-item__star" />
						<span className="restaurant-recommend-item__rateStar">{AvgRatingText}</span>
						<span className="restaurant-recommend-item__comment">
							{Math.floor(Math.random() * 100)} (đánh giá)
						</span>
					</div>
					<p className="restaurant-recommend-item__location">{Name}</p>
					<p className="restaurant-recommend-item__desc">{Address}</p>
					<p className="restaurant-recommend-item__price">
						{" "}
						Giá: {minPrice}k-{maxPrice}k
					</p>
				</div>
			</div>
		</Link>
	);
};

export default RestaurantRecommendItem;
