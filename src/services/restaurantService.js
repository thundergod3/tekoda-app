import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = ({ headers }) =>
		HTTPMethod.get("/api/v1/restaurant/list", {
			headers,
		});

	fetchTrendingRestaurant = ({ headers }) =>
		HTTPMethod.get("/api/v1/restaurant/recommend", {
			headers,
		});

	fetchRestaurantPerPage = ({ page, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/paging?page=${page}&limit=10`, {
			headers,
		});

	fetchDetailRestaurant = ({ id, headers }) =>
		HTTPMethod.get(`/api/v1/restaurant/get?id=${id}`, {
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
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`, {
			headers,
		});

	getRestaurantReview = ({ restaurantId, count, headers }) =>
		HTTPMethod.get(`/api/v1/review?resId=${restaurantId}&count=${count}`, {
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
}

export default new restaurantService();
