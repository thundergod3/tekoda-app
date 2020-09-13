import HTTPMethod from "./index";

class authService {
	loginUser = ({ userForm }) => HTTPMethod.post("/api/v1/users/login", userForm);

	registerUser = ({ userForm }) => HTTPMethod.post("/api/v1/users/signup", userForm);
}

export default new authService();
