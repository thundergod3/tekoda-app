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

const Navbar = ({
	history: {
		location: { pathname },
	},
}) => {
	const {
		authReducer: { authenticated },
	} = useSelector((state) => state);

	return (
		<div className="navbar">
			<div className="navbar__container">
				<div className="navbar__right" style={authenticated ? { flex: 0.87 } : { flex: 0.8 }}>
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
				<div className="navbar__left" style={authenticated ? { flex: 0.13 } : { flex: 0.2 }}>
					<div className="navbar__icon">
						<LanguageIcon />
						<ExpandMoreIcon />
					</div>
					{!authenticated && (
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
