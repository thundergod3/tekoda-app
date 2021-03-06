import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import "./RestaurantFilterItem.scss";
import defaultImage from "../../../assets/restaurants/restaurant1.png";
import star from "../../../assets/icons/star.png";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const RestaurantFilterItem = ({ restaurant, scrollTopRestaurantDetail }) => {
	const {
		restaurantReducer: { saveRestaurantList },
	} = useSelector((state) => state);
	const [like, setLike] = useState(false);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const {
		detail: { ResId, Name, AvgRatingText, Address, PriceRange },
		image_link,
	} = restaurant;
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest, saveRestaurantRequest } = restaurantAction;
	const { showActive } = utilAction;

	let checkLike = false;

	for (let i = 0; i < saveRestaurantList.length; i++) {
		if (saveRestaurantList[i]?.detail?.ResId && ResId === saveRestaurantList[i]?.detail?.ResId) checkLike = true;
	}

	useEffect(() => {
		const splitPrice = PriceRange?.split("-");
		const tempMinPrice = splitPrice ? splitPrice[0]?.split("đ")[0].split(".")[0] : 0;
		const tempMaxPrice = splitPrice ? splitPrice[1]?.split("đ")[0].split(".")[0] : 0;

		setMinPrice(tempMinPrice);
		setMaxPrice(tempMaxPrice);
	}, [restaurant]);

	return (
		<div
			key={ResId}
			className="restaurant-filter-item"
			onClick={() => {
				dispatch(showActive());
				dispatch(getRestaurantSearchDetailRequest(ResId));
				setTimeout(() => {
					scrollTopRestaurantDetail();
				}, 200);
			}}>
			<img
				src={!image_link ? defaultImage : image_link[0]}
				alt={Name}
				className="restaurant-filter-item__image"
			/>
			<div className="restaurant-filter-item__info">
				<div className="restaurant-filter-item__infoNavbar">
					<div className="restaurant-filter-item__infoNavbarContainer">
						<p className="restaurant-filter-item__infoNavTitle">{Name}</p>
						<p className="restaurant-filter-item__infoNavBio">T{Address}</p>
					</div>
					{!checkLike ? (
						<>
							{!like ? (
								<FavoriteBorderIcon
									onClick={(e) => {
										e.stopPropagation();
										setLike(true);
										dispatch(saveRestaurantRequest(restaurant));
									}}
								/>
							) : (
								<FavoriteIcon
									onClick={(e) => {
										e.stopPropagation();
										setLike(false);
										dispatch(saveRestaurantRequest(restaurant));
									}}
								/>
							)}
						</>
					) : (
						<FavoriteIcon
							onClick={(e) => {
								e.stopPropagation();
								setLike(false);
								dispatch(saveRestaurantRequest(restaurant));
							}}
						/>
					)}
				</div>
				<div className="restaurant-filter-item__infoFooter">
					<div className="restaurant-filter-item__rating">
						<img src={star} alt={star} className="restaurant-filter-item__star" />
						<span className="restaurant-filter-item__rateStar">{Math.floor(AvgRatingText)}</span>
						<span className="restaurant-filter-item__comment">
							({Math.floor(Math.random() * 100)} đánh giá)
						</span>
					</div>
					<p className="restaurant-filter-item__price">
						Giá: {minPrice}k-{maxPrice}k
					</p>
				</div>
			</div>
		</div>
	);
};

export default RestaurantFilterItem;
