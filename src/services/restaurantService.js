import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/restaurant/list");

	fetchRestaurantPerPage = ({ page }) => HTTPMethod.post(`/api/v1/restaurant/paging?page=${page}&limit=10`);

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/restaurant/get?id=${id}`);

	searchRestaurant = ({ listKeyWord, page }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getRestaurantReview = ({ restaurantId, count }) =>
		HTTPMethod.get(`/api/v1/review?resId=${restaurantId}&count=${count}`);
}

export default new restaurantService();
