import { takeEvery, takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";

import saveLocal from "../../helpers/saveLocal";
import history from "../../constants/history";

function* fetchListRestaurant() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const response = yield call(restaurantService.fetchAllRestaurant, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.fetchListRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* fetchListRestaurantPerPage({ page }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		if (!page) page = 1;
		yield put(restaurantAction.removeRestaurantReviewList());
		const response = yield call(restaurantService.fetchRestaurantPerPage, {
			page,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.fetchListRestaurantPerPageSucceeded(response.data));
		const {
			restaurantReducer: { restaurantSearchDetail },
		} = yield select((state) => state);
		if (
			Object.keys(restaurantSearchDetail).length === 0 &&
			(isNaN(history.location.pathname.substring(11, 13)) || history.location.pathname.substring(11, 13) === "")
		) {
			yield call(getRestaurantDetail, { id: response.data[0].ResId });
		} else {
			yield call(getRestaurantDetail, { id: response.data[0].ResId });
		}
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* fetchTrendingRestaurant() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const response = yield call(restaurantService.fetchTrendingRestaurant, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.fetchListRestaurantPerPageSucceeded(response.data));
		console.log(response);
		yield put(restaurantAction.fetchRecommendRestaurantSucceeded(response.data));
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* fetchSaveRestaurant() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const response = yield call(restaurantService.fetchSaveRestaurant, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.fetchSaveRestaurantSucceeded(response.data));
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* getRestaurantDetail({ id }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	const {
		restaurantReducer: { restaurantList, saveRestaurantList },
	} = yield select((state) => state);

	if (restaurantList.length !== 0 || saveRestaurantList.length !== 0) {
		yield put(utilAction.showActive());
		yield put(restaurantAction.removeRestaurantReviewList());

		try {
			const response = yield call(restaurantService.fetchDetailRestaurant, {
				id,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(response?.data));
			const {
				restaurantReducer: { restaurantSearchDetail },
			} = yield select((state) => state);
			yield call(getRestaurantReview, {
				restaurantId: restaurantSearchDetail.ResId,
				count: 1,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			yield delay(100);
			yield put(utilAction.endActive());
			yield put(errorAction.clearError());
		} catch (error) {
			console.log(error);
			yield put(errorAction.getError(error.response));
			yield put(utilAction.endActive());
		}
	} else {
		yield put(utilAction.loadingUI());

		try {
			const response = yield call(restaurantService.fetchDetailRestaurant, {
				id,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(response?.data));
			yield put(restaurantAction.removeRestaurantReviewList());
			const {
				restaurantReducer: { restaurantSearchDetail },
			} = yield select((state) => state);
			yield call(getRestaurantReview, {
				restaurantId: restaurantSearchDetail.ResId,
				count: 1,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			yield put(utilAction.loadedUI());
			yield put(errorAction.clearError());
		} catch (error) {
			console.log(error);
			yield put(errorAction.getError(error.response));
		}
	}
}

function* sendSurveyForm({ surveyForm }) {
	try {
		yield saveLocal.saveToLocal("statusSurvey", true);
		yield saveLocal.saveToLocal("surveyForm", surveyForm);
		yield history.push("/");
		yield put(restaurantAction.sendSurveyFormSucceeded());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* getAllSearchRestaurant({ listKeyword }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const response = yield call(restaurantService.getAllSearchRestaurant, {
			listKeyword,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.getAllSearchRestaurantSucceeded(response.data));
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* searchRestaurant({ listKeyWord, page }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	yield put(restaurantAction.removeRestaurantReviewList());
	if (!page) page = 1;

	try {
		const response = yield call(restaurantService.searchRestaurant, {
			listKeyWord,
			page,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.searchRestaurantSucceeded(response.data));
		const {
			restaurantReducer: { restaurantSearchDetail },
		} = yield select((state) => state);
		yield call(getRestaurantReview, {
			restaurantId: restaurantSearchDetail.ResId,
			count: 1,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* getSearchRestaurantPerPage({ listKeyWord, page }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const response = yield call(restaurantService.getSearchRestaurantPePage, {
			listKeyWord,
			page,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(restaurantAction.getSearchRestaurantPerPageSucceeded(response.data));
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* getRestaurantReview({ restaurantId, count }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const {
			restaurantReducer: { restaurantReviewList },
		} = yield select((state) => state);
		const response = yield call(restaurantService.getRestaurantReview, {
			restaurantId,
			count,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log("review", response);
		if (response.data.length !== 0) {
			if (restaurantReviewList.length === 0) {
				yield put(restaurantAction.getRestaurantReviewListSucceeded(response.data));
			} else {
				yield put(restaurantAction.getRestaurantReviewListSucceeded([...restaurantReviewList, response.data]));
			}
		}
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* trackingUserIntersection({ restaurantId }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(restaurantService.trackingUserScrollReviewList, {
			restaurantId,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* saveRestaurant({ restaurant }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		const response = yield call(restaurantService.likeRestaurant, {
			restaurantId: restaurant?.ResId,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		console.log(response.data);
		if (response.data.enjoy === 1) {
			yield put(restaurantAction.saveRestaurantSucceeded(restaurant));
		} else {
			yield put(restaurantAction.removeSaveRestaurant(restaurant));
		}

		yield call(restaurantService.saveRestaurant, {
			restaurantId: restaurant?.ResId,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
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
