import HTTPMethod from "./index";

class restaurantService {
	fetchAllRestaurant = () => HTTPMethod.get("/api/v1/retaurant/list");

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/retaurant/get?id=${id}`);
}

export default new restaurantService();
