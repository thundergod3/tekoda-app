import axios from "axios";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = "http://tekoda.ml:5000";
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);
}

export default new HTTPMethod();
