import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import RingIcon from "../../../assets/icons/ring.png";
import LocationIcon from "../../../assets/icons/location.png";

import "./SearchBar.scss";

import SearchIcon from "@material-ui/icons/Search";
import PreferenceItem from "../preferenceItem/PreferenceItem";

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

const listSearchLocation = [
	{
		title: "Hủ tiếu",
		icon: LocationIcon,
	},
	{
		title: "Hủ tiếu",
		icon: LocationIcon,
	},
];

const listSearchTime = [
	{
		title: "Bữa sáng",
		icon: RingIcon,
	},
	{
		title: "Bữa trưa",
		icon: RingIcon,
	},
	{
		title: "Bữa tối",
		icon: RingIcon,
	},
	{
		title: "Ăn đêm",
		icon: RingIcon,
	},
	{
		title: "Ăn vặt",
		icon: RingIcon,
	},
];

const SearchBar = () => {
	const popupDishesEl = useRef(null);
	const popupPreferenceEl = useRef(null);
	const popupAlreadyPreferenceEl = useRef(null);
	const popupLocationEl = useRef(null);
	const popupTimeEl = useRef(null);
	const [showSearchDishes, setShowSearchDishes] = useState(false);
	const [chooseDishes, setChooseDishes] = useState({});
	const [showSearchPreference, setShowSearchPreference] = useState(false);
	const [choosePreference, setChoosePreference] = useState([]);
	const [showSearchLocation, setShowSearchLocation] = useState(false);
	const [chooseLocation, setChooseLocation] = useState({});
	const [showSearchTime, setShowSearchTime] = useState(false);
	const [chooseTime, setChooseTime] = useState({});
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

	const handleOutSideClick = (e) => {
		if (
			(popupDishesEl.current && popupDishesEl.current.contains(e.target)) ||
			(popupLocationEl.current && popupLocationEl.current.contains(e.target)) ||
			(popupPreferenceEl.current && popupPreferenceEl.current.contains(e.target)) ||
			(popupTimeEl.current && popupTimeEl.current.contains(e.target))
		)
			return;

		setShowSearchDishes(false);
		setShowSearchPreference(false);
		setShowSearchLocation(false);
		setShowSearchTime(false);
	};

	const layoutSearchDishes = () => (
		<div className="layout-search layout-search__dishes" ref={popupDishesEl}>
			{listSearchDishes.map((dishes, index) => (
				<div className="layout-search__item" key={index} onClick={() => setChooseDishes(dishes)}>
					<img src={dishes.icon} alt={dishes.title} />
					<p className="layout-search__title">{dishes.title}</p>
				</div>
			))}
		</div>
	);

	const layoutSearchPreference = () => (
		<div className="layout-search__perference" ref={popupPreferenceEl}>
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

	const layoutSearchLocation = () => (
		<div className="layout-search layout-search__location" ref={popupLocationEl}>
			{listSearchLocation.map((location, index) => (
				<div className="layout-search__item" key={index} onClick={() => setChooseLocation(location)}>
					<img src={location.icon} alt={location.title} />
					<p className="layout-search__title">{location.title}</p>
				</div>
			))}
		</div>
	);

	const layoutSearchTime = () => (
		<div className="layout-search layout-search__time" ref={popupTimeEl}>
			{listSearchTime.map((time, index) => (
				<div className="layout-search__item" key={index} onClick={() => setChooseTime(time)}>
					<img src={time.icon} alt={time.title} />
					<p className="layout-search__title">{time.title}</p>
				</div>
			))}
		</div>
	);

	useEffect(() => {
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, []);

	return (
		<div className="search-bar">
			<div className="search-bar__container search-bar__formSearch" onClick={() => setShowSearchDishes(true)}>
				<p className="search-bar__containerTitle">Tìm món</p>
				{showSearchDishes && layoutSearchDishes()}
			</div>
			<div className="search-bar__container search-bar__taste" onClick={() => setShowSearchPreference(true)}>
				<p className="search-bar__containerTitle">Khẩu vị</p>
				<p className="search-bar__containerBio">Thêm khẩu vị</p>
				{showSearchPreference && layoutSearchPreference()}
			</div>
			<div className="search-bar__container search-bar__location" onClick={() => setShowSearchLocation(true)}>
				<p className="search-bar__containerTitle">địa điểm</p>
				<p className="search-bar__containerBio">Thêm địa điểm</p>
				{showSearchLocation && layoutSearchLocation()}
			</div>
			<div className="search-bar__container search-bar__time" onClick={() => setShowSearchTime(true)}>
				<div className="search-bar__timeWrapper">
					<p className="search-bar__containerTitle">thời gian</p>
					<p className="search-bar__containerBio">Thêm ngày</p>
					{showSearchTime && layoutSearchTime()}
				</div>
				<Link to="/today-eat">
					<div className="search-bar__searchButton">
						<SearchIcon />
						<span>Tìm kiếm</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default SearchBar;
