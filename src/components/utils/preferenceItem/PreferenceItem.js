import React from "react";

import "./PreferenceItem.scss";

const PreferenceItem = ({ choosePreference, typeItem, addPrefernce }) => {
	let classNameActive = "";

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
