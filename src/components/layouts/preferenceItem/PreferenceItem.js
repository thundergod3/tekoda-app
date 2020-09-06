import React from "react";

import "./PreferenceItem.scss";

const PreferenceItem = ({ choosePreference, typeItem, addPrefernce, idChoose }) => {
	let classNameActive = "";

	if (choosePreference && choosePreference.length !== 0) {
		choosePreference.map((el) => {
			if (typeItem.id === el.id) classNameActive = "preference-item--active";
		});
	}

	return (
		<div className={`preference-item ${classNameActive}`} onClick={() => addPrefernce(typeItem)}>
			<p>{typeItem.title}</p>
		</div>
	);
};

export default PreferenceItem;
