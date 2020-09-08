import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./NavbarOption.scss";

const NavbarOption = ({
	option: { title, url },
	history: {
		location: { pathname },
	},
}) => {
	console.log(pathname);
	return (
		<Link to={url}>
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
