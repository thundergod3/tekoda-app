import React from "react";

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
	return (
		<div className="filter-list">
			{filterList.map((option, index) => (
				<FilterOption key={index} option={option} />
			))}
		</div>
	);
};

export default FilterList;
