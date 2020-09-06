import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import logo from "../../../assets/icons/logo.png";
import logoWhite from "../../../assets/icons/Vector.png";
import "./Navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import NavbarOption from "../navbarOption/NavbarOption";

import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles({
	list: {
		width: "1200px",
	},
	fullList: {
		width: "auto",
	},
});

const navbarOption = [
	{
		title: "tìm kiếm nhà hàng",
		url: "/",
	},
	{
		title: "hôm nay ăn gì ?",
		url: "/today-eat",
	},
];

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

const Navbar = ({
	history: {
		location: { pathname },
	},
}) => {
	const [searchType, setSearchType] = useState("");
	const [open, setOpen] = useState(false);
	const [currentDrawer, setCurrentDrawer] = useState(0);
	const {
		authReducer: { authenticated },
	} = useSelector((state) => state);
	const classes = useStyles();

	const toggleDrawer = () => {
		setOpen(!open);
	};

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

	const showDrawer = () => (
		<div className={clsx(classes.list)} role="presentation">
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
								Lựa chọn những quán ăn theo sở thích của bạn để chúng tôi gợi ý cho bạn những nhà hàng
								phù hợp nhất
							</p>
						</>
					)}
					{currentDrawer === 1 && (
						<>
							<h4>Chọn quán ăn theo sở thích của bạn</h4>
							<p>
								Lựa chọn những quán ăn theo sở thích của bạn để chúng tôi gợi ý cho bạn những nhà hàng
								phù hợp nhất
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
						<p className="drawer-sidebar-right__title">Hãy chọn tối thiểu 5 nhóm nhà hàng bạn thích</p>
						<div className="drawer-sidebar-right__listRestaurant">
							{listRestaurant.map((restaurant, index) => (
								<div className="drawer-sidebar-right__itemRestaurant">
									<div className="drawer-sidebar-right__restaurantBox" key={index}></div>
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
					<button className="drawer-sidebar__buttonNext" onClick={nextDrawer}>
						Tiếp theo
					</button>
				</div>
			</div>
		</div>
	);

	return (
		<div className="navbar">
			<div className="navbar__container">
				<div className="navbar__right">
					<Link to="/">
						<div className="navbar__logo">
							<img src={logo} alt="Logo" />
							<p>TekodaApp</p>
						</div>
					</Link>
					<div className="navbar__listOption">
						{navbarOption.map((option, index) => (
							<NavbarOption key={index} option={option} />
						))}
					</div>
				</div>
				<div className="navbar__left">
					<div className="navbar__icon">
						<LanguageIcon />
						<ExpandMoreIcon />
					</div>
					{authenticated ? (
						<div className="navbar__button" onClick={toggleDrawer}>
							<p>Khảo sát</p>
						</div>
					) : (
						<>
							<Link to="/login">
								<div className="navbar__button">
									<p>Đăng nhập</p>
								</div>
							</Link>
							<Link to="/register">
								<div className="navbar__button">
									<p>Đăng ký</p>
								</div>
							</Link>
						</>
					)}

					<Drawer anchor="left" open={open} onClose={toggleDrawer}>
						{showDrawer()}
					</Drawer>
					{authenticated && (
						<div className="navbar__button">
							<div className="navbar__buttonDrawerContainer">
								<MenuIcon />
								<AccountCircleIcon />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default withRouter(Navbar);
