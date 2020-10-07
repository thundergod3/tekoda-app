import axios from "axios";
import cookieLocal from "../helpers/cookieLocal";

class HTTPMethod {
	constructor() {
		this.axios = axios;
		this.axios.defaults.baseURL = "http://10.1.9.246:8888";
		this.axios.defaults.headers = {
			Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
		};
	}

	get = (...props) => axios.get(...props);

	post = (...props) => axios.post(...props);

	put = (...props) => axios.put(...props);

	delete = (...props) => axios.delete(...props);
}

export default new HTTPMethod();
