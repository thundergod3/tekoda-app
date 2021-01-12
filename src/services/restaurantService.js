import HTTPMethod from "./index";

class restaurantService {
	// [GET]
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/restaurant/list");
	fetchTrendingRestaurant = () =>
		HTTPMethod.get("/api/v1/restaurant/recommendX");
	fetchBehaviorRestaurantRecommend = () =>
		HTTPMethod.get("/api/v1/restaurant/recommend");
	fetchTrendingRestaurantGuess = () =>
		HTTPMethod.get("/api/v1/restaurant/guess");
	fetchRestaurantPerPage = ({ page }) =>
		HTTPMethod.get(`/api/v1/restaurant/paging?page=${page}&limit=10`);
	fetchDetailRestaurant = ({ id }) =>
		HTTPMethod.get(`/api/v1/restaurant/get?resId=${id}`);
	getAllSearchRestaurant = ({ listKeyword }) =>
		HTTPMethod.get(
			`/api/v1/restaurant/search?q=${listKeyword.join("+")}&limit=1000&page=1`
		);
	searchRestaurant = ({ listKeyWord, page }) =>
		HTTPMethod.get(
			`/api/v1/restaurant/search?q=${listKeyWord.join(
				"+"
			)}&limit=10&page=${page}`
		);
	getSearchRestaurantPePage = ({ listKeyWord, page }) =>
		HTTPMethod.get(
			`/api/v1/restaurant/search?q=${listKeyWord.join(
				"+"
			)}&limit=10&page=${page}`
		);
	getRestaurantReview = ({ restaurantId, count }) =>
		HTTPMethod.get(`/api/v1/review/get?resId=${restaurantId}&count=${count}`);
	fetchSaveRestaurant = () => HTTPMethod.get("/api/v1/user_behavior/get_save");
	getListCollection = () => HTTPMethod.get("/api/v1/fuitable/get_by_user");

	// [POST]
	fetchLocationRestaurantRecommend = ({ location }) =>
		HTTPMethod.post("/api/v1/restaurant/recommend_by_distance", {
			latitude: location.latitude,
			longitude: location.longitude,
		});
	fetchListCollectionRestaurant = ({ collectionId }) =>
		HTTPMethod.post("/api/v1/restaurant/get_by_category", {
			category_id: collectionId,
		});
	trackingUserScrollReviewList = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/view", {
			restaurant_id: restaurantId,
		});
	likeRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/enjoy", {
			restaurant_id: restaurantId,
		});
	saveRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/save", {
			restaurant_id: restaurantId,
		});
	sendSurveyForm = ({ surveyForm }) =>
		HTTPMethod.post("/api/v1/user/update", {
			...surveyForm,
		});
	sendInfoRecommendRestaurant = ({ listTypeRestaurant }) =>
		HTTPMethod.post("/api/v1/fuitable/saveto_uf", {
			fuitable_id: listTypeRestaurant,
		});
	sendReview = ({ reviewBody }) =>
		HTTPMethod.post("/api/v1/review/save", { ...reviewBody });
}

export default new restaurantService();
