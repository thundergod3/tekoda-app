import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/restaurant/list");

	fetchTrendingRestaurant = () => HTTPMethod.get("/api/v1/restaurant/recommendX");

	fetchLocationRestaurantRecommend = ({ location }) =>
		HTTPMethod.post("/api/v1/restaurant/recommend_by_distance", {
			latitude: location.latitude,
			longitude: location.longitude,
		});

	fetchBehaviorRestaurantRecommend = () => HTTPMethod.get("/api/v1/restaurant/recommend");

	fetchListCollectionRestaurant = ({ collectionId }) =>
		HTTPMethod.post("/api/v1/restaurant/get_by_category", { category_id: collectionId });

	fetchTrendingRestaurantGuess = () => HTTPMethod.get("/api/v1/restaurant/guess");

	fetchRestaurantPerPage = ({ page }) => HTTPMethod.get(`/api/v1/restaurant/paging?page=${page}&limit=10`);

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/restaurant/get?resId=${id}`);

	getAllSearchRestaurant = ({ listKeyword }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyword.join("+")}&limit=1000&page=1`);

	searchRestaurant = ({ listKeyWord, page }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getSearchRestaurantPePage = ({ listKeyWord, page }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getRestaurantReview = ({ restaurantId, count }) =>
		HTTPMethod.get(`/api/v1/review/get?resId=${restaurantId}&count=${count}`);

	trackingUserScrollReviewList = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/view", { restaurant_id: restaurantId });

	likeRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/enjoy", {
			restaurant_id: restaurantId,
		});

	saveRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/save", {
			restaurant_id: restaurantId,
		});

	fetchSaveRestaurant = () => HTTPMethod.get("/api/v1/user_behavior/get_save");

	sendSurveyForm = ({ surveyForm }) =>
		HTTPMethod.post("/api/v1/user/update", {
			...surveyForm,
		});

	sendInfoRecommendRestaurant = ({ listTypeRestaurant }) =>
		HTTPMethod.post("/api/v1/fuitable/saveto_uf", {
			fuitable_id: listTypeRestaurant,
		});

	getListCollection = () => HTTPMethod.get("/api/v1/fuitable/get_by_user");
}

export default new restaurantService();
