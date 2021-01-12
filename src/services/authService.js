import HTTPMethod from "./index";

class authService {
	// [GET]
	getUserData = () => HTTPMethod.get("/api/v1/user/get");

	// [POST]
	loginUser = ({ userForm }) => HTTPMethod.post("/api/v1/login", userForm);
	registerUser = ({ userForm }) => HTTPMethod.post("/api/v1/signup", userForm);
}

export default new authService();
