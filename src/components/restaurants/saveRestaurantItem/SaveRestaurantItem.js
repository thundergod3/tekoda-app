import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import { useSelector, useDispatch } from "react-redux";

import "./SaveRestaurantItem.scss";
import StartIcon from "../../../assets/icons/star.png";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import utilAction from "../../../stores/redux/actions/utilAction";

const SaveRestaurantItem = ({ restaurant }) => {
	const {
		restaurantReducer: { saveRestaurantList },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { saveRestaurantRequest, getRestaurantSearchDetailRequest } = restaurantAction;
	const { loadingUI } = utilAction;
	const [like, setLike] = useState(false);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const {
		detail: { Name, Address, AvgRatingText, PriceRange, ResId },
		image_link,
	} = restaurant;

	let checkLike = false;

	for (let i = 0; i < saveRestaurantList.length; i++) {
		if (restaurant?.detail?.ResId === saveRestaurantList[i]?.detail?.ResId) checkLike = true;
	}

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
				className="save-restaurant-item"
				key={ResId}
				onClick={() => {
					dispatch(loadingUI());
					dispatch(getRestaurantSearchDetailRequest(ResId));
				}}>
				<img src={image_link[0]} alt={Name} className="save-restaurant-item__image" />
				<div className="save-restaurant-item__rightContainer">
					<div className="save-restaurant-item__rightBio">
						<div className="save-restaurant-item__rightBioContainer">
							<p className="save-restaurant-item__rightTitle">{Name}</p>
							<p className="save-restaurant-item__rightAdd">{Address}</p>
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
					<div className="save-restaurant-item__Info">
						<div className="save-restaurant-item__rating">
							<img src={StartIcon} alt={AvgRatingText} className="save-restaurant-item__ratingImage" />
							<span className="save-restaurant-item__ratingStart">{Math.floor(AvgRatingText)}</span>
							<span className="save-restaurant-item__ratingComment">
								({Math.floor(Math.random() * 100)} đánh giá)
							</span>
						</div>
						<div className="save-restaurant-item__price">
							<p>
								Giá: vnd {minPrice}k-{maxPrice}k
							</p>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SaveRestaurantItem;
