import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/restaurant/list");

	fetchTrendingRestaurant = () => HTTPMethod.get("/api/v1/restaurant/recommend");

	fetchRestaurantPerPage = ({ page }) => HTTPMethod.get(`/api/v1/restaurant/paging?page=${page}&limit=10`)	;

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/restaurant/get?id=${id}`);

	getAllSearchRestaurant = ({ listKeyword }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyword.join("+")}&limit=1000&page=1`);

	searchRestaurant = ({ listKeyWord, page }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getSearchRestaurantPePage = ({ listKeyWord, page }) =>
		HTTPMethod.get(`/api/v1/restaurant/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getRestaurantReview = ({ restaurantId, count }) =>
		HTTPMethod.get(`/api/v1/review?resId=${restaurantId}&count=${count}`);

	trackingUserScrollReviewList = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/view", { restaurant_id: restaurantId });

	likeRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/enjoy", { restaurant_id: restaurantId });

	saveRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/save", { restaurant_id: restaurantId });

	fetchSaveRestaurant = () => HTTPMethod.get("/api/v1/user_behavior/get_save");
}

export default new restaurantService();
