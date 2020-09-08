import cookie from "js-cookie";

class cookieLocal {
	constructor() {
		this.cookie = cookie;
	}

	getFromLocal = (key) => JSON.parse(localStorage.getItem(key));

	saveToLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value));

	removeFromLocal = (key) => localStorage.removeItem(key);

	getFromCookie = (key) => {
		if (window !== "undefined") return cookie.get(key);
	};

	saveToCookie = (key, value) => {
		if (window !== "undefined") {
			cookie.set(key, value, {
				expires: 1,
			});
		}
	};

	removeFromCookie = (key) => {
		if (window !== "undefined") {
			cookie.remove(key, {
				expires: 1,
			});
		}
	};
}

export default new cookieLocal();
