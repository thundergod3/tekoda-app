import React from "react";

import "./FilterOption.scss";

const FilterOption = ({ option: { title, icon } }) => {
	return (
		<div className="filter-option">
			<img src={icon} alt={title} />
			<p>{title}</p>
		</div>
	);
};

export default FilterOption;
