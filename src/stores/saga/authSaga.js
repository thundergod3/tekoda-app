import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import authAction from "../redux/actions/authAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";
import restaurantAction from "../redux/actions/restaurantAction";

import authService from "../../services/authService";

import history from "../../constants/history";
import saveLocal from "../../helpers/saveLocal";
import removeDataFromLocal from "../../helpers/removeDataFromLocal";

function* getUser({ token, userData, tokenInfo }) {
	try {
		if (userData) {
			if (tokenInfo) {
				yield saveLocal.saveToLocal("token", tokenInfo.accessToken);
				yield saveLocal.saveToLocal("expired-token", tokenInfo.data_access_expiration_time);
			}
			yield saveLocal.saveToLocal("user", userData);
			yield put(authAction.getUserSucceeded(userData));
			yield call(checkAuthenticated);
			yield history.push("/survey");
		} else {
			const response = yield call(authService.getUserData, { token });
			if (response?.data?.is_survey) {
				yield put(restaurantAction.sendSurveyFormSucceeded());
			}
			yield put(authAction.getUserDataSucceeded(response.data));
			yield saveLocal.saveToLocal("user", response.data);
		}

		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		return error.response.status;
	}
}

function* loginUser({ userForm }) {
	let response = {};

	try {
		if (userForm.loginFb) {
			response = yield call(authService.loginUser, {
				userForm: {
					name: userForm.name,
					email: userForm.email,
					password: "123456789abcdef",
					f_id: userForm.id,
				},
			});
		} else {
			response = yield call(authService.loginUser, { userForm });
		}
		yield put(authAction.loginUserSucceeded(response.data.jwt_token));
		yield saveLocal.saveToLocal("token", response.data.jwt_token);
		yield call(checkAuthenticated);
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* registerUser({ userForm }) {
	let response = {};
	try {
		if (userForm.loginFb) {
			response = yield call(authService.registerUser, {
				userForm: {
					name: userForm.name,
					email: userForm.email,
					password: "123456789abcdef",
					f_id: userForm.id,
				},
			});
			yield call(loginUser, {
				userForm: { email: userForm.email, password: "123456789abcdef" },
			});
		} else {
			response = yield call(authService.registerUser, {
				userForm: {
					name: userForm.name,
					email: userForm.email,
					password: userForm.password,
				},
			});
			yield call(loginUser, { userForm: { email: userForm.email, password: userForm.password } });
		}
		yield put(authAction.registerUserSucceeded(response.data));
		yield saveLocal.saveToLocal("user", response.data);
		yield call(checkAuthenticated);
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* logOutUser() {
	yield call(removeDataFromLocal);
	yield put(authAction.logoutUserSucceeded());
	yield put(restaurantAction.sendSurveyFormFailed());
	yield delay(1000);
	yield put(utilAction.loadedUI());
}

function* checkAuthenticated() {
	const token = yield saveLocal.getFromLocal("token");
	const response = yield call(getUser, { token });

	if (token && token !== "undefined" && response !== 401) {
		yield put(authAction.checkAuthenticatedSucceeded());
	} else {
		yield put(authAction.checkAuthenticatedFailed());
		yield call(removeDataFromLocal);
		yield put(restaurantAction.sendSurveyFormFailed());
	}
}

export default function* authSaga() {
	yield takeLatest(types.CHECK_AUTHENTICATED_REQUEST, checkAuthenticated);
	yield takeLatest(types.GET_USER_REQUEST, getUser);
	yield takeLatest(types.LOGIN_USER_REQUEST, loginUser);
	yield takeLatest(types.REGISTER_USER_REQUEST, registerUser);
	yield takeLatest(types.LOGOUT_USER_REQUEST, logOutUser);
}
