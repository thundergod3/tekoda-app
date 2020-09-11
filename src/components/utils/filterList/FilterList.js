import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import utilAction from "../../../stores/redux/actions/utilAction";

import NoodleBlackImg from "../../../assets/icons/noodle.png";
import NoodleWhiteImg from "../../../assets/icons/noodle2.png";
import MilkTeaImg from "../../../assets/icons/milktea.png";
import BurgerImg from "../../../assets/icons/burger.png";

import "./FIlterList.scss";

import FilterOption from "../filterOption/FilterOption";

const filterList = [
	{
		title: "Cơm bình dân",
		icon: NoodleBlackImg,
	},
	{
		title: "Bún đậu mắm tôm",
		icon: NoodleWhiteImg,
	},
	{
		title: "Trà sữa",
		icon: MilkTeaImg,
	},
	{
		title: "Đồ chay",
		icon: NoodleBlackImg,
	},
	{
		title: "Các loại Bánh mỳ",
		icon: BurgerImg,
	},
	{
		title: "Làm tôi bất ngờ!",
		icon: NoodleBlackImg,
	},
];

const FilterList = () => {
	const dispatch = useDispatch();
	const { loadingUI } = utilAction;

	return (
		<div className="filter-list">
			{filterList.map((option, index) => (
				<Link to={`/today-eat/${option.title}`} key={index} onClick={() => dispatch(loadingUI())}>
					<FilterOption option={option} />
				</Link>
			))}
		</div>
	);
};

export default FilterList;
