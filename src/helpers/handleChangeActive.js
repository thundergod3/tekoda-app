export const handleChooseItem = (itemChoose, listItem, functionSetState, statusAddByTitle) => {
	if (statusAddByTitle) {
		let found = false;
		for (let k = 0; k < listItem.length; k++) {
			if (itemChoose.title === listItem[k].title) {
				found = true;
			}
		}

		functionSetState(listItem.filter((item) => item.title !== itemChoose.title));

		if (found) {
			functionSetState(listItem.filter((item) => item.title !== itemChoose.title));
		} else {
			functionSetState([...listItem, itemChoose]);
		}
	} else {
		let found = false;
		for (let k = 0; k < listItem.length; k++) {
			if (itemChoose.title === listItem[k]) {
				found = true;
			}
		}

		functionSetState(listItem.filter((item) => item !== itemChoose.title));

		if (found) {
			functionSetState(listItem.filter((item) => item !== itemChoose.title));
		} else {
			functionSetState([...listItem, itemChoose.title]);
		}
	}
};

export const handleCheckActiveItem = (itemCheck, listItem, chooseRestaurantUI) => {
	let chooseItemActive = "";

	for (let i = 0; i < listItem.length; i++) {
		if (listItem[i].title ? listItem[i].title === itemCheck.title : listItem[i] === itemCheck.title) {
			if (chooseRestaurantUI) chooseItemActive = "choose-restaurant--active";
			else chooseItemActive = "choose--active";
			return chooseItemActive;
		}
	}
	return chooseItemActive;
};
