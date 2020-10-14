import React from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import utilAction from "../../../stores/redux/actions/utilAction";

import NoodleBlackImg from "../../../assets/icons/noodle.png";
import NoodleWhiteImg from "../../../assets/icons/noodle2.png";
import BankMiImg from "../../../assets/icons/banh_mi.png";
import MilkTeaImg from "../../../assets/icons/milktea.png";
import DoChayImg from "../../../assets/icons/do_chay.png";
import StreetFoodImg from "../../../assets/icons/street_food.png";
import SurpriseImg from "../../../assets/icons/surprise.png";
import SunImg from "../../../assets/icons/sun.png";

import "./FIlterList.scss";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import FilterOption from "../filterOption/FilterOption";

const filterList = [
	{
		title: "Cơm bình dân",
		icon: NoodleBlackImg,
	},
	{
		title: "Bún/Phở",
		icon: NoodleWhiteImg,
	},
	{
		title: "Bánh mì",
		icon: BankMiImg,
	},
	{
		title: "Đồ chay",
		icon: DoChayImg,
	},
	{
		title: "Trà sữa",
		icon: MilkTeaImg,
	},
	{
		title: "Vỉa hè",
		icon: StreetFoodImg,
	},
	{
		title: "Làm tôi bất ngờ!",
		icon: SurpriseImg,
	},
];

const FilterList = () => {
	const {
		authReducer: { userData },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { loadingUI } = utilAction;

	return (
		<div className="filter-list">
			<div className="filter-list__welcome">
				<img src={SunImg} className="filter-list__welcomeImg" />
				<div className="filter-list__welcomeBio">
					<p className="filter-list__welcomeText">
						Chào buổi sáng {userData.name ? `,${userData.name}!` : ""}{" "}
						<strong>Khám phá ẩm thực cùng Tekoda!</strong>
					</p>
					<div className="filter-list__welcomeBioExpand">
						<p className="filter-list__welcomeBioExpandText">Xem thêm gợi ý</p>
						<ExpandMoreIcon />
					</div>
				</div>
			</div>
			<div className="filter-list__optionContainer">
				{filterList.map((option, index) => (
					<Link to={`/today-eat/${option.title.split("/").join(" ")}/page=1`} key={index} onClick={() => dispatch(loadingUI())}>
						<FilterOption option={option} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default FilterList;
