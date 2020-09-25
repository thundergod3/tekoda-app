export const handleChooseItem = (itemChoose, listItem, functionSetState, limitNumber) => {
	let found = false;
	for (let k = 0; k < listItem.length; k++) {
		if (itemChoose.title === listItem[k]) {
			found = true;
		}
	}

	if (limitNumber && listItem.length >= limitNumber) {
		functionSetState(listItem.filter((item) => item !== itemChoose.title));
		return;
	} else {
		if (found) {
			functionSetState(listItem.filter((item) => item !== itemChoose.title));
		} else {
			functionSetState([...listItem, itemChoose.title]);
		}
	}
};

export const handleCheckActiveItem = (itemCheck, listItem) => {
	let chooseItemActive = "";

	for (let i = 0; i < listItem.length; i++) {
		if (listItem[i] === itemCheck.title) {
			chooseItemActive = "choose--active";
			return chooseItemActive;
		}
	}
};
