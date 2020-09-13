import axios from "axios";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = "https://tekoda.ml";
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);
}

export default new HTTPMethod();
