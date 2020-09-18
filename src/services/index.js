import axios from "axios";
import cookieLocal from "../helpers/cookieLocal";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = "https://tekoda.ml";
		this.axios.defaults.headers = {
			Authorization: `${cookieLocal.getFromCookie("token")}`,
			// "Access-Control-Allow-Origin": "*",
		};
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);
}

export default new HTTPMethod();
