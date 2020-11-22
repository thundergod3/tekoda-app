import saveLocal from "./saveLocal";

const removeDataFromLocal = () => {
	saveLocal.removeFromLocal("token");
	saveLocal.removeFromLocal("expired-token");
	saveLocal.removeFromLocal("user");
	saveLocal.removeFromLocal("statusSurvey");
	saveLocal.removeFromLocal("surveyForm");
	saveLocal.removeFromLocal("street");
};

export default removeDataFromLocal;
