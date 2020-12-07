import HTTPMethod from "./index";

class authService {
	loginUser = ({ userForm }) => HTTPMethod.post("/api/v1/login", userForm);

	registerUser = ({ userForm }) => HTTPMethod.post("/api/v1/signup", userForm);

	getUserData = () => HTTPMethod.get("/api/v1/user/get");
}

export default new authService();
