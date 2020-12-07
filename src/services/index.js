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

	attachTokenToHeader = ({ token }) => {
		axios.interceptors.request.use(
			function (config) {
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}

				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);
	};
}

export default new HTTPMethod();
