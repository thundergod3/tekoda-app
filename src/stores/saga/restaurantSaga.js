import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";

function* fetchFoodList() {
	try {
	} catch (error) {}
}

function* getRestaurantDetail({ id }) {
	yield put(utilAction.loadingUI({ name: "getRestaurantDetail", loading: true }));

	try {
		yield put(restaurantAction.getRestaurantSearchDetailSucceeded(id));
		yield delay(100);
		yield put(utilAction.loadedUI("getRestaurantDetail"));
	} catch (error) {
		console.log(error);
	}
}

export default function* restaurantSaga() {
	yield takeLatest(types.FETCH_LIST_FOOD_REQUEST, fetchFoodList);
	yield takeLatest(types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST, getRestaurantDetail);
}
