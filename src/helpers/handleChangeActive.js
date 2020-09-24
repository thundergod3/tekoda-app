export const handleChooseItem = (itemChoose, listItem, functionSetState) => {
	let found = false;
	for (let k = 0; k < listItem.length; k++) {
		if (itemChoose.title === listItem[k]?.title) {
			found = true;
		}
	}

	if (listItem.length < 5) {
		if (found) {
			functionSetState(listItem.filter((item) => item.title !== itemChoose.title));
		} else {
			functionSetState([...listItem, itemChoose]);
		}
	} else {
		functionSetState(listItem.filter((item) => item.title !== itemChoose.title));
		return;
	}
};

export const handleCheckActiveItem = (itemCheck, listItem) => {
	let chooseItemActive = "";

	for (let i = 0; i < listItem.length; i++) {
		if (listItem[i].title === itemCheck.title) {
			chooseItemActive = "choose--active";
			return chooseItemActive;
		}
	}
};
