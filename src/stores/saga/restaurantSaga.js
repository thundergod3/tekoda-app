import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";
import cookieLocal from "../../helpers/cookieLocal";

function* fetchListRestaurant() {
	yield put(utilAction.loadingUI({ name: "fetchListRestaurant", loading: true }));

	try {
		const response = yield restaurantService.fetchAllRestaurant();
		yield put(restaurantAction.fetchListRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI("fetchListRestaurant"));
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI("fetchListRestaurant"));
	}
}

function* getRestaurantDetail({ id }) {
	yield put(utilAction.loadingUI({ name: "getRestaurantDetail", loading: true }));

	try {
		const response = yield call(restaurantService.fetchDetailRestaurant, { id });
		yield put(restaurantAction.getRestaurantSearchDetailSucceeded(response?.data[0]));
		yield delay(100);
		yield put(utilAction.loadedUI("getRestaurantDetail"));
	} catch (error) {
		console.log(error);
	}
}

function* sendSurveyForm({ surveyForm }) {
	try {
		yield cookieLocal.saveToLocal("statusSurveyForm", true);
		yield put(restaurantAction.sendSurveyFormSucceeded());
	} catch (error) {
		console.log(error);
	}
}

export default function* restaurantSaga() {
	yield takeLatest(types.FETCH_LIST_RESTAURANT_REQUEST, fetchListRestaurant);
	yield takeLatest(types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST, getRestaurantDetail);
	yield takeLatest(types.SEND_SURVEY_FORM_REQUEST, sendSurveyForm);
}
