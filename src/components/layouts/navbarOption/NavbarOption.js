import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./NavbarOption.scss";

const NavbarOption = ({
	option: { title, url },
	history: {
		location: { pathname },
	},
}) => {
	return (
		<Link to={url}>
			<div className={`${pathname === url ? "navbar-option navbar-option--active" : "navbar-option"}`}>
				<p>{title}</p>
			</div>
		</Link>
	);
};

export default withRouter(NavbarOption);
