import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/restaurant/list");

	fetchRestaurantPerPage = ({ page }) => HTTPMethod.post(`/api/v1/restaurant/paging?page=${page}&limit=10`);

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/restaurant/get?id=${id}`);

	searchRestaurant = ({ listKeyWord }) => HTTPMethod.post(`/api/v1/search?q=${listKeyWord.join("+")}`);
}

export default new restaurantService();
