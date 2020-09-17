import React from "react";

import "./USerReviewItem.scss";
import moment from "moment";
import "moment/locale/vi";

import user1 from "../../../assets/users/user1.png";

const UserReviewItem = ({
	userReview: {
		_source: { CreatedDate, Description },
	},
}) => {
	return (
		<div className="user-review-item">
			<div className="user-review-item__info">
				<img src={user1} alt="Cong" className="user-review-item__avatar" />
				<div className="user-review-item__bio">
					<p className="user-review-item__username">Cong</p>
					<p className="user-review-item__time">
						{moment(CreatedDate)
							.format("MMMM YYYY")
							.split(" ")
							.slice(0, 2)
							.map((time) => (
								<>{time} </>
							))}
						năm {moment(CreatedDate).format("MMMM YYYY").split(" ").slice(2, 3)}
					</p>
				</div>
			</div>
			<p className="user-review-item__review">{Description}</p>
		</div>
	);
};

export default UserReviewItem;
