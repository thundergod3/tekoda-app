import React from "react";

import "./RestaurantSearchDetail.scss";
import MoneyIcon from "../../../assets/icons/money.png";
import numeral from "numeral";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import SearchIcon from "@material-ui/icons/Search";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import { withStyles } from "@material-ui/core/styles";

import UserReviewList from "../userReviewList/UserReviewList";

const listRating = [
	{
		title: "Mức độ sạch sẽ",
		rate: 4.3,
	},
	{
		title: "Độ chính xác",
		rate: 4.2,
	},
	{
		title: "Liên lạc",
		rate: 4.8,
	},
	{
		title: "Vị trí",
		rate: 4.9,
	},
	{
		title: "Nhận phòng",
		rate: 4.8,
	},
	{
		title: "Giá trị",
		rate: 4.5,
	},
];

const RestaurantSearchDetail = ({ searchPageRef }) => {
	const {
		restaurantReducer: { restaurantSearchDetail, restaurantReviewList },
		utilReducer: { active },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { saveRestaurantRequest, searchRestaurantRequest, getAllSearchRestaurantRequest } = restaurantAction;
	const { loadingUI } = utilAction;

	return (
		<>
			{Object.keys(restaurantSearchDetail).length !== 0 && (
				<div
					className={`restaurant-search-detail ${active === true ? "restaurant-search-detail--active" : ""}`}>
					<div className="restaurant-search-detail__container" ref={searchPageRef}>
						<p className="restaurant-search-detail__title">{restaurantSearchDetail?._source.Name}</p>
						<p className="restaurant-search-detail__bio">{restaurantSearchDetail?._source.Address}</p>
						<div className="restaurant-search-detail__info">
							<div className="restaurant-search-detail__price">
								<img src={MoneyIcon} alt="money" className="restaurant-search-detail__priceIcon" />
								<span className="restaurant-search-detail__priceMin">
									{numeral(100000).format("0,0")}đ
								</span>
								<span>-</span>
								<span className="restaurant-search-detail__priceMax">
									{numeral(400000).format("0,0")}đ
								</span>
							</div>
						</div>
						<div className="restaurant-search-detail__description">
							{restaurantSearchDetail?._source?.descriptionList.map((description, index) => (
								<div key={index} className="restaurant-search-detail__descriptionContainer">
									<img src={description.icon} alt="" />
									<div className="restaurant-search-detail__descriptionInfo">
										<p className="restaurant-search-detail__descriptionInfoTitle">
											{description.title}
										</p>
										<p className="restaurant-search-detail__descriptionInfoBio">
											{description.desc}
										</p>
									</div>
								</div>
							))}
						</div>
						<div className="restaurant-search-detail__imageContainer">
							<img
								src={restaurantSearchDetail?._source.image}
								alt={restaurantSearchDetail?._source.Name}
								className="restaurant-search-detail__bigImage"
							/>
							<div className="restaurant-search-detail__imageSmaliList">
								<img
									src={restaurantSearchDetail?._source.image}
									alt={restaurantSearchDetail?._source.Name}
									className="restaurant-search-detail__imageSmallTitle"
								/>
								<div className="restaurant-search-detail__imageSmallContainer">
									<img
										src={restaurantSearchDetail?._source.image}
										alt={restaurantSearchDetail?._source.Name}
										className="restaurant-search-detail__imageSmall"
									/>
									<img
										src={restaurantSearchDetail?._source.image}
										alt={restaurantSearchDetail?._source.Name}
										className="restaurant-search-detail__imageSmall"
									/>
								</div>
							</div>
						</div>
						<div className="restaurant-search-detail__reviewContainer">
							<p className="restaurant-search-detail__reviewRate">
								{restaurantSearchDetail?._source?.AvgRating} out of 10 stars from{" "}
								{restaurantReviewList.length} reviews
							</p>
							<div className="restaurant-search-detail__reviewListRate">
								{listRating.map((rating, index) => (
									<div className="restaurant-search-detail__reviewItemRate" key={index}>
										<p className="restaurant-search-detail__reviewItemRateTitle">{rating.title}</p>
										<div className="restaurant-search-detail__reviewItemRateContainer">
											<div className="restaurant-seearch-detail__reviewPercentWrapper">
												<span className="restaurant-seearch-detail__reviewPercentBefore"></span>
												<span
													className="restaurant-seearch-detail__reviewPercentAfter"
													style={{ width: `${(rating.rate / 5) * 100}%` }}></span>
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
					<div className="restaurant-search-detail__buttonContainer">
						<div
							className="restaurant-search-detail__button"
							onClick={() => {
								dispatch(loadingUI());
								dispatch(searchRestaurantRequest([restaurantSearchDetail?._source.Name]));
								dispatch(getAllSearchRestaurantRequest([restaurantSearchDetail?._source.Name]));
							}}>
							<SearchIcon />
							<p className="restaurant-search-detail__buttonTitle">Tìm nhà hàng tương tự</p>
						</div>
						<div
							className="restaurant-search-detail__button"
							onClick={() => dispatch(saveRestaurantRequest(restaurantSearchDetail?._id))}>
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
