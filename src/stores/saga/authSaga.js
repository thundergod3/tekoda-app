import { takeEvery, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../../constants/types";
import authAction from "../redux/actions/authAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import authService from "../../services/authService";

import cookieLocal from "../../helpers/cookieLocal";
import history from "../../constants/history";

function* getUser({ userData, tokenInfo }) {
	try {
		if (userData) {
			if (tokenInfo) {
				yield cookieLocal.saveToCookie("token", tokenInfo.accessToken);
				yield cookieLocal.saveToLocal("expired-token", tokenInfo.data_access_expiration_time);
			}
			yield cookieLocal.saveToLocal("user", userData);
			yield put(authAction.getUserSucceeded(userData));
			yield call(checkAuthenticated);
			yield history.push("/survey");
		}
	} catch (error) {
		console.log(error);
	}
}

function* loginUser({ userForm }) {
	try {
		const response = yield call(authService.loginUser, { userForm });
		yield put(authAction.loginUserSucceeded(response.data.jwt_token));
		yield cookieLocal.saveToCookie("token", response.data.jwt_token);
		yield call(checkAuthenticated);
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* registerUser({ userForm }) {
	try {
		const response = yield call(authService.registerUser, { userForm });
		yield put(authAction.registerUserSucceeded(response.data.jwt_token));
		yield cookieLocal.saveToCookie("token", response.data.jwt_token);
		yield call(checkAuthenticated);
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* checkAuthenticated() {
	const token = yield cookieLocal.getFromCookie("token");
	const expiredToken = yield cookieLocal.getFromLocal("expired-token");

	if (token) {
		if (expiredToken && expiredToken <= Date.now() / 1000) {
			yield put(authAction.checkAuthenticatedFailed());
			yield cookieLocal.removeFromCookie("token");
			yield cookieLocal.removeFromCookie("user");
			yield cookieLocal.removeFromLocal("statusSurvey");
		} else {
			yield put(authAction.checkAuthenticatedSucceeded());
		}
	} else {
		yield put(authAction.checkAuthenticatedFailed());
		yield cookieLocal.removeFromCookie("token");
		yield cookieLocal.removeFromCookie("user");
		yield cookieLocal.removeFromLocal("statusSurvey");
	}
}

export default function* authSaga() {
	yield takeLatest(types.CHECK_AUTHENTICATED_REQUEST, checkAuthenticated);
	yield takeLatest(types.GET_USER_REQUEST, getUser);
	yield takeLatest(types.LOGIN_USER_REQUEST, loginUser);
	yield takeLatest(types.REGISTER_USER_REQUEST, registerUser);
}
