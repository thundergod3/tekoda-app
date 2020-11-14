import React, { useState, useRef, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

import { useSelector } from "react-redux";

import logo from "../../../assets/icons/logo.png";
import "./Navbar.scss";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import NavbarOption from "../navbarOption/NavbarOption";

import LanguageIcon from "@material-ui/icons/Language";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SearchIcon from "@material-ui/icons/Search";

import SearchBar from "../searchBar/SearchBar";

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
		title: "Tìm kiếm nhà hàng",
		url: "/",
	},
	{
		title: "Hôm nay ăn gì ?",
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
	const searchBarRef = useRef(null);
	const searchBarItemRef = useRef(null);
	const [showSearchBar, setShowSearchBar] = useState(false);

	const handleOutSideClick = (e) => {
		if (searchBarRef.current && searchBarRef.current.contains(e.target)) return;
		else {
			setShowSearchBar(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutSideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutSideClick);
		};
	}, []);

	useEffect(() => {
		if (showSearchBar === true) {
			if (searchBarItemRef.current) {
				searchBarItemRef.current.focus();
			}
		}
	}, [showSearchBar]);

	return (
		<>
			{authenticated !== undefined && (
				<div className="navbar">
					<div className="navbar__container">
						<div className="navbar__right" style={authenticated ? { flex: 0.85 } : { flex: 0.8 }}>
							<Link to="/">
								<div className="navbar__logo">
									<img src={logo} alt="Logo" />
								</div>
							</Link>
							{(window.innerWidth > 300 && window.innerWidth < 420) ||
							pathname.slice(1, 10) === "today-eat" ||
							pathname.slice(1, 16) === "save-restaurant" ? (
								<div
									className="search-bar__compactWrapper"
									style={
										window.innerWidth > 300 && window.innerWidth < 420
											? authenticated
												? { maxWidth: 150 }
												: { maxWidth: 120 }
											: {}
									}>
									<div className="search-bar__compact" onClick={(e) => setShowSearchBar(true)}>
										<SearchIcon />
										<input
											disabled={true}
											type="text"
											className="search-bar__compactInput"
											placeholder="Tìm kiếm nhà hàng theo sở thích"
										/>
										{showSearchBar && (
											<div className="search-bar__compactContainer" ref={searchBarRef}>
												<SearchBar
													style={{
														position: "absolute",
														left: "15%",
														top: "35%",
														maxWidth: "1100px",
													}}
													showSearchBar={showSearchBar}
													setShowSearchBar={setShowSearchBar}
													searchBarItemRef={searchBarItemRef}
												/>
											</div>
										)}
									</div>
								</div>
							) : (
								<div className="navbar__listOption">
									{navbarOption.map((option, index) => (
										<NavbarOption key={index} option={option} />
									))}
								</div>
							)}
						</div>
						<div className="navbar__left" style={authenticated ? { flex: 0.13 } : { flex: 0.2 }}>
							<div className="navbar__icon">
								<LanguageIcon />
								<ExpandMoreIcon />
							</div>
							{!authenticated ? (
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
							) : (
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
			)}
		</>
	);
};

export default withRouter(Navbar);
