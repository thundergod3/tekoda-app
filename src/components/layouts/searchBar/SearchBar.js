import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import RingIcon from "../../../assets/icons/ring.png";
import LocationIcon from "../../../assets/icons/location.png";

import "./SearchBar.scss";

import SearchIcon from "@material-ui/icons/Search";
import PreferenceItem from "../../utils/preferenceItem/PreferenceItem";
import PopupSearch from "../../utils/popupSearch/PopupSearch";

const listSearchDishes = [
	{
		title: "Hủ tiếu",
		icon: RingIcon,
	},
	{
		title: "Phở",
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
];

const listSearchLocation = [
	{
		title: "Hủ tiếu",
		icon: LocationIcon,
	},
	{
		title: "Bánh tráng",
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
	const inputPeopleRef = useRef(null);
	const popupLocationEl = useRef(null);
	const popupTimeEl = useRef(null);
	const buttonSaveEl = useRef(null);
	const [showSearchDishes, setShowSearchDishes] = useState(false);
	const [choosePreference, setChoosePreference] = useState([]);
	const [peopleSearchText, setPeopleSearchText] = useState("");
	const [showSearchLocation, setShowSearchLocation] = useState(false);
	const [chooseLocation, setChooseLocation] = useState("");
	const [showSearchTime, setShowSearchTime] = useState(false);
	const [chooseTime, setChooseTime] = useState("");
	const dispatch = useDispatch();
	const { searchRestaurantRequest } = restaurantAction;
	const { loadingUI } = utilAction;

	const addPrefernce = (preference) => {
		let found = false;
		for (let i = 0; i < choosePreference.length; i++) {
			if (preference === choosePreference[i]) {
				found = true;
			}
		}

		if (found) {
			setChoosePreference(choosePreference.filter((item) => item !== preference));
		} else {
			setChoosePreference([...choosePreference, preference]);
		}
	};

	const layoutSearchDishes = () => (
		<div className="layout-search__dishesContainer" ref={popupDishesEl}>
			<div className="layout-search__dishes">
				{listSearchDishes.map((dishes, index) => (
					<div className="layout-search__item" key={index} onClick={() => addPrefernce(dishes.title)}>
						<img src={dishes.icon} alt={dishes.title} />
						<p className="layout-search__title">{dishes.title}</p>
					</div>
				))}
			</div>
			<div className="layout-search__perference">
				{listSearchPreference.map((preference, index) => (
					<div className="layout-search__perferenceWrapper" key={index}>
						<p className="layout-search__perfenceTitle">{preference.title}</p>
						<div className="layout-search__perfenceList">
							{preference.type_list.map((typeItem) => (
								<PreferenceItem
									key={typeItem.id}
									typeItem={typeItem}
									addPrefernce={addPrefernce}
									choosePreference={choosePreference}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<button
				ref={buttonSaveEl}
				className="layout-search__buttonSave"
				onClick={(e) => {
					e.stopPropagation();
					setShowSearchDishes(false);
					setChoosePreference([peopleSearchText, chooseLocation, chooseTime, ...choosePreference]);
					inputPeopleRef.current.focus();
				}}>
				Save
			</button>
		</div>
	);

	// Function
	const popUpSearchFunc = (e, itemTitle, typePopup) => {
		e.stopPropagation();
		switch (typePopup) {
			case "popupLocation": {
				setChooseLocation(itemTitle);
				setShowSearchLocation(false);
				setShowSearchTime(true);
				break;
			}

			case "popupTime": {
				setChooseTime(itemTitle);
				setShowSearchTime(false);
				break;
			}
		}
	};

	const handleOutSideClick = (e) => {
		if (
			(popupDishesEl.current && popupDishesEl.current.contains(e.target)) ||
			(popupLocationEl.current && popupLocationEl.current.contains(e.target)) ||
			(popupTimeEl.current && popupTimeEl.current.contains(e.target)) ||
			(buttonSaveEl.current && buttonSaveEl.current.contains(e.target))
		)
			return;
		else {
			setShowSearchDishes(false);
			setShowSearchLocation(false);
			setShowSearchTime(false);
		}
	};

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
				<p className="search-bar__containerBio">{choosePreference.map((preference) => `${preference}, `)}</p>
				{showSearchDishes && layoutSearchDishes()}
			</div>
			<div className="search-bar__container search-bar__people">
				<label htmlFor="peopleSearch" className="search-bar__containerTitle">
					Số người
				</label>
				<input
					ref={inputPeopleRef}
					type="text"
					className="layout-search__input"
					onChange={(e) => setPeopleSearchText(e.target.value)}
					value={peopleSearchText}
					placeholder="Thêm số người"
				/>
			</div>
			<div className="search-bar__container search-bar__location" onClick={() => setShowSearchLocation(true)}>
				<p className="search-bar__containerTitle">địa điểm</p>
				<p className="search-bar__containerBio">{chooseLocation !== "" ? chooseLocation : "Thêm địa điểm"}</p>
				{showSearchLocation && (
					<PopupSearch
						classPopup="layout-search__location"
						popupRef={popupLocationEl}
						listSearch={listSearchLocation}
						typePopup="popupLocation"
						popupFunction={popUpSearchFunc}
					/>
				)}
			</div>
			<div className="search-bar__container search-bar__time" onClick={() => setShowSearchTime(true)}>
				<div className="search-bar__timeWrapper">
					<p className="search-bar__containerTitle" id="popup-time">
						thời gian
					</p>
					<p className="search-bar__containerBio">{chooseTime !== "" ? chooseTime : "Thêm ngày"}</p>
					{showSearchTime && (
						<PopupSearch
							classPopup="layout-search__time"
							popupRef={popupTimeEl}
							listSearch={listSearchTime}
							typePopup="popupTime"
							popupFunction={popUpSearchFunc}
						/>
					)}
				</div>
				<Link
					to={`/today-eat/${[
						...choosePreference,
						`${peopleSearchText} người`,
						chooseLocation !== "" ? chooseLocation : null,
						chooseTime !== "" ? chooseTime : null,
					].join("+")}`}
					onClick={() => {
						dispatch(loadingUI());
						dispatch(
							searchRestaurantRequest([
								...choosePreference,
								`${peopleSearchText} người`,
								chooseLocation,
								chooseTime,
							])
						);
					}}>
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
