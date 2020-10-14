import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";

import saveLocal from "../../helpers/saveLocal";
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
	try {
		if (!page) page = 1;
		yield put(restaurantAction.removeRestaurantReviewList());
		const response = yield call(restaurantService.fetchRestaurantPerPage, { page });
		yield put(restaurantAction.fetchListRestaurantPerPageSucceeded(response.data));
		const {
			restaurantReducer: { restaurantSearchDetail },
		} = yield select((state) => state);
		if (Object.keys(restaurantSearchDetail).length === 0) {
			yield call(getRestaurantDetail, { id: response.data[0]._id });
		}
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* fetchTrendingRestaurant() {
	try {
		const response = yield call(restaurantService.fetchTrendingRestaurant);
		console.log(response);
		yield put(restaurantAction.fetchRecommendRestaurantSucceeded(response.data));
	} catch (error) {
		console.log(error);
	}
}

function* fetchSaveRestaurant() {
	try {
		const response = yield call(restaurantService.fetchSaveRestaurant);
		yield put(restaurantAction.fetchSaveRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
	}
}

function* getRestaurantDetail({ id }) {
	const {
		restaurantReducer: { restaurantList, saveRestaurantList },
	} = yield select((state) => state);

	if (restaurantList.length !== 0 || saveRestaurantList.length !== 0) {
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
		yield saveLocal.saveToLocal("statusSurvey", true);
		yield saveLocal.saveToLocal("surveyForm", surveyForm);
		yield history.push("/");
		yield put(restaurantAction.sendSurveyFormSucceeded());
	} catch (error) {
		console.log(error);
	}
}

function* getAllSearchRestaurant({ listKeyword }) {
	try {
		const response = yield call(restaurantService.getAllSearchRestaurant, { listKeyword });
		yield put(restaurantAction.getAllSearchRestaurantSucceeded(response.data));
	} catch (error) {
		console.log(error);
	}
}

function* searchRestaurant({ listKeyWord, page }) {
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

function* getSearchRestaurantPerPage({ listKeyWord, page }) {
	try {
		const response = yield call(restaurantService.getSearchRestaurantPePage, { listKeyWord, page });
		yield put(restaurantAction.getSearchRestaurantPerPageSucceeded(response.data));
	} catch (error) {
		console.log(error);
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
		yield call(restaurantService.trackingUserScrollReviewList, { restaurantId });
	} catch (error) {
		console.log(error);
	}
}

function* saveRestaurant({ restaurant }) {
	try {
		const response = yield call(restaurantService.likeRestaurant, { restaurantId: restaurant?._id });
		console.log(restaurant);
		console.log(response);
		if (response.data && response.data.enjoy === 1) {
			yield put(restaurantAction.saveRestaurantSucceeded(restaurant));
			yield call(restaurantService.saveRestaurant, { restaurantId: restaurant?._id });
			yield;
		} else {
			yield put(restaurantAction.removeSaveRestaurant(restaurant));
			yield call(restaurantService.saveRestaurant, { restaurantId: restaurant?._id });
		}
	} catch (error) {
		console.log(error);
	}
}

export default function* restaurantSaga() {
	yield takeLatest(types.FETCH_LIST_RESTAURANT_REQUEST, fetchListRestaurant);
	yield takeLatest(types.FETCH_RECOMMEND_TRENDING_RESTAURANT_REQUEST, fetchTrendingRestaurant);
	yield takeLatest(types.FETCH_SAVE_LIST_RESTAURANT_REQUEST, fetchSaveRestaurant);
	yield takeLatest(types.FETCH_LIST_RESTAURANT_PER_PAGE_REQUEST, fetchListRestaurantPerPage);
	yield takeLatest(types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST, getRestaurantDetail);
	yield takeLatest(types.SEND_SURVEY_FORM_REQUEST, sendSurveyForm);
	yield takeLatest(types.GET_ALL_SEARCH_RESTAURANT_REQUEST, getAllSearchRestaurant);
	yield takeLatest(types.SEARCH_RESTAURANT_REQUEST, searchRestaurant);
	yield takeLatest(types.GET_SEARCH_RESTAURANT_PER_PAGE_REQUEST, getSearchRestaurantPerPage);
	yield takeLatest(types.TRACKING_USER_SCROLL_REVIEW_LIST, trackingUserIntersection);
	yield takeLatest(types.GET_RESTAURANT_REVIEW_LIST_REQUEST, getRestaurantReview);
	yield takeLatest(types.SAVE_RESTAURANT_REQUEST, saveRestaurant);
}
