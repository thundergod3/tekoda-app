class saveLocal {
	getFromLocal = (key) => JSON.parse(localStorage.getItem(key));

	saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

	removeFromLocal = (key) => localStorage.removeItem(key);
}

export default new saveLocal();
