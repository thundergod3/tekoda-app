import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import monAuImg from "../../assets/restaurants/mon_au.png";
import monAImg from "../../assets/restaurants/mon_a.png";
import nhaHangSangTrongImg from "../../assets/restaurants/nha_hang_sang_trong.png";
import dacSanVungMineImg from "../../assets/restaurants/dac_san_vung_mien.png";
import quanNhauImg from "../../assets/restaurants/mon_nhau.png";
import comVanPhongImg from "../../assets/restaurants/com_van_phong.png";
import quanBinhDanImg from "../../assets/restaurants/quan_binh_dan.png";
import quanVieHeImg from "../../assets/restaurants/quan_via_he.png";
import buffetImg from "../../assets/restaurants/buffet.png";
import fastFoodImg from "../../assets/restaurants/fast_food.png";
import lauNuongImg from "../../assets/restaurants/lau_nuong.png";
import doChayImg from "../../assets/restaurants/do_chay.png";
import coffeeImg from "../../assets/restaurants/coffee.png";
import traBanhImg from "../../assets/restaurants/tra_banh.png";
import barPubImg from "../../assets/restaurants/bar_pub.png";
import xuHuongImg from "../../assets/restaurants/xu_huong.png";

import RoomIcon from "@material-ui/icons/Room";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";

import logoWhite from "../../assets/icons/Vector.png";
import "./restaurants.scss";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Geocode from "react-geocode";
import saveLocal from "../../helpers/saveLocal";
import { handleCheckActiveItem, handleChooseItem } from "../../helpers/handleChangeActive";

Geocode.setApiKey("AIzaSyAHF5sU-uXkvCZ6L1ieDNBwOhERg3moCkg");
Geocode.enableDebug();

const listRestaurant = [
	{
		title: "món âu",
		img: monAuImg,
	},
	{
		title: "món á",
		img: monAImg,
	},
	{
		title: "Sang trọng",
		img: nhaHangSangTrongImg,
	},
	{
		title: "Đặc sản vùng miền",
		img: doChayImg,
	},
	{
		title: "Quán nhậu",
		img: quanNhauImg,
	},
	{
		title: "Cơm văn phòng",
		img: comVanPhongImg,
	},
	{
		title: "Quán bình dân",
		img: quanBinhDanImg,
	},
	{
		title: "Quán vỉa hè",
		img: quanVieHeImg,
	},
	{
		title: "Buffet",
		img: buffetImg,
	},
	{
		title: "Fast-food",
		img: fastFoodImg,
	},
	{
		title: "Lẩu & Nướng",
		img: lauNuongImg,
	},
	{
		title: "Đồ chay & Healthy",
		img: doChayImg,
	},
	{
		title: "Coffee",
		img: coffeeImg,
	},
	{
		title: "Trà & Bánh",
		img: traBanhImg,
	},
	{
		title: "Bar & Pub",
		img: barPubImg,
	},
	{
		title: "Xu hướng",
		img: xuHuongImg,
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
		gender: "Nam",
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
		errorReducer: { errorStatus },
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
							if (response.status === "OK" && searchAdd === "") {
								const address = response.results[0].formatted_address;
								const streetName = response.results[0].address_components[2].short_name;
								setSearchAdd(address);
								saveLocal.saveToLocal("street", streetName);
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
						saveLocal.saveToLocal("street", streetName);
					},
					(error) => {
						console.error(error);
					}
				);
			})
			.catch((error) => console.error("Error", error));
	};

	const checkValidateNextBtn = () =>
		(currentDrawer === 2 && searchAdd === "") || username === "" || chooseAge === "" || chooseGender === "";

	const checkValidateFinishBtn = () =>
		username === "" ||
		searchAdd === "" ||
		chooseAge === "" ||
		chooseGender === "" ||
		chooseRestaurant.length === 0 ||
		chooseRestaurant.length < 4;

	if (authenticated === false || errorStatus === 401) return <Redirect to="/login" />;

	if (authenticated === true && statusSurvey === true) return <Redirect to="/" />;

	return (
		<>
			{authenticated !== undefined && (
				<div className="survey-page">
					<div className="survey-page__navbar">
						<div className="survey-page__navbarLeft"></div>
						<div className="survey-page__navbarRight">
							<p className="survey-page__navbarSlogan line1">Bước vào thế giới ẩm thực</p>
							<p className="survey-page__navbarSlogan line2">được cá nhân hóa cho riêng bạn!</p>
							<p className="survey-page__navbarBio">
								Lựa chọn những quán ăn theo sở thích của bạn để chúng tôi gợi ý cho bạn những nhà hàng
								phù hợp nhất!
							</p>
						</div>
					</div>
					<div className="survey-page__container">
						<div className="drawer-sidebar-left">
							<div
								className={`survey-page__navbarStatus survey-page__navbarStatusInfoAll ${
									currentDrawer === 1 ? "status--active" : ""
								}`}
								style={{ justifyContent: "flex-start" }}>
								<p
									className={`survey-page__navbarStatusInfo ${
										currentDrawer === 1 ? "status--active" : ""
									}`}>
									Thông tin chung
								</p>
							</div>
							<div
								className={`survey-page__navbarStatus survey-page__navbarStatusLocation ${
									currentDrawer === 2 ? "status--active" : ""
								}`}
								style={{ justifyContent: "center" }}>
								<p
									className={`survey-page__navbarStatusInfo ${
										currentDrawer === 2 ? "status--active" : ""
									}`}>
									Chọn địa điểm
								</p>
							</div>
							<div
								className={`survey-page__navbarStatus survey-page__navbarStatusRestaurant ${
									currentDrawer === 3 ? "status--active" : ""
								}`}>
								<p
									className={`survey-page__navbarStatusInfo ${
										currentDrawer === 3 ? "status--active" : ""
									}`}>
									Chọn nhóm nhà hàng
								</p>
							</div>
						</div>
						<div className="drawer-sidebar-leftMobile">
							<div className="survey-page__numberDrawer">
								<p>{currentDrawer}</p>
							</div>
							{currentDrawer === 1 ? (
								<div className="survey-page__navbarStatus">
									<p className="survey-page__navbarStatusInfo">Thông tin chung</p>
								</div>
							) : (
								""
							)}
							{currentDrawer === 2 ? (
								<div className="survey-page__navbarStatus">
									<p className="survey-page__navbarStatusInfo">Chọn địa điểm</p>
								</div>
							) : (
								""
							)}

							{currentDrawer === 3 ? (
								<div className="survey-page__navbarStatus">
									<p className="survey-page__navbarStatusInfo">Chọn nhóm nhà hàng</p>
								</div>
							) : (
								""
							)}
						</div>
						<div className="drawer-sidebar-right">
							{currentDrawer === 1 && (
								<div className="drawer-sidebar-right__form">
									<div className="drawer-sidebar-right__formContainer">
										<label htmlFor="username">Hãy cho chúng mình biết tên của bạn nhé!</label>
										<input
											id="username"
											type="text"
											placeholder="Tên bạn ..."
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
									</div>
									<div className="drawer-sidebar-right__formContainer">
										<div className="drawer-sidebar-right__formAgeTitle">
											Bạn trong nhóm tuổi nào
										</div>
										<div className="drawer-sidebar-right__formAge">
											{surveyAgeList.map((age) => (
												<div
													className={`drawer-sidebar-right__formAgeItem ${
														chooseAge.age === age.age ? "choose--active" : ""
													}`}
													key={age.id}
													onClick={() => setChooseAge(age)}>
													<p>{age.age}</p>
												</div>
											))}
										</div>
									</div>
									<div className="drawer-sidebar-right__formContainer">
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
								</div>
							)}
							{currentDrawer === 2 && (
								<div className="drawer-sidebar-right__form" style={{ justifyContent: "flex-start" }}>
									<label htmlFor="address">
										Hãy cho chúng mình biết địa điểm của bạn để hiển thị kết quả chính xác hơn với
										bạn
									</label>
									<PlacesAutocomplete
										value={searchAdd}
										onChange={handleChange}
										onSelect={handleSelect}>
										{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
											<div>
												<input
													id="address"
													{...getInputProps({
														placeholder: "Nhập địa điểm ...",
														className: "location-search-input",
													})}
												/>
												<div className="autocomplete-dropdown-container">
													{suggestions.length > 4
														? suggestions.slice(0, 4).map((suggestion) => {
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
														  })
														: suggestions.map((suggestion) => {
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
								<div className="drawer-sidebar-right__listRestaurantContainer">
									<p className="drawer-sidebar-right__title">
										Hãy chọn tối thiểu 5 nhóm nhà hàng bạn thích
									</p>
									<div className="drawer-sidebar-right__listRestaurant">
										{listRestaurant.map((restaurant, index) => (
											<div
												key={index}
												className={`drawer-sidebar-right__itemRestaurant ${handleCheckActiveItem(
													restaurant,
													chooseRestaurant,
													true
												)}`}
												onClick={() =>
													handleChooseItem(
														restaurant,
														chooseRestaurant,
														setChooseRestaurant,
														5
													)
												}
												style={{ position: "relative" }}>
												<div className="drawer-sidebar-right__itemRestaurantImg">
													<img src={restaurant.img} alt="" />
												</div>
												<p>{restaurant.title}</p>
											</div>
										))}
									</div>
								</div>
							)}
							<div className="drawer-sidebar__footer">
								<button className="drawer-sidebar__buttonBack " onClick={preDrawer}>
									Trở lại
								</button>
								{currentDrawer === 3 ? (
									<button
										className={`drawer-sidebar__buttonNext ${
											checkValidateFinishBtn() ? "button--disable" : ""
										}`}
										disabled={checkValidateFinishBtn() ? true : false}
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
											checkValidateNextBtn() ? "button--disable" : ""
										}`}
										onClick={nextDrawer}
										disabled={checkValidateNextBtn() ? true : false}>
										Tiếp theo
									</button>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SurveyPage;
