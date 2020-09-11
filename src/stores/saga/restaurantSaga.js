import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";
import cookieLocal from "../../helpers/cookieLocal";

function* fetchListRestaurant() {
	yield put(utilAction.loadingUI());

	try {
		const response = yield restaurantService.fetchAllRestaurant();
		yield put(restaurantAction.fetchListRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* getRestaurantDetail({ id }) {
	const {
		restaurantReducer: { restaurantList, restaurantSearchList },
	} = yield select((state) => state);

	if (restaurantList.length !== 0 || restaurantSearchList !== 0) {
		yield put(utilAction.showActive());

		try {
			const response = yield call(restaurantService.fetchDetailRestaurant, { id });
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(response?.data[0]));
			yield delay(100);
			yield put(utilAction.endActive());
		} catch (error) {
			console.log(error);
			yield put(utilAction.endActive());
		}
	} else {
		yield put(utilAction.loadingUI());

		try {
			const response = yield call(restaurantService.fetchDetailRestaurant, { id });
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(response?.data[0]));
			yield put(utilAction.loadedUI());
		} catch (error) {
			console.log(error);
		}
	}
}

function* sendSurveyForm({ surveyForm }) {
	try {
		yield cookieLocal.saveToLocal();
		yield put(restaurantAction.sendSurveyFormSucceeded());
	} catch (error) {
		console.log(error);
	}
}

function* searchRestaurant({ listKeyWord }) {
	yield put(utilAction.loadingUI());

	try {
		const response = yield call(restaurantService.searchRestaurant, { listKeyWord });
		yield put(restaurantAction.searchRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

export default function* restaurantSaga() {
	yield takeLatest(types.FETCH_LIST_RESTAURANT_REQUEST, fetchListRestaurant);
	yield takeLatest(types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST, getRestaurantDetail);
	yield takeLatest(types.SEND_SURVEY_FORM_REQUEST, sendSurveyForm);
	yield takeLatest(types.SEARCH_RESTAURANT_REQUEST, searchRestaurant);
}
