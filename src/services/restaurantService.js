import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = ({ headers }) =>
		HTTPMethod.get("/api/v1/restaurant/list", {
			headers,
		});

	fetchTrendingRestaurant = ({ headers }) =>
		HTTPMethod.get("/api/v1/restaurant/recommendX", {
			headers,
		});

	fetchLocationRestaurantRecommend = ({ location, headers }) =>
		HTTPMethod.post(
			"/api/v1/restaurant/recommend_by_distance",
			{
				latitude: location.latitude,
				longitude: location.longitude,
			},
			{ headers }
		);

	fetchBehaviorRestaurantRecommend = ({ headers }) => HTTPMethod.get("/api/v1/restaurant/recommend", { headers });

	fetchListCollectionRestaurant = ({ collectionId, headers }) =>
		HTTPMethod.post("/api/v1/restaurant/get_by_category", { category_id: collectionId }, { headers });

	fetchTrendingRestaurantGuess = () => HTTPMethod.get("/api/v1/restaurant/guess");

	fetchRestaurantPerPage = ({ page, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/paging?page=${page}&limit=10`, {
			headers,
		});

	fetchDetailRestaurant = ({ id, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/get?resId=${id}`, {
			headers,
		});

	getAllSearchRestaurant = ({ listKeyword, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyword.join("+")}&limit=1000&page=1`, {
			headers,
		});

	searchRestaurant = ({ listKeyWord, page, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`, {
			headers,
		});

	getSearchRestaurantPePage = ({ listKeyWord, page, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`, { headers });

	getRestaurantReview = ({ restaurantId, count, headers }) =>
		HTTPMethod.get(`/api/v1/review/get?resId=${restaurantId}&count=${count}`, {
			headers,
		});

	trackingUserScrollReviewList = ({ restaurantId, headers }) =>
		HTTPMethod.post("/api/v1/user_behavior/view", { restaurant_id: restaurantId }, { headers });

	likeRestaurant = ({ restaurantId, headers }) =>
		HTTPMethod.post(
			"/api/v1/user_behavior/enjoy",
			{
				restaurant_id: restaurantId,
			},
			{ headers }
		);

	saveRestaurant = ({ restaurantId, headers }) =>
		HTTPMethod.post(
			"/api/v1/user_behavior/save",
			{
				restaurant_id: restaurantId,
			},
			{ headers }
		);

	fetchSaveRestaurant = ({ headers }) =>
		HTTPMethod.get("/api/v1/user_behavior/get_save", {
			headers,
		});

	sendSurveyForm = ({ surveyForm, headers }) =>
		HTTPMethod.post(
			"/api/v1/user/update",
			{
				...surveyForm,
			},
			{ headers }
		);

	sendInfoRecommendRestaurant = ({ listTypeRestaurant, headers }) =>
		HTTPMethod.post(
			"/api/v1/fuitable/saveto_uf",
			{
				fuitable_id: listTypeRestaurant,
			},
			{ headers }
		);

	getListCollection = ({ headers }) => HTTPMethod.get("/api/v1/fuitable/get_by_user", { headers });
}

export default new restaurantService();
