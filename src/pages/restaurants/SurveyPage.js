import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";

import logoWhite from "../../assets/icons/Vector.png";
import "./restaurants.scss";

const listRestaurant = [
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
	{
		title: "nhà hàng bistro",
		img: "",
	},
];

const SurveyPage = () => {
	const {
		authReducer: { authenticated },
		restaurantReducer: { statusSurveyForm },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { sendSurveyFormRequest } = restaurantAction;
	const [searchType, setSearchType] = useState("");
	const [currentDrawer, setCurrentDrawer] = useState(0);

	const nextDrawer = () => {
		if (currentDrawer >= 1) {
			return;
		}
		setCurrentDrawer(currentDrawer + 1);
	};

	const preDrawer = () => {
		if (currentDrawer <= 0) {
			return;
		}
		setCurrentDrawer(currentDrawer - 1);
	};

	if (authenticated === false) return <Redirect to="/login" />;

	if (authenticated === true && statusSurveyForm === true) return <Redirect to="/" />;

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
							{currentDrawer === 0 && (
								<>
									<h4>Chỉ một vài bước để tới trải nghiệm cá nhân hóa của bạn</h4>
									<p>
										Lựa chọn những quán ăn theo sở thích của bạn để chúng tôi gợi ý cho bạn những
										nhà hàng phù hợp nhất
									</p>
								</>
							)}
							{currentDrawer === 1 && (
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
						{currentDrawer === 0 && (
							<div className="drawer-sidebar-right__form">
								<label htmlFor="username">Hãy cho chúng mình biết tên của bạn nhé!</label>
								<input
									value={searchType}
									id="username"
									type="text"
									placeholder="Tên bạn ..."
									value={searchType}
									onChange={(e) => setSearchType(e.target.value)}
								/>
							</div>
						)}
						{currentDrawer === 1 && (
							<>
								<p className="drawer-sidebar-right__title">
									Hãy chọn tối thiểu 5 nhóm nhà hàng bạn thích
								</p>
								<div className="drawer-sidebar-right__listRestaurant">
									{listRestaurant.map((restaurant, index) => (
										<div key={index} className="drawer-sidebar-right__itemRestaurant">
											<div className="drawer-sidebar-right__restaurantBox"></div>
											<p>{restaurant.title}</p>
										</div>
									))}
								</div>
							</>
						)}
						<div className="drawer-sidebar__footer">
							<button className="drawer-sidebar__buttonBack" onClick={preDrawer}>
								Trở lại
							</button>
							{currentDrawer === 1 ? (
								<button
									className="drawer-sidebar__buttonNext"
									onClick={() => dispatch(sendSurveyFormRequest())}>
									Hoàn thành
								</button>
							) : (
								<button className="drawer-sidebar__buttonNext" onClick={nextDrawer}>
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
