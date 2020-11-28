import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";
import utilAction from "../../../stores/redux/actions/utilAction";

import RingIcon from "../../../assets/icons/ring.png";

import "./SearchBar.scss";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Geocode from "react-geocode";
import history from "../../../constants/history";

import SearchIcon from "@material-ui/icons/Search";
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import PreferenceItem from "../../utils/preferenceItem/PreferenceItem";
import PopupSearch from "../../utils/popupSearch/PopupSearch";
import getLocation from "../../../helpers/getLocation";

Geocode.setApiKey("AIzaSyAHF5sU-uXkvCZ6L1ieDNBwOhERg3moCkg");
Geocode.enableDebug();

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

const checkFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const SearchBar = ({ style, setShowSearchBar, searchBarItemRef, showSearchBar }) => {
	const {
		authReducer: { authenticated },
	} = useSelector((state) => state);
	const popupDishesEl = useRef(null);
	const inputPeopleRef = useRef(null);
	const popupTimeEl = useRef(null);
	const buttonSaveEl = useRef(null);
	const [showSearchDishes, setShowSearchDishes] = useState(showSearchBar ? showSearchBar : false);
	const [choosePreference, setChoosePreference] = useState([]);
	const [peopleSearchText, setPeopleSearchText] = useState("");
	const [showSearchTime, setShowSearchTime] = useState(false);
	const [chooseTime, setChooseTime] = useState("");
	const [searchAnyDishes, setSearchAnyDishes] = useState("");
	const [searchAdd, setSearchAdd] = useState("");
	const dispatch = useDispatch();
	const { searchRestaurantRequest, storeListKeyword } = restaurantAction;
	const { loadingUI } = utilAction;

	const layoutSearchDishes = () => (
		<div className="layout-search__dishesContainer" ref={popupDishesEl}>
			{window.innerWidth > 300 && window.innerWidth < 420 && (
				<>
					<HighlightOffIcon
						onClick={(e) => {
							e.stopPropagation();
							setShowSearchDishes(false);
						}}
					/>
					<div className="search-bar__locationMobile">
						<p className="search-bar__containerTitle">địa điểm</p>
						<PlacesAutocomplete value={searchAdd} onChange={handleChange} onSelect={handleSelect}>
							{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
								<div>
									<div className="search-address__container">
										<RoomIcon />
										<input
											id="address"
											{...getInputProps({
												placeholder: "Nhập địa điểm của bạn",
												className: "location-search-input",
											})}
										/>
									</div>
									<div className="autocomplete-dropdown-container">
										{suggestions.map((suggestion) => {
											const style = suggestion.active
												? { backgroundColor: "#fafafa", cursor: "pointer" }
												: { backgroundColor: "#ffffff", cursor: "pointer" };
											return (
												<div
													className="survey-page_suggestion"
													{...getSuggestionItemProps(suggestion, {
														style,
													})}>
													<span>{suggestion.description}</span>
												</div>
											);
										})}
									</div>
								</div>
							)}
						</PlacesAutocomplete>
					</div>
				</>
			)}
			<div className="layout-search__perference">
				{listSearchPreference.map((preference, index) => (
					<div className="layout-search__perferenceWrapper" key={index}>
						<p className="layout-search__perfenceTitle">{preference.title}</p>
						<div className="layout-search__perfenceList">
							{preference.type_list.map((typeItem) => (
								<PreferenceItem
									key={typeItem.id}
									typeItem={typeItem}
									choosePreference={choosePreference}
									setChoosePreference={setChoosePreference}
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
					setChoosePreference(choosePreference);
					inputPeopleRef.current.focus();
				}}>
				Save
			</button>
		</div>
	);

	// Function
	const popUpSearchFunc = (e, itemTitle) => {
		e.stopPropagation();
		setChooseTime(itemTitle);
		setShowSearchTime(false);
	};

	const handleOutSideClick = (e) => {
		if (
			(popupDishesEl.current && popupDishesEl.current.contains(e.target)) ||
			(popupTimeEl.current && popupTimeEl.current.contains(e.target)) ||
			(buttonSaveEl.current && buttonSaveEl.current.contains(e.target))
		)
			return;
		else {
			setShowSearchDishes(false);
			setShowSearchTime(false);
		}
	};

	const handleChange = (address) => {
		setSearchAdd(address);
	};

	const handleSelect = (address) => {
		setSearchAdd(address);
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.catch((error) => console.error("Error", error));
	};

	const handleSearch = (e) => {
		if (!checkFormat.test(searchAnyDishes) && !checkFormat.test(peopleSearchText)) {
			e.stopPropagation();
			dispatch(loadingUI());
			dispatch(
				storeListKeyword(
					[
						searchAnyDishes,
						...choosePreference,
						peopleSearchText !== "" ? `${peopleSearchText} người` : "",
						chooseTime !== "" ? chooseTime : "",
					].filter((item) => item !== "")
				)
			);
			dispatch(
				searchRestaurantRequest(
					[
						searchAnyDishes,
						...choosePreference,
						peopleSearchText !== "" ? `${peopleSearchText} người` : "",
						chooseTime !== "" ? chooseTime : "",
					].filter((item) => item !== "")
				)
			);

			if (setShowSearchBar !== undefined) setShowSearchBar(false);

			history.push(
				`/today-eat/${[
					searchAnyDishes,
					...choosePreference,
					peopleSearchText !== "" ? `${peopleSearchText} người` : "",
					chooseTime !== "" ? chooseTime : "",
				]
					.filter((item) => item !== "")
					.join("+")}/page=1`
			);
		}
	};

	const handleCheckDisabledButton = () =>
		choosePreference.length === 0 &&
		chooseTime === "" &&
		checkFormat.test(searchAnyDishes === "" ? " " : searchAnyDishes) &&
		checkFormat.test(peopleSearchText === "" ? " " : peopleSearchText);

	useEffect(() => {
		if (authenticated) getLocation(setSearchAdd);
	}, []);

	useEffect(() => {
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, []);

	return (
		<div className="search-bar" style={style}>
			<div className="search-bar__container search-bar__formSearch" onClick={() => setShowSearchDishes(true)}>
				<p className="search-bar__containerTitle">Tìm món</p>
				<input
					ref={searchBarItemRef}
					type="text"
					className="search-bar__containerBio search-bar__containerInput"
					value={searchAnyDishes}
					onChange={(e) => setSearchAnyDishes(e.target.value)}
					onKeyDown={(e) => {
						if (e.keyCode === 13) {
							handleSearch(e);
						}
					}}
					style={{ width: "max-content" }}
					placeholder="Bạn muốn ăn gì?"
				/>
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
					onKeyDown={(e) => {
						if (e.keyCode === 13) {
							handleSearch(e);
						}
					}}
					value={peopleSearchText}
					placeholder="Thêm số người"
				/>
			</div>
			<div className="search-bar__container search-bar__location">
				<p className="search-bar__containerTitle">địa điểm</p>
				<PlacesAutocomplete value={searchAdd} onChange={handleChange} onSelect={handleSelect}>
					{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
						<div>
							<input
								placeholder="Chọn địa điểm"
								{...getInputProps({
									className: "search-bar__containerBio",
									style: { width: "calc(85%)", textTransform: "capitalize" },
								})}
							/>
							{suggestions.length !== 0 && (
								<div className="layout-search" style={{ width: "400px", paddingTop: "15px" }}>
									{suggestions.map((suggestion) => {
										const className = suggestion.active
											? "suggestion-item--active"
											: "suggestion-item";
										// inline style for demonstration purpose
										const style = suggestion.active
											? { backgroundColor: "#fafafa", cursor: "pointer" }
											: { backgroundColor: "#ffffff", cursor: "pointer" };
										return (
											<div
												className="layout-search__location"
												{...getSuggestionItemProps(suggestion, {
													style,
												})}>
												{suggestion.description}
											</div>
										);
									})}
								</div>
							)}
						</div>
					)}
				</PlacesAutocomplete>
			</div>
			<div className="search-bar__container search-bar__time">
				<div className="search-bar__timeWrapper" onClick={() => setShowSearchTime(true)}>
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
			</div>
			<Link
				to={`/today-eat/${[
					searchAnyDishes,
					...choosePreference,
					peopleSearchText !== "" ? `${peopleSearchText} người` : "",
					chooseTime !== "" ? chooseTime : "",
				]
					.filter((item) => item !== "")
					.join("+")}/page=1`}
				onClick={handleSearch}>
				<button
					className={`search-bar__searchButton ${handleCheckDisabledButton() ? "button--disable" : ""}`}
					disabled={handleCheckDisabledButton() ? true : false}>
					<SearchIcon />
					<span>Tìm kiếm</span>
				</button>
			</Link>
		</div>
	);
};

export default SearchBar;
