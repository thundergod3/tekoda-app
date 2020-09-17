import React from "react";

import { useSelector } from "react-redux";

import "./PreferenceItem.scss";

const PreferenceItem = ({ choosePreference, typeItem, addPrefernce }) => {
	const {
		restaurantReducer: { listKeyWord },
	} = useSelector((state) => state);
	let classNameActive = "";

	// if(listKeyWord)

	if (choosePreference && choosePreference.length !== 0) {
		choosePreference.forEach((el) => {
			if (typeItem.title === el) classNameActive = "preference-item--active";
		});
	}

	return (
		<div className={`preference-item ${classNameActive}`} onClick={() => addPrefernce(typeItem.title)}>
			<p>{typeItem.title}</p>
		</div>
	);
};

export default PreferenceItem;
