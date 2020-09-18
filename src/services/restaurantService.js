import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/restaurant/list");

	fetchRestaurantPerPage = ({ page }) => HTTPMethod.post(`/api/v1/restaurant/paging?page=${page}&limit=10`);

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/restaurant/get?id=${id}`);

	getAllSearchRestaurant = ({ listKeyword }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyword.join("+")}&limit=1000&page=1`);

	searchRestaurant = ({ listKeyWord, page }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getSearchRestaurantPePage = ({ listKeyWord, page }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getRestaurantReview = ({ restaurantId, count }) =>
		HTTPMethod.get(`/api/v1/review?resId=${restaurantId}&count=${count}`);

	trackingUserScrollReviewList = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/create", { restaurant_id: restaurantId });

	saveRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/enjoy", { restaurant_id: restaurantId });
}

export default new restaurantService();
