import React from "react";

import "./RestaurantSearchDetail.scss";
import MoneyIcon from "../../../assets/icons/money.png";
import numeral from "numeral";

import { useSelector } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

const RestaurantSearchDetail = () => {
	const {
		restaurantReducer: { restaurantSearchDetail },
		utilReducer: { loadingList },
	} = useSelector((state) => state);

	let loadingRestaurantSearchDetail;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "getRestaurantDetail") loadingRestaurantSearchDetail = loadingList[i].loading;
	}

	console.log(loadingRestaurantSearchDetail);

	return (
		<>
			{Object.keys(restaurantSearchDetail).length !== 0 && (
				<div
					className={`restaurant-search-detail ${
						loadingRestaurantSearchDetail !== undefined && loadingRestaurantSearchDetail === true
							? "restaurant-search-detail--active"
							: ""
					}`}>
					<p className="restaurant-search-detail__title">{restaurantSearchDetail.title}</p>
					<p className="restaurant-search-detail__bio">{restaurantSearchDetail.location}</p>
					<div className="restaurant-search-detail__info">
						<div className="restaurant-search-detail__filterContainer">
							{restaurantSearchDetail?.optionList.map((option, index) => (
								<div key={index} className="restaurant-search-detail__filterOption">
									<p>{option.title}</p>
								</div>
							))}
						</div>
						<div className="restaurant-search-detail__price">
							<img src={MoneyIcon} alt="money" className="restaurant-search-detail__priceIcon" />
							<span className="restaurant-search-detail__priceMin">
								{numeral(restaurantSearchDetail?.priceMin).format("0,0")}đ
							</span>
							<span>-</span>
							<span className="restaurant-search-detail__priceMax">
								{numeral(restaurantSearchDetail?.priceMax).format("0,0")}đ
							</span>
						</div>
					</div>
					<div className="restaurant-search-detail__description">
						{restaurantSearchDetail?.descriptionList.map((description, index) => (
							<div key={index} className="restaurant-search-detail__descriptionContainer">
								<img src={description.icon} alt="" />
								<div className="restaurant-search-detail__descriptionInfo">
									<p className="restaurant-search-detail__descriptionInfoTitle">
										{description.title}
									</p>
									<p className="restaurant-search-detail__descriptionInfoBio">{description.desc}</p>
								</div>
							</div>
						))}
					</div>
					<div className="restaurant-search-detail__imageContainer">
						<img
							src={restaurantSearchDetail.image}
							alt={restaurantSearchDetail.title}
							className="restaurant-search-detail__bigImage"
						/>
						<div className="restaurant-search-detail__imageSmaliList">
							<img
								src={restaurantSearchDetail.image}
								alt={restaurantSearchDetail.title}
								className="restaurant-search-detail__imageSmallTitle"
							/>
							<div className="restaurant-search-detail__imageSmallContainer">
								<img
									src={restaurantSearchDetail.image}
									alt={restaurantSearchDetail.title}
									className="restaurant-search-detail__imageSmall"
								/>
								<img
									src={restaurantSearchDetail.image}
									alt={restaurantSearchDetail.title}
									className="restaurant-search-detail__imageSmall"
								/>
							</div>
						</div>
					</div>
					<div className="restaurant-search-detail__buttonContainer">
						<div className="restaurant-search-detail__button">
							<SearchIcon />
							<p className="restaurant-search-detail__buttonTitle">Tìm nhà hàng tương tự</p>
						</div>
						<div className="restaurant-search-detail__button">
							<BookmarkBorderIcon />
							<p className="restaurant-search-detail__buttonTitle">Lưu vào danh sách</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default RestaurantSearchDetail;
