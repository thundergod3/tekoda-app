import React from "react";

import { useSelector } from "react-redux";

import { handleCheckActiveItem, handleChooseItem } from "../../../helpers/handleChangeActive";

import "./PreferenceItem.scss";

const PreferenceItem = ({ choosePreference, typeItem, setChoosePreference }) => {
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
		<div
			className={`preference-item ${handleCheckActiveItem(typeItem, choosePreference)}`}
			onClick={() => handleChooseItem(typeItem, choosePreference, setChoosePreference)}>
			<p>{typeItem.title}</p>
		</div>
	);
};

export default PreferenceItem;
