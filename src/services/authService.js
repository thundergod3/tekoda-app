import HTTPMethod from "./index";

class authService {
	loginUser = ({ userForm }) => HTTPMethod.post("/api/v1/login", userForm);

	registerUser = ({ userForm }) => HTTPMethod.post("/api/v1/signup", userForm);
}

export default new authService();
