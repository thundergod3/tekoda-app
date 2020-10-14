import axios from "axios";

const { default: rootReducer } = require("../stores/rootReducer");
const { createStore } = require("redux");
const store = createStore(rootReducer);

class HTTPMethod {
	constructor() {
		const {
			authReducer: { token },
		} = store.getState();
		this.axios = axios;
		this.axios.defaults.baseURL = "https://tekoda.ml";
		this.axios.defaults.headers = {
			Authorization: `Bearer ${token}`,
		};
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);
}

export default new HTTPMethod();
