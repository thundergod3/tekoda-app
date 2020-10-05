import React from "react";

import "./WrapperSearchBar.scss";

import Navbar from "../../layouts/navbar/Navbar";
import SearchBar from "../../layouts/searchBar/SearchBar";
import FilterList from "../../utils/filterList/FilterList";

const WrapperSearchBar = () => {
	return (
		<div className="wrapper-search-bar">
			<div className="wrapper-search-bar__container">
				<SearchBar />
				<FilterList />
			</div>
		</div>
	);
};

export default WrapperSearchBar;
