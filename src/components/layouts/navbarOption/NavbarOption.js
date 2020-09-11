import React from "react";
import { Link, withRouter } from "react-router-dom";

import { useDispatch } from "react-redux";
import utilAction from "../../../stores/redux/actions/utilAction";

import "./NavbarOption.scss";

const NavbarOption = ({
	option: { title, url },
	history: {
		location: { pathname },
	},
}) => {
	const dispatch = useDispatch();
	const { loadingUI } = utilAction;

	return (
		<Link to={url} onClick={() => dispatch(loadingUI())}>
			<div
				className={`${
					pathname === url || pathname.slice(0, 10) === url
						? "navbar-option navbar-option--active"
						: "navbar-option"
				}`}>
				<p>{title}</p>
			</div>
		</Link>
	);
};

export default withRouter(NavbarOption);
