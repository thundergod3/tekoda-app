import React, { useState, useRef, useEffect } from "react";

import "./RestaurantSearchFilterList.scss";
import RingIcon from "../../../assets/icons/ring.png";

import AddBoxIcon from "@material-ui/icons/AddBox";

import RestaurantSearchFilterOption from "../restaurantSearchFilterOption/RestaurantSearchFilterOption";
import PreferenceItem from "../../layouts/preferenceItem/PreferenceItem";

const listFilter = [
	{
		title: "Nhóm 3 người",
	},
	{
		title: "Thoáng đãng",
	},
	{
		title: "Giá sinh viên",
	},
];

const listSearchDishes = [
	{
		title: "Hủ tiếu",
		icon: RingIcon,
	},
	{
		title: "Hủ tiếu",
		icon: RingIcon,
	},
];

const listSearchPreference = [
	{
		title: "Loại cơ sở",
		type_list: [
			{
				id: 1,
				title: "Nhà hàng",
			},
			{
				id: 2,
				title: "Quán bình dân",
			},
			{
				id: 3,
				title: "Quán bar",
			},
			{
				id: 4,
				title: "Căng tin",
			},
			{
				id: 5,
				title: "Quán cà phê",
			},
		],
	},
	{
		title: "Bữa ăn",
		type_list: [
			{
				id: 6,
				title: "Bữa sáng",
			},
			{
				id: 7,
				title: "Bữa trưa",
			},
			{
				id: 8,
				title: "Bữa tối",
			},
			{
				id: 9,
				title: "Bữa nửa đêm",
			},
		],
	},
	{
		title: "Chi phí",
		type_list: [
			{
				id: 10,
				title: "Giá rẻ",
			},
			{
				id: 11,
				title: "Hạng trung",
			},
			{
				id: 12,
				title: "Sang trọng",
			},
		],
	},
	{
		title: "Phong cách ẩm thực",
		type_list: [
			{
				id: 13,
				title: "Món á",
			},
			{
				id: 14,
				title: "Món địa phương",
			},
			{
				id: 15,
				title: "Món Món Âu",
			},
		],
	},
	{
		title: "Không gian",
		type_list: [
			{
				id: 16,
				title: "Ngoài trời",
			},
			{
				id: 17,
				title: "Trong nhà",
			},
			{
				id: 18,
				title: "Ấm cúng",
			},
			{
				id: 19,
				title: "Không gian thoáng",
			},
		],
	},
	{
		title: "Bữa ăn",
		type_list: [
			{
				id: 20,
				title: "Bữa sáng",
			},
			{
				id: 21,
				title: "Bữa sáng",
			},
			{
				id: 23,
				title: "Bữa sáng",
			},
		],
	},
];

const RestaurantSearchFilterList = () => {
	const [showSearchPreference, setShowSearchPreference] = useState(false);
	const [choosePreference, setChoosePreference] = useState([]);
	const popupPreferenceEl = useRef(null);
	const closePreferenceEl = useRef(null);
	const [idChoose, setChoose] = useState(0);

	const addPrefernce = (preference) => {
		let found = false;
		for (let i = 0; i < choosePreference.length; i++) {
			if (preference.id === choosePreference[i].id) {
				found = true;
			}
		}

		if (found) {
			setChoosePreference(choosePreference.filter((item) => item.id !== preference.id));
		} else {
			setChoose(preference.id);
			setChoosePreference([...choosePreference, preference]);
		}
	};

	const layoutSearchPreference = () => (
		<div className="layout-search__perference layout-search__perferenceAddFilter" ref={popupPreferenceEl}>
			{listSearchPreference.map((preference, index) => (
				<div className="layout-search__perferenceWrapper" key={index}>
					<p className="layout-search__perfenceTitle">{preference.title}</p>
					<div className="layout-search__perfenceList">
						{preference.type_list.map((typeItem) => (
							<PreferenceItem
								key={typeItem.id}
								typeItem={typeItem}
								addPrefernce={addPrefernce}
								idChoose={idChoose}
								choosePreference={choosePreference}
							/>
						))}
					</div>
				</div>
			))}
			<button className="layout-search__perferenceSave">Save</button>
		</div>
	);

	const handleOutSideClick = (e) => {
		if (popupPreferenceEl.current && popupPreferenceEl.current.contains(e.target) || closePreferenceEl.current && closePreferenceEl.current.contains(e.target)) return;
		else setShowSearchPreference(false);
	};

	const handleShowSearchPerference = (e) => {
		if (showSearchPreference) setShowSearchPreference(false)
		else setShowSearchPreference(true)
	}


	useEffect(() => {
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, []);

	return (
		<div className="search-restaurant-search-filter-list">
			<div className="search-restaurant-search-filter-list__container">
				{listFilter.map((filter, index) => (
					<RestaurantSearchFilterOption key={index} filter={filter} />
				))}
			</div>
			<div
				className="search-restaurant-search__buttonAdd"
				onClick={() => handleShowSearchPerference()}
				ref={closePreferenceEl}>
				<span>Thêm filters</span>
				<AddBoxIcon />
				{showSearchPreference && layoutSearchPreference()}
			</div>
		</div>
	);
};

export default RestaurantSearchFilterList;
