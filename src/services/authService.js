import HTTPMethod from "./index";

class authService {
	loginUser = ({ userForm }) => HTTPMethod.post("/api/v1/login", userForm);

	registerUser = ({ userForm }) => HTTPMethod.post("/api/v1/signup", userForm);

	getUserData = ({ token }) =>
		HTTPMethod.get("/api/v1/user/get", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
}

export default new authService();
