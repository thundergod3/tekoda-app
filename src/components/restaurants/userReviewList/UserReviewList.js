import React from "react";

import user1 from "../../../assets/users/user1.png";
import user2 from "../../../assets/users/user2.png";
import "./UserReviewList.scss";

import UserReviewItem from "../userReviewItem/UserReviewItem";

const userReviewList = [
	{
		username: "Dinh",
		image: user1,
		time: "tháng 7 năm 2020",
		review: "Ngay giữa phố cổ, tiện ăn uống, đi dạo loanh quanh",
	},
	{
		username: "Trung",
		image: user2,
		time: "tháng 6 năm 2020",
		review:
			"The service was really good. The only thing I thought it could improve was the light in the hallway could be fixed so that I don’t have to use flash light to walk upstairs.",
	},
	{
		username: "Dinh",
		image: user1,
		time: "tháng 7 năm 2020",
		review: "Ngay giữa phố cổ, tiện ăn uống, đi dạo loanh quanh",
	},
	{
		username: "Trung",
		image: user2,
		time: "tháng 6 năm 2020",
		review:
			"The service was really good. The only thing I thought it could improve was the light in the hallway could be fixed so that I don’t have to use flash light to walk upstairs.",
	},
	{
		username: "Dinh",
		image: user1,
		time: "tháng 7 năm 2020",
		review: "Ngay giữa phố cổ, tiện ăn uống, đi dạo loanh quanh",
	},
	{
		username: "Trung",
		image: user2,
		time: "tháng 6 năm 2020",
		review:
			"The service was really good. The only thing I thought it could improve was the light in the hallway could be fixed so that I don’t have to use flash light to walk upstairs.",
	},
];

const UserReviewList = () => {
	return (
		<>
			<div className="user-review-list">
				{userReviewList.map((userReview, index) => (
					<UserReviewItem key={index} userReview={userReview} />
				))}
			</div>
			<button className="user-review-list__moreReview">Hiển thị tất cả 153 đánh giá</button>
		</>
	);
};

export default UserReviewList;
