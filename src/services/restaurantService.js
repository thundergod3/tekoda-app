import HTTPMethod from "./index";
import cookieLocal from "../helpers/cookieLocal";

class restaurantService {
	fetchAllRestaurant = () =>
		HTTPMethod.get("/api/v1/restaurant/list", {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
		});

	fetchTrendingRestaurant = () =>
		HTTPMethod.get("/api/v1/restaurant/recommend", {
			headers: {
				Authorization:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDA1NTk5NTEsImlhdCI6MTYwMDQ3MzU1MSwic3ViIjoxNH0.fw-O4lBwzQuyzwCxnISY4wUlMOu4E6h46G2AS2qb03Y",
			},
		});

	fetchRestaurantPerPage = ({ page }) => HTTPMethod.post(`/api/v1/restaurant/paging?page=${page}&limit=10`);

	fetchDetailRestaurant = ({ id }) => HTTPMethod.get(`/api/v1/restaurant/get?id=${id}`);

	getAllSearchRestaurant = ({ listKeyword }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyword.join("+")}&limit=1000&page=1`);

	searchRestaurant = ({ listKeyWord, page }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`);

	getSearchRestaurantPePage = ({ listKeyWord, page }) =>
		HTTPMethod.post(`/api/v1/search?q=${listKeyWord.join("+")}&limit=10&page=${page}`, {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
		});

	getRestaurantReview = ({ restaurantId, count }) =>
		HTTPMethod.get(`/api/v1/review?resId=${restaurantId}&count=${count}`, {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
		});

	trackingUserScrollReviewList = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/create", {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
			restaurant_id: restaurantId,
		});

	likeRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/enjoy", {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
			restaurant_id: restaurantId,
		});

	saveRestaurant = ({ restaurantId }) =>
		HTTPMethod.post("/api/v1/user_behavior/save", {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
			restaurant_id: restaurantId,
		});

	fetchSaveRestaurant = () =>
		HTTPMethod.get("/api/v1/user_behavior/get_save", {
			headers: {
				Authorization: `Bearer ${cookieLocal.getFromCookie("token")}`,
			},
		});
}

export default new restaurantService();
