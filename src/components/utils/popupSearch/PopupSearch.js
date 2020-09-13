import React from "react";

import "./PopupSearch.scss";

const PopupSearch = ({ classPopup, listSearch, popupFunction, popupRef, typePopup }) => {
	return (
		<div className={`layout-search ${classPopup ? classPopup : ""}`} ref={popupRef}>
			{listSearch.map((item, index) => (
				<div
					className="layout-search__item"
					key={index}
					onClick={(e) => popupFunction(e, item.title, typePopup)}>
					<img src={item.icon} alt={item.title} />
					<p className="layout-search__title">{item.title}</p>
				</div>
			))}
		</div>
	);
};

export default PopupSearch;
