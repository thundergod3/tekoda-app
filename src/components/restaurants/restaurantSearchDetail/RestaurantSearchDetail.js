import React, { useState, useEffect } from "react";

import "./RestaurantSearchDetail.scss";
import MoneyIcon from "../../../assets/icons/money.png";
import CheckIcon from "../../../assets/icons/check.png";
import numeral from "numeral";
import defaultImage from "../../../assets/restaurants/restaurant1.png";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import UserReviewList from "../userReviewList/UserReviewList";
import { Link } from "react-router-dom";

const RestaurantSearchDetail = ({ searchPageRef }) => {
	const {
		restaurantReducer: { restaurantSearchDetail, restaurantReviewList, saveRestaurantList },
		utilReducer: { active },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { saveRestaurantRequest, searchRestaurantRequest, getAllSearchRestaurantRequest } = restaurantAction;
	const { loadingUI } = utilAction;
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const [save, setSave] = useState(false);
	const [checkSave, setCheckSave] = useState(false);
	const [searchKeywordSimilar, setSearchKeywordSimilar] = useState("");

	useEffect(() => {
		const findIndex = saveRestaurantList.findIndex(
			(item) => item?.detail?.ResId === restaurantSearchDetail?.detail?.ResId
		);
		const splitPrice = restaurantSearchDetail?.detail?.PriceRange?.split("-");
		const tempMinPrice = splitPrice ? splitPrice[0]?.split("đ")[0] : 0;
		const tempMaxPrice = splitPrice ? splitPrice[1]?.split("đ")[0] : 0;

		if (findIndex !== -1) {
			setSave(true);
			setCheckSave(true);
		} else {
			setCheckSave(false);
			setSave(false);
		}

		setMinPrice(tempMinPrice);
		setMaxPrice(tempMaxPrice);
	}, [saveRestaurantList, restaurantSearchDetail]);

	useEffect(() => {
		let tempRestaurantSearchDetail = restaurantSearchDetail?.detail?.Category.split("'");

		if (tempRestaurantSearchDetail) {
			tempRestaurantSearchDetail.shift();
			tempRestaurantSearchDetail.pop();
			setSearchKeywordSimilar(tempRestaurantSearchDetail);
		}
	}, [restaurantSearchDetail]);

	console.log(searchKeywordSimilar);

	return (
		<>
			{Object.keys(restaurantSearchDetail).length !== 0 && restaurantSearchDetail?.detail ? (
				<div
					className={`restaurant-search-detail ${active === true ? "restaurant-search-detail--active" : ""}`}>
					<div className="restaurant-search-detail__container" ref={searchPageRef}>
						<p className="restaurant-search-detail__title">{restaurantSearchDetail?.detail?.Name}</p>
						<p className="restaurant-search-detail__bio">{restaurantSearchDetail?.detail?.Address}</p>
						<div className="restaurant-search-detail__info">
							<div className="restaurant-search-detail__price">
								<img src={MoneyIcon} alt="money" className="restaurant-search-detail__priceIcon" />
								<span className="restaurant-search-detail__priceMin">
									{numeral(minPrice * 1000).format("0,0")}đ
								</span>
								<span>-</span>
								<span className="restaurant-search-detail__priceMax">
									{numeral(maxPrice * 1000).format("0,0")}đ
								</span>
							</div>
						</div>
						<div className="restaurant-search-detail__imageContainer">
							<img
								src={
									!restaurantSearchDetail.image_link
										? defaultImage
										: restaurantSearchDetail?.image_link[0]
								}
								alt={restaurantSearchDetail?.detail?.Name}
								className="restaurant-search-detail__image"
							/>
							<img
								src={
									!restaurantSearchDetail.image_link
										? defaultImage
										: restaurantSearchDetail?.image_link[1]
								}
								alt={restaurantSearchDetail?.detail?.Name}
								className="restaurant-search-detail__image"
							/>
							<img
								src={
									!restaurantSearchDetail.image_link
										? defaultImage
										: restaurantSearchDetail?.image_link[2]
								}
								alt={restaurantSearchDetail?.detail?.Name}
								className="restaurant-search-detail__image"
							/>
							<img
								src={
									!restaurantSearchDetail.image_link
										? defaultImage
										: restaurantSearchDetail?.image_link[3]
								}
								alt={restaurantSearchDetail?.detail?.Name}
								className="restaurant-search-detail__image"
							/>
						</div>
						<div className="restaurant-search-detail__buttonContainer">
							<div
								className="restaurant-search-detail__button"
								onClick={() => {
									dispatch(loadingUI());
									dispatch(searchRestaurantRequest(searchKeywordSimilar));
									dispatch(getAllSearchRestaurantRequest(searchKeywordSimilar));
								}}>
								<SearchIcon />
								<p className="restaurant-search-detail__buttonTitle">Tìm nhà hàng tương tự</p>
							</div>
							<div
								className="restaurant-search-detail__button"
								onClick={() => {
									setSave(!save);
									setCheckSave(!checkSave);
									dispatch(saveRestaurantRequest(restaurantSearchDetail));
								}}>
								{checkSave ? (
									<>
										{!save ? (
											<>
												<BookmarkBorderIcon />
												<p className="restaurant-search-detail__buttonTitle">
													Lưu vào danh sách
												</p>
											</>
										) : (
											<>
												<img src={CheckIcon} alt="check" />
												<p className="restaurant-search-detail__buttonTitle">
													Đã lưu thành công, xem{" "}
													<Link to="/save-restaurant" onClick={(e) => e.stopPropagation()}>
														danh sách
													</Link>
												</p>
											</>
										)}
									</>
								) : (
									<>
										<BookmarkBorderIcon />
										<p className="restaurant-search-detail__buttonTitle">Lưu vào danh sách</p>
									</>
								)}
							</div>
						</div>
						<div className="restaurant-search-detail__reviewContainer">
							<p className="restaurant-search-detail__reviewRate">
								{restaurantSearchDetail?.detail?.AvgRatingText} out of 10 stars from{" "}
								{restaurantReviewList.length} reviews
							</p>
							<div className="restaurant-search-detail__reviewListRate">
								{restaurantSearchDetail.listRating.map((rating, index) => (
									<div className="restaurant-search-detail__reviewItemRate" key={index}>
										<p className="restaurant-search-detail__reviewItemRateTitle">{rating.title}</p>
										<div className="restaurant-search-detail__reviewItemRateContainer">
											<div className="restaurant-seearch-detail__reviewPercentWrapper">
												<span className="restaurant-seearch-detail__reviewPercentBefore"></span>
												<span
													className="restaurant-seearch-detail__reviewPercentAfter"
													style={{ width: `${(rating.rate / 10) * 100}%` }}></span>
											</div>
											<p className="restaurant-search-detail__reviewItemRateScore">
												{rating.rate}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<UserReviewList />
					</div>
				</div>
			) : (
				<div className="restaurant-search-detail__notFound">
					Rất tiếc, nhà hàng bạn muốn không nằm trong danh sách.
				</div>
			)}
		</>
	);
};

export default RestaurantSearchDetail;
