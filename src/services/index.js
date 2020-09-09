import axios from "axios";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = "http://tekoda.ml:5000";
		this.axios.defaults.headers = {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Origin": true,
			"Content-Type": "application/json",
		};
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);
}

export default new HTTPMethod();
