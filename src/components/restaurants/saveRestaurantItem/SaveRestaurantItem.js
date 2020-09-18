import React, { useState } from "react";

import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import { useSelector, useDispatch } from "react-redux";

import "./SaveRestaurantItem.scss";
import StartIcon from "../../../assets/icons/star.png";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

const SaveRestaurantItem = ({ restaurant }) => {
	const {
		restaurantReducer: { saveRestaurantList },
	} = useSelector((state) => state);
	const [like, setLike] = useState(false);
	const dispatch = useDispatch();
	const { saveRestaurantRequest } = restaurantAction;
	const { Name, PhotoUrl, Address, AvgRatingText } = restaurant?._source;

	let checkLike = false;

	for (let i = 0; i < saveRestaurantList.length; i++) {
		if (restaurant._id === saveRestaurantList[i]?._id) checkLike = true;
	}

	return (
		<div className="save-restaurant-item">
			<img src={PhotoUrl} alt={Name} className="save-restaurant-item__image" />
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
				<div className="save-restaurant-item__rating">
					<img src={StartIcon} alt={AvgRatingText} className="save-restaurant-item__ratingImage" />
					<span className="save-restaurant-item__ratingStart">{AvgRatingText}</span>
					<span className="save-restaurant-item__ratingComment">(110 đánh giá)</span>
				</div>
			</div>
		</div>
	);
};

export default SaveRestaurantItem;
