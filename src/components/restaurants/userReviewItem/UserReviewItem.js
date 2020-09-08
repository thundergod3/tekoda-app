import React from "react";

import "./USerReviewItem.scss";

const UserReviewItem = ({ userReview: { username, image, time, review } }) => {
	return (
		<div className="user-review-item">
			<div className="user-review-item__info">
				<img src={image} alt={username} className="user-review-item__avatar" />
				<div className="user-review-item__bio">
					<p className="user-review-item__username">{username}</p>
					<p className="user-review-item__time">{time}</p>
				</div>
			</div>
			<p className="user-review-item__review">{review}</p>
		</div>
	);
};

export default UserReviewItem;
