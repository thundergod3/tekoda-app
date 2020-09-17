import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";

import cookieLocal from "../../helpers/cookieLocal";
import history from "../../constants/history";

function* fetchListRestaurant() {
	try {
		const response = yield call(restaurantService.fetchAllRestaurant);
		yield put(restaurantAction.fetchListRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* fetchListRestaurantPerPage({ page }) {
	yield put(utilAction.loadingUI());
	try {
		if (!page) page = 1;
		yield put(restaurantAction.removeRestaurantReviewList());
		const response = yield call(restaurantService.fetchRestaurantPerPage, { page });
		yield put(restaurantAction.fetchListRestaurantPerPageSucceeded(response.data));
		const {
			restaurantReducer: { restaurantSearchDetail },
		} = yield select((state) => state);
		yield call(getRestaurantReview, { restaurantId: restaurantSearchDetail._id, count: 1 });
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* getRestaurantDetail({ id }) {
	const {
		restaurantReducer: { restaurantList },
	} = yield select((state) => state);

	if (restaurantList.length !== 0) {
		yield put(utilAction.showActive());
		yield put(restaurantAction.removeRestaurantReviewList());

		try {
			const response = yield call(restaurantService.fetchDetailRestaurant, { id });
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(response?.data[0]));
			const {
				restaurantReducer: { restaurantSearchDetail },
			} = yield select((state) => state);
			yield call(getRestaurantReview, { restaurantId: restaurantSearchDetail._id, count: 1 });
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
			yield put(restaurantAction.removeRestaurantReviewList());
			const {
				restaurantReducer: { restaurantSearchDetail },
			} = yield select((state) => state);
			yield call(getRestaurantReview, { restaurantId: restaurantSearchDetail._id, count: 1 });
			yield put(utilAction.loadedUI());
		} catch (error) {
			console.log(error);
		}
	}
}

function* sendSurveyForm({ surveyForm }) {
	try {
		yield cookieLocal.saveToLocal("statusSurvey", true);
		yield history.push("/");
		yield put(restaurantAction.sendSurveyFormSucceeded());
	} catch (error) {
		console.log(error);
	}
}

function* searchRestaurant({ listKeyWord, page }) {
	const {
		authReducer: { authenticated },
	} = yield select((state) => state);

	// if (authenticated === false) yield history.push("/login");
	// else {
	// }
	yield put(restaurantAction.removeRestaurantReviewList());
	if (!page) page = 1;
	try {
		const response = yield call(restaurantService.searchRestaurant, { listKeyWord, page });
		yield put(restaurantAction.searchRestaurantSucceeded(response.data));
		const {
			restaurantReducer: { restaurantSearchDetail },
		} = yield select((state) => state);
		yield call(getRestaurantReview, { restaurantId: restaurantSearchDetail._id, count: 1 });
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* getRestaurantReview({ restaurantId, count }) {
	try {
		const {
			restaurantReducer: { restaurantReviewList },
		} = yield select((state) => state);
		const response = yield call(restaurantService.getRestaurantReview, { restaurantId, count });
		if (response.data.length !== 0) {
			if (restaurantReviewList.length === 0) {
				yield put(restaurantAction.getRestaurantReviewListSucceeded(response.data));
			} else {
				console.log(restaurantReviewList);
				yield put(restaurantAction.getRestaurantReviewListSucceeded([...restaurantReviewList, response.data]));
			}
		}
	} catch (error) {
		console.log(error);
	}
}

function* trackingUserIntersection({ restaurantId }) {
	try {
		const response = yield call(restaurantService.trackingUserScrollReviewList, { restaurantId });
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

function* saveRestaurant({ restaurantId }) {
	try {
		const response = yield call(restaurantService.saveRestaurant, { restaurantId });
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

export default function* restaurantSaga() {
	yield takeLatest(types.FETCH_LIST_RESTAURANT_REQUEST, fetchListRestaurant);
	yield takeLatest(types.FETCH_LIST_RESTAURANT_PER_PAGE_REQUEST, fetchListRestaurantPerPage);
	yield takeLatest(types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST, getRestaurantDetail);
	yield takeLatest(types.SEND_SURVEY_FORM_REQUEST, sendSurveyForm);
	yield takeLatest(types.SEARCH_RESTAURANT_REQUEST, searchRestaurant);
	yield takeLatest(types.TRACKING_USER_SCROLL_REVIEW_LIST_REQUEST, trackingUserIntersection);
	yield takeLatest(types.GET_RESTAURANT_REVIEW_LIST_REQUEST, getRestaurantReview);
	yield takeLatest(types.SAVE_RESTAURANT_REQUEST, saveRestaurant);
}
