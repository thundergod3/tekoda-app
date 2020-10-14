import React, { useRef, useState } from "react";

import { useSelector } from "react-redux";

import "./RestaurantFilterItem.scss";
import star from "../../../assets/icons/star.png";
import numeral from "numeral";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import { useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

const RestaurantFilterItem = ({ restaurant, scrollTopRestaurantDetail }) => {
	const {
		restaurantReducer: { saveRestaurantList },
	} = useSelector((state) => state);
	const [like, setLike] = useState(false);
	const { Name, AvgRatingText, comments, Address, PhotoUrl } = restaurant;
	const dispatch = useDispatch();
	const { getRestaurantSearchDetailRequest, saveRestaurantRequest } = restaurantAction;
	const { showActive } = utilAction;

	let checkLike = false;

	for (let i = 0; i < saveRestaurantList.length; i++) {
		if (saveRestaurantList[i]._id && restaurant._id === saveRestaurantList[i]._id) checkLike = true;
	}

	return (
		<div
			className="restaurant-filter-item"
			onClick={() => {
				dispatch(showActive());
				dispatch(getRestaurantSearchDetailRequest(restaurant?._id));
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
						<span className="restaurant-filter-item__comment">(110 đánh giá)</span>
					</div>
					<p className="restaurant-filter-item__price">Giá: vnd 100-400k</p>
				</div>
			</div>
		</div>
	);
};

export default RestaurantFilterItem;
