import React from "react";

import "./UserReviewItem.scss";
import moment from "moment";
import "moment/locale/vi";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const userNameList = [
	{
		name: "Ngọc Hưng",
	},
	{
		name: "Việt Anh",
	},
	{
		name: "Đức Duy",
	},
	{
		name: "Ngọc Bá",
	},
	{
		name: "Văn Minh",
	},
	{
		name: "Trung Dũng",
	},
	{
		name: "Văn Đạt",
	},
	{
		name: "Ngọc Hà",
	},
	{
		name: "Thu Hiền",
	},
	{
		name: "Thu Hà",
	},
	{
		name: "Thu Diệu",
	},
	{
		name: "Kiều Anh",
	},
	{
		name: "Ngọc Mỹ",
	},
	{
		name: "Thị Phương",
	},
	{
		name: "Minh Thu",
	},
	{
		name: "Ngọc Mai",
	},
];

const UserReviewItem = ({ userReview: { CreatedDate, Description, Id } }) => {
	return (
		<div className="user-review-item" key={Id}>
			<div className="user-review-item__info">
				<AccountCircleIcon className="user-review-item__avatar" />
				<div className="user-review-item__bio">
					<p className="user-review-item__username">{userNameList[Math.floor(Math.random() * 15)].name}</p>
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
