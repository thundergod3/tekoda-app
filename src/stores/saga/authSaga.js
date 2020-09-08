import { takeEvery, takeLatest, call, put, select } from "redux-saga/effects";

import * as types from "../../constants/types";
import authAction from "../redux/actions/authAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import authService from "../../services/authService";

import cookieLocal from "../../helpers/cookieLocal";
import history from "../../constants/history";

function* getUser({ userData }) {
	try {
		if (userData) {
			yield cookieLocal.saveToCookie("token", userData.accessToken);
			yield cookieLocal.saveToLocal("user", userData);
			yield put(authAction.getUserSucceeded(userData));
			yield call(checkAuthenticated);
			yield history.push("/survey");
		}
	} catch (error) {
		console.log(error);
	}
}

function* checkAuthenticated() {
	const token = yield cookieLocal.getFromCookie("token");

	if (token) {
		const user = yield cookieLocal.getFromLocal("user");
		const expiredToken = yield user.data_access_expiration_time;
		if (expiredToken <= Date.now() / 1000) {
			yield put(authAction.checkAuthenticatedFailed());
			yield cookieLocal.removeFromCookie("token");
			yield cookieLocal.removeFromCookie("user");
		} else {
			yield put(authAction.checkAuthenticatedSucceeded());
			yield cookieLocal.removeFromLocal("statusSurveyForm");
		}
	} else {
		yield put(authAction.checkAuthenticatedFailed());
		yield cookieLocal.removeFromCookie("token");
		yield cookieLocal.removeFromCookie("user");
		yield cookieLocal.removeFromLocal("statusSurveyForm");
	}
}

export default function* authSaga() {
	yield takeLatest(types.CHECK_AUTHENTICATED_REQUEST, checkAuthenticated);
	yield takeLatest(types.GET_USER_REQUEST, getUser);
}
