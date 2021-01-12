import { takeLatest, call, put, select, delay } from "redux-saga/effects";

import * as types from "../../constants/types";
import restaurantAction from "../redux/actions/restaurantAction";
import utilAction from "../redux/actions/utilAction";
import errorAction from "../redux/actions/errorAction";

import restaurantService from "../../services/restaurantService";
import HTTPMethod from "../../services/index";

import saveLocal from "../../helpers/saveLocal";
import history from "../../constants/history";

function* fetchListRestaurant() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(restaurantService.fetchAllRestaurant);

		yield put(restaurantAction.fetchListRestaurantSucceeded(data));
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
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(restaurantService.fetchRestaurantPerPage, {
			page,
		});

		yield put(restaurantAction.fetchListRestaurantPerPageSucceeded(data));
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
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(restaurantService.fetchTrendingRestaurant);

		yield put(restaurantAction.fetchRecommendRestaurantSucceeded(data));
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
		yield put(errorAction.getError(error.response));
	}
}

function* fetchLocationRestaurant({ location }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(
			restaurantService.fetchLocationRestaurantRecommend,
			{
				location,
			}
		);

		yield put(restaurantAction.fetchRecommendRestaurantLocationSucceeded(data));
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* fetchBehaviorRestaurant() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(
			restaurantService.fetchBehaviorRestaurantRecommend
		);

		yield put(restaurantAction.fetchRecommnedBehaviorRestaurantSucceeded(data));
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* fetchListCollectionRestaurant({ collectionId }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(
			restaurantService.fetchListCollectionRestaurant,
			{
				collectionId,
			}
		);

		yield put(restaurantAction.fetchListRestaurantPerPageSucceeded(data));
		yield put(restaurantAction.fetchListRestaurantSucceeded(data));
		yield call(getRestaurantDetail, { id: data[0].detail.ResId });
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* fetchTrendingGuessRestaurant() {
	try {
		const { data } = yield call(restaurantService.fetchTrendingRestaurantGuess);

		yield put(restaurantAction.fetchRecommendRestaurantGuessSucceeded(data));
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(utilAction.loadedUI());
		yield put(errorAction.getError(error.response));
	}
}

function* fetchSaveRestaurant() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(restaurantService.fetchSaveRestaurant);

		yield put(restaurantAction.fetchSaveRestaurantSucceeded(data));
		yield delay(2000);
		yield put(utilAction.loadedUI());
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
		yield put(utilAction.loadedUI());
	}
}

function* saveRestaurant({ restaurant }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });

		const { data } = yield call(restaurantService.likeRestaurant, {
			restaurantId: restaurant?.detail?.ResId,
		});

		if (data.enjoy === 1) {
			yield put(restaurantAction.saveRestaurantSucceeded(restaurant));
		} else {
			yield put(restaurantAction.removeSaveRestaurant(restaurant));
		}

		yield call(restaurantService.saveRestaurant, {
			restaurantId: restaurant?.detail?.ResId,
		});
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
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
			yield call(HTTPMethod.attachTokenToHeader, { token });
			const { data } = yield call(restaurantService.fetchDetailRestaurant, {
				id,
			});
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(data));
			const {
				restaurantReducer: { restaurantSearchDetail },
			} = yield select((state) => state);
			yield call(getRestaurantReview, {
				restaurantId: restaurantSearchDetail.detail.ResId,
				count: 1,
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
			yield call(HTTPMethod.attachTokenToHeader, { token });
			const { data } = yield call(restaurantService.fetchDetailRestaurant, {
				id,
			});
			yield put(restaurantAction.getRestaurantSearchDetailSucceeded(data));
			yield put(restaurantAction.removeRestaurantReviewList());
			const {
				restaurantReducer: { restaurantSearchDetail },
			} = yield select((state) => state);
			yield call(getRestaurantReview, {
				restaurantId: restaurantSearchDetail.detail.ResId,
				count: 1,
			});
			yield delay(1000);
			yield put(utilAction.loadedUI());
			yield put(errorAction.clearError());
		} catch (error) {
			console.log(error);
			yield put(errorAction.getError(error.response));
		}
	}
}

function* sendSurveyForm({ surveyForm }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });
		yield saveLocal.saveToLocal("statusSurvey", true);
		yield call(restaurantService.sendSurveyForm, {
			surveyForm,
		});
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
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const { data } = yield call(restaurantService.getAllSearchRestaurant, {
			listKeyword,
		});
		yield put(restaurantAction.getAllSearchRestaurantSucceeded(data));
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
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const { data } = yield call(restaurantService.searchRestaurant, {
			listKeyWord,
			page,
		});
		yield put(restaurantAction.searchRestaurantSucceeded(data));
		const {
			restaurantReducer: { restaurantSearchDetail },
		} = yield select((state) => state);
		yield call(getRestaurantReview, {
			restaurantId: restaurantSearchDetail.detail.ResId,
			count: 1,
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
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const { data } = yield call(restaurantService.getSearchRestaurantPePage, {
			listKeyWord,
			page,
		});
		yield put(restaurantAction.getSearchRestaurantPerPageSucceeded(data.data));
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
		restaurantReducer: { restaurantReviewList },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const { data } = yield call(restaurantService.getRestaurantReview, {
			restaurantId,
			count,
		});
		console.log("review", data);
		if (data.data.length !== 0) {
			if (restaurantReviewList.length === 0) {
				yield put(restaurantAction.getRestaurantReviewListSucceeded(data.data));
			} else {
				yield put(
					restaurantAction.getRestaurantReviewListSucceeded([
						...restaurantReviewList,
						data.data,
					])
				);
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
		yield call(HTTPMethod.attachTokenToHeader, { token });
		yield call(restaurantService.trackingUserScrollReviewList, {
			restaurantId,
		});
		yield put(errorAction.clearError());
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* sendInfoRecommendRestaurant({ listTypeRestaurant }) {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });
		yield call(restaurantService.sendInfoRecommendRestaurant, {
			listTypeRestaurant,
		});
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* getListCollection() {
	const {
		authReducer: { token },
	} = yield select((state) => state);

	try {
		yield call(HTTPMethod.attachTokenToHeader, { token });
		const { data } = yield call(restaurantService.getListCollection);

		yield put(restaurantAction.getListCollectionSucceeded(data));
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

function* sendReview({ reviewBody }) {
	try {
		const { data } = yield call(restaurantService.sendReview, { reviewBody });

		console.log(data);

		yield put(restaurantAction.sendReviewSucceeded(reviewBody));
	} catch (error) {
		console.log(error);
		yield put(errorAction.getError(error.response));
	}
}

export default function* restaurantSaga() {
	yield takeLatest(types.FETCH_LIST_RESTAURANT_REQUEST, fetchListRestaurant);
	yield takeLatest(
		types.FETCH_RECOMMEND_TRENDING_RESTAURANT_REQUEST,
		fetchTrendingRestaurant
	);
	yield takeLatest(
		types.FETCH_RECOMMEND_LOCATION_RESTAURANT_REQUEST,
		fetchLocationRestaurant
	);
	yield takeLatest(
		types.FETCH_RECOMMEND_BEHAVIOR_RESTAURANT_REQUEST,
		fetchBehaviorRestaurant
	);
	yield takeLatest(
		types.FETCH_LIST_COLLECTION_RESTAURANT,
		fetchListCollectionRestaurant
	);
	yield takeLatest(
		types.FETCH_RECOMMEND_TRENDING_RESTAURANT_GUESS_REQUEST,
		fetchTrendingGuessRestaurant
	);
	yield takeLatest(
		types.FETCH_SAVE_LIST_RESTAURANT_REQUEST,
		fetchSaveRestaurant
	);
	yield takeLatest(
		types.FETCH_LIST_RESTAURANT_PER_PAGE_REQUEST,
		fetchListRestaurantPerPage
	);
	yield takeLatest(
		types.GET_RESTAURANT_SEARCH_DETAIL_REQUEST,
		getRestaurantDetail
	);
	yield takeLatest(types.SEND_SURVEY_FORM_REQUEST, sendSurveyForm);
	yield takeLatest(
		types.GET_ALL_SEARCH_RESTAURANT_REQUEST,
		getAllSearchRestaurant
	);
	yield takeLatest(types.SEARCH_RESTAURANT_REQUEST, searchRestaurant);
	yield takeLatest(
		types.GET_SEARCH_RESTAURANT_PER_PAGE_REQUEST,
		getSearchRestaurantPerPage
	);
	yield takeLatest(
		types.TRACKING_USER_SCROLL_REVIEW_LIST,
		trackingUserIntersection
	);
	yield takeLatest(
		types.GET_RESTAURANT_REVIEW_LIST_REQUEST,
		getRestaurantReview
	);
	yield takeLatest(types.SAVE_RESTAURANT_REQUEST, saveRestaurant);
	yield takeLatest(
		types.SEND_INFO_RECOMMNED_RESTAURANT,
		sendInfoRecommendRestaurant
	);
	yield takeLatest(types.GET_LIST_COLLECTION_REQUESt, getListCollection);
	yield takeLatest(types.SEND_REVIEW_REQUEST, sendReview);
}
