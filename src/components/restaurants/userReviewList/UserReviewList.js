import React from "react";

import { useSelector } from "react-redux";

import "./UserReviewList.scss";

import UserReviewItem from "../userReviewItem/UserReviewItem";

const UserReviewList = () => {
	const {
		restaurantReducer: { restaurantReviewList },
	} = useSelector((state) => state);
	return (
		<>
			<div className="user-review-list">
				{restaurantReviewList.length !== 0 &&
					restaurantReviewList.map((userReview, index) => (
						<>{userReview._source.Description && <UserReviewItem key={index} userReview={userReview} />}</>
					))}
			</div>
			{restaurantReviewList.length === 8 && (
				<button className="user-review-list__moreReview">Hiển thị tất cả 153 đánh giá</button>
			)}
		</>
	);
};

export default UserReviewList;
