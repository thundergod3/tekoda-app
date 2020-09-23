import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import RoomIcon from "@material-ui/icons/Room";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";

import logoWhite from "../../assets/icons/Vector.png";
import "./restaurants.scss";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Geocode from "react-geocode";
import cookieLocal from "../../helpers/cookieLocal";

Geocode.setApiKey("AIzaSyAHF5sU-uXkvCZ6L1ieDNBwOhERg3moCkg");
Geocode.enableDebug();

const listRestaurant = [
	{
		title: "món âu",
		img: "",
	},
	{
		title: "hải sản",
		img: "",
	},
	{
		title: "lẩu nướng",
		img: "",
	},
	{
		title: "đồ chay",
		img: "",
	},
	{
		title: "nhậu/ bia hơi",
		img: "",
	},
	{
		title: "bình dân",
		img: "",
	},
	{
		title: "ăn vặt",
		img: "",
	},
	{
		title: "trendy",
		img: "",
	},
	{
		title: "mới nổi",
		img: "",
	},
];

const surveyAgeList = [
	{
		id: 1,
		age: "0 - 13",
	},
	{
		id: 2,
		age: "13 - 18",
	},
	{
		id: 3,
		age: "19 - 29",
	},
	{
		id: 4,
		age: "30 - 39",
	},
	{
		id: 5,
		age: "40+",
	},
];

const surveyGenderList = [
	{
		id: 1,
		gender: "Name",
	},
	{
		id: 2,
		gender: "Nữ",
	},
	{
		id: 3,
		gender: "Khác",
	},
];

const SurveyPage = () => {
	const {
		authReducer: { authenticated },
		restaurantReducer: { statusSurvey },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { sendSurveyFormRequest } = restaurantAction;
	const [username, setUsername] = useState("");
	const [searchAdd, setSearchAdd] = useState("");
	const [currentDrawer, setCurrentDrawer] = useState(1);
	const [chooseAge, setChooseAge] = useState("");
	const [chooseGender, setChooseGender] = useState("");
	const [chooseRestaurant, setChooseRestaurant] = useState([]);

	useEffect(() => {
		if (currentDrawer === 2) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
						(response) => {
							if (response.status === "OK") {
								const address = response.results[0].formatted_address;
								const streetName = response.results[0].address_components[2].short_name;
								setSearchAdd(address);
								cookieLocal.saveToLocal("street", streetName);
							}
						},
						(error) => {
							console.error(error);
						}
					);
				},
				(err) => {
					console.log(err);
				}
			);
		}
	}, [currentDrawer]);

	const nextDrawer = () => {
		if (currentDrawer >= 3) {
			return;
		}
		setCurrentDrawer(currentDrawer + 1);
	};

	const preDrawer = () => {
		if (currentDrawer <= 1) {
			return;
		}
		setCurrentDrawer(currentDrawer - 1);
	};

	if (authenticated === false) return <Redirect to="/login" />;

	if (authenticated === true && statusSurvey === true) return <Redirect to="/" />;

	const handleChange = (address) => {
		setSearchAdd(address);
	};

	const handleSelect = (address) => {
		setSearchAdd(address);
		geocodeByAddress(address)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				Geocode.fromLatLng(latLng.lat, latLng.lng).then(
					(response) => {
						const address = response?.results[0]?.formatted_address;
						const streetName = response?.results[0]?.address_components[2]?.short_name;
						cookieLocal.saveToLocal("street", streetName);
					},
					(error) => {
						console.error(error);
					}
				);
			})
			.catch((error) => console.error("Error", error));
	};

	const handleChooseRestaurant = (restaurant) => {
		let found = false;
		for (let k = 0; k < chooseRestaurant.length; k++) {
			if (restaurant.title === chooseRestaurant[k]?.title) {
				found = true;
			}
		}

		if (chooseRestaurant.length < 5) {
			if (found) {
				setChooseRestaurant(chooseRestaurant.filter((item) => item.title !== restaurant.title));
			} else {
				setChooseRestaurant([...chooseRestaurant, restaurant]);
			}
		} else {
			setChooseRestaurant(chooseRestaurant.filter((item) => item.title !== restaurant.title));
			return;
		}
	};

	return (
		<>
			{authenticated !== undefined && (
				<div className="survey-page">
					<div className="drawer-sidebar-left">
						<div className="drawer-sidebar__navbarleft">
							<img src={logoWhite} alt="Logo" />
							<p>TekodaApp </p>
						</div>
						<div className="drawer-sidebar__info">
							{(currentDrawer === 1 || currentDrawer === 2) && (
								<>
									<h4>Bước vào thế giới ẩm thực được cá nhân hóa theo sở thích của bạn!</h4>
									<p>
										Lựa chọn những quán ăn theo sở thích của bạn để chúng tôi gợi ý cho bạn những
										nhà hàng phù hợp nhất
									</p>
								</>
							)}
							{currentDrawer === 3 && (
								<>
									<h4>Chọn quán ăn theo sở thích của bạn</h4>
									<p>
										Lựa chọn những quán ăn theo sở thích của bạn để chúng tôi gợi ý cho bạn những
										nhà hàng phù hợp nhất
									</p>
								</>
							)}
						</div>
					</div>
					<div className="drawer-sidebar-right">
						{currentDrawer === 1 && (
							<div className="drawer-sidebar-right__form">
								<label htmlFor="username">Hãy cho chúng mình biết tên của bạn nhé!</label>
								<input
									id="username"
									type="text"
									placeholder="Tên bạn ..."
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
								<div className="drawer-sidebar-right__formAgeTitle">Bạn trong nhóm tuổi nào</div>
								<div className="drawer-sidebar-right__formAge">
									{surveyAgeList.map((age) => (
										<div
											className={`drawer-sidebar-right__formAgeItem ${
												chooseAge.age === age.age ? "choose--active" : ""
											}`}
											key={age.id}
											onClick={() => setChooseAge(age)}>
											{age.age}
										</div>
									))}
								</div>
								<div className="drawer-sidebar-right__formGenderTitle">Giới tính</div>
								<div className="drawer-sidebar-right__formGender">
									{surveyGenderList.map((gender) => (
										<div
											className={`drawer-sidebar-right__formGenderItem ${
												chooseGender.gender === gender.gender ? "choose--active" : ""
											}`}
											key={gender.id}
											onClick={() => setChooseGender(gender)}>
											{gender.gender}
										</div>
									))}
								</div>
							</div>
						)}
						{currentDrawer === 2 && (
							<div className="drawer-sidebar-right__form">
								<label htmlFor="address">
									Hãy cho chúng mình biết địa điểm của bạn để hiển thị kết quả chính xác hơn với bạn
								</label>
								<PlacesAutocomplete value={searchAdd} onChange={handleChange} onSelect={handleSelect}>
									{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
										<div>
											<input
												{...getInputProps({
													placeholder: "Nhập địa điểm ...",
													className: "location-search-input",
												})}
											/>
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
															<RoomIcon />
															<span>{suggestion.description}</span>
														</div>
													);
												})}
											</div>
										</div>
									)}
								</PlacesAutocomplete>
							</div>
						)}
						{currentDrawer === 3 && (
							<>
								<p className="drawer-sidebar-right__title">
									Hãy chọn tối thiểu 5 nhóm nhà hàng bạn thích
								</p>
								<div className="drawer-sidebar-right__listRestaurant">
									{listRestaurant.map((restaurant, index) => {
										let chooseRestaurantActive = "";

										for (let i = 0; i < chooseRestaurant.length; i++) {
											if (chooseRestaurant[i].title === restaurant.title)
												chooseRestaurantActive = "choose--active";
										}

										return (
											<div
												key={index}
												className={`drawer-sidebar-right__itemRestaurant ${chooseRestaurantActive}`}
												onClick={() => handleChooseRestaurant(restaurant)}>
												<p>{restaurant.title}</p>
											</div>
										);
									})}
								</div>
							</>
						)}
						<div className="drawer-sidebar__footer">
							<button className="drawer-sidebar__buttonBack" onClick={preDrawer}>
								Trở lại
							</button>
							{currentDrawer === 3 ? (
								<button
									className="drawer-sidebar__buttonNext"
									onClick={() =>
										dispatch(
											sendSurveyFormRequest({
												username,
												address: searchAdd,
												age: chooseAge,
												gender: chooseGender,
											})
										)
									}>
									Hoàn thành
								</button>
							) : (
								<button
									className={`drawer-sidebar__buttonNext ${
										currentDrawer === 2 && searchAdd === "" ? "button--disable" : ""
									}`}
									onClick={nextDrawer}
									disabled={currentDrawer === 2 && searchAdd === "" ? true : false}>
									Tiếp theo
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SurveyPage;
