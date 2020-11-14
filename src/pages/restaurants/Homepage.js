import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import authAction from "../../stores/redux/actions/authAction";
import utilAction from "../../stores/redux/actions/utilAction";

import "./restaurants.scss";

import Loading from "../../components/utils/loading/Loading";
import RestaurantRecommendList from "../../components/restaurants/restaurantRecommendList/RestaurantRecommendList";
import WrapperSearchBar from "../../components/layouts/wrapperSearchBar/WrapperSearchBar";

const Homepage = () => {
	const {
		restaurantReducer: { trendingRestaurantList, statusSurvey },
		authReducer: { authenticated },
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const {
		fetchListRestaurantRequest,
		removeListRestaurantPerPage,
		fetchRecommendRestaurantRequest,
		deleteStoreListKeyWord,
	} = restaurantAction;
	const { loadingUI } = utilAction;

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchListRestaurantRequest());
		dispatch(removeListRestaurantPerPage());
		dispatch(deleteStoreListKeyWord());
		dispatch(fetchRecommendRestaurantRequest());
	}, []);

	if (statusSurvey === undefined || (!statusSurvey && authenticated === true)) {
		return <Redirect to="/survey" />;
	}

	console.log(trendingRestaurantList);

	const testList = [
		{
			Address: "1 Thanh Niên, P. Yên Phụ (Đối Diện Chùa Trấn Quốc), Quận Tây Hồ, Hà Nội",
			AvgRatingText: 5.9,
			Category: "['Nhà hàng']",
			Close: "21:00",
			CloseTime: "21:30",
			Cuisines: "['Món Việt', 'Món Bắc', 'Hà Nội']",
			Fit: "['Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable: "",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.047404,
			LocationScore: 4.9,
			Longitude: 105.83755,
			Name: "Bánh Tôm Hồ Tây",
			Open: "09:00",
			OpenTime: "09:00 - 21:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 3 - 5 phút",
			PriceRange: "80.000đ - 132.000đ",
			PriceScore: 5.2,
			QualityScore: 7.2,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 27,
			ServiceScore: 6.6,
			SpaceScore: 5.5,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Hẹn hò', 'Uống bia - Nhậu', 'Họp nhóm', 'Tiếp khách', 'Tiệc ngoài trời', 'Tổ chức tiệc cưới', 'Ngắm cảnh', 'Takeaway - Mang về', 'Du lịch', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 415,
			TotalReviews: 149,
			TotalViews: 0,
			Url: "/ha-noi/banh-tom-ho-tay",
			Website: "www.banhtomhotay.com",
			stt: 0,
		},
		{
			Address: "23 Thái Thịnh, Quận Đống Đa, Hà Nội",
			AvgRatingText: 6.7,
			Category: "['Nhà hàng', 'Tiệc cưới/Hội nghị']",
			Close: "23:00",
			CloseTime: "10:30 PM",
			Cuisines: "['Món Việt', 'Món Á']",
			Fit: "['Buổi sáng', 'Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable:
				"['Thịt Gà', 'Tôm', 'Cua - Ghẹ', 'Thịt Bò', 'Thịt Heo', 'Hải sản', 'Bào Ngư', 'Cá', 'Cháo', 'Súp', 'Nghêu - Sò - Ốc', 'Mực', 'Thịt Vịt', 'Salad', 'Chả giò', 'Gỏi', 'Món chay', 'Đặc sản vùng', 'Ăn vặt - Ăn nhẹ', 'Rượu vang', 'Thức uống', 'Bia', 'Nước ngọt', 'Trái cây']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.00572,
			LocationScore: 6,
			Longitude: 105.822502,
			Name: "Vạn Tuế - Nhà Hàng Tiệc Cưới",
			Open: "06:00",
			OpenTime: "06:00 - 23:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 10 - 15 phút",
			PriceRange: "200.000đ - 330.000đ",
			PriceScore: 6.8,
			QualityScore: 6.9,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 33,
			ServiceScore: 6.9,
			SpaceScore: 6.8,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Uống bia - Nhậu', 'Họp nhóm', 'Tiếp khách', 'Ăn chay', 'Tổ chức tiệc cưới', 'BBQ - Món Nướng', 'Ngắm cảnh', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 146,
			TotalReviews: 29,
			TotalViews: 0,
			Url: "/ha-noi/van-tue",
			Website: "www.vantue.com.vn",
			stt: 1,
		},
		{
			Address: "36 Nguyễn Hữu Thọ (đường đôi Linh Đàm), Quận Hoàng Mai, Hà Nội",
			AvgRatingText: 5.5,
			Category: "['Nhà hàng']",
			Close: "22:00",
			CloseTime: "10:30 PM",
			Cuisines: "['Món Việt']",
			Fit: "['Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable: "['Thịt Gà', 'Gà ta']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 20.971149,
			LocationScore: 4.9,
			Longitude: 105.83682,
			Name: "Gà 36 - Linh Đàm",
			Open: "10:30",
			OpenTime: "16:00 - 22:00 | 10:30 - 14:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 10 - 15 phút",
			PriceRange: "70.000đ - 165.000đ",
			PriceScore: 5.5,
			QualityScore: 5.9,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 52,
			ServiceScore: 5.8,
			SpaceScore: 5.8,
			Suitable: "['Ăn gia đình', 'Uống bia - Nhậu']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 11,
			TotalReviews: 13,
			TotalViews: 0,
			Url: "/ha-noi/ga-36-linh-dam",
			Website: "www.ga36.vn",
			stt: 2,
		},
		{
			Address: "15 Tô Hiến Thành, Quận Hai Bà Trưng, Hà Nội",
			AvgRatingText: 6.2,
			Category: "['Nhà hàng']",
			Close: "22:30",
			CloseTime: "09:30 PM",
			Cuisines: "['Món Nhật']",
			Fit: "['Buổi  trưa', 'Buổi  tối']",
			Fuitable: "['Hải sản', 'Lẩu', 'Sushi & Sashimi']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.013518,
			LocationScore: 4.8,
			Longitude: 105.851115,
			Name: "Wabi Sabi - Lẩu Nhật Bản",
			Open: "10:30",
			OpenTime: "17:30 - 22:30 | 10:30 - 02:30",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 3 - 5 phút",
			PriceRange: "100.000đ - 220.000đ",
			PriceScore: 6.1,
			QualityScore: 7.1,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 75,
			ServiceScore: 6.7,
			SpaceScore: 6.1,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Hẹn hò', 'Họp nhóm', 'Tiếp khách', 'Ngắm cảnh', 'Du lịch', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 81,
			TotalReviews: 16,
			TotalViews: 0,
			Url: "/ha-noi/wabi-sabi",
			Website: "www.wabisabi.com.vn",
			stt: 3,
		},
		{
			Address: "31 Láng Hạ, Quận Ba Đình, Hà Nội",
			AvgRatingText: 7.1,
			Category: "['Nhà hàng']",
			Close: "22:00",
			CloseTime: "09:30 PM",
			Cuisines: "['Món Nhật']",
			Fit: "['Buổi sáng', 'Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable: "['Thịt Bò', 'Hải sản', 'Lẩu', 'Sushi & Sashimi']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.019595,
			LocationScore: 5.7,
			Longitude: 105.817335,
			Name: "Miwa - Ẩm thực Nhật",
			Open: "11:00",
			OpenTime: "17:00 - 22:00 | 11:00 - 14:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 5 - 10 phút",
			PriceRange: "100.000đ - 330.000đ",
			PriceScore: 7.3,
			QualityScore: 7.7,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 77,
			ServiceScore: 7.4,
			SpaceScore: 7.4,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Hẹn hò', 'Họp nhóm', 'Tiếp khách', 'Giao tận nơi', 'Takeaway - Mang về', 'Du lịch', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 49,
			TotalReviews: 9,
			TotalViews: 0,
			Url: "/ha-noi/miwa",
			Website: "www.sushimiwa.com",
			stt: 4,
		},
		{
			Address: "1 Thanh Niên, P. Yên Phụ (Đối Diện Chùa Trấn Quốc), Quận Tây Hồ, Hà Nội",
			AvgRatingText: 5.9,
			Category: "['Nhà hàng']",
			Close: "21:00",
			CloseTime: "21:30",
			Cuisines: "['Món Việt', 'Món Bắc', 'Hà Nội']",
			Fit: "['Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable: "",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.047404,
			LocationScore: 4.9,
			Longitude: 105.83755,
			Name: "Bánh Tôm Hồ Tây",
			Open: "09:00",
			OpenTime: "09:00 - 21:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 3 - 5 phút",
			PriceRange: "80.000đ - 132.000đ",
			PriceScore: 5.2,
			QualityScore: 7.2,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 27,
			ServiceScore: 6.6,
			SpaceScore: 5.5,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Hẹn hò', 'Uống bia - Nhậu', 'Họp nhóm', 'Tiếp khách', 'Tiệc ngoài trời', 'Tổ chức tiệc cưới', 'Ngắm cảnh', 'Takeaway - Mang về', 'Du lịch', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 415,
			TotalReviews: 149,
			TotalViews: 0,
			Url: "/ha-noi/banh-tom-ho-tay",
			Website: "www.banhtomhotay.com",
			stt: 0,
		},
		{
			Address: "23 Thái Thịnh, Quận Đống Đa, Hà Nội",
			AvgRatingText: 6.7,
			Category: "['Nhà hàng', 'Tiệc cưới/Hội nghị']",
			Close: "23:00",
			CloseTime: "10:30 PM",
			Cuisines: "['Món Việt', 'Món Á']",
			Fit: "['Buổi sáng', 'Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable:
				"['Thịt Gà', 'Tôm', 'Cua - Ghẹ', 'Thịt Bò', 'Thịt Heo', 'Hải sản', 'Bào Ngư', 'Cá', 'Cháo', 'Súp', 'Nghêu - Sò - Ốc', 'Mực', 'Thịt Vịt', 'Salad', 'Chả giò', 'Gỏi', 'Món chay', 'Đặc sản vùng', 'Ăn vặt - Ăn nhẹ', 'Rượu vang', 'Thức uống', 'Bia', 'Nước ngọt', 'Trái cây']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.00572,
			LocationScore: 6,
			Longitude: 105.822502,
			Name: "Vạn Tuế - Nhà Hàng Tiệc Cưới",
			Open: "06:00",
			OpenTime: "06:00 - 23:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 10 - 15 phút",
			PriceRange: "200.000đ - 330.000đ",
			PriceScore: 6.8,
			QualityScore: 6.9,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 33,
			ServiceScore: 6.9,
			SpaceScore: 6.8,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Uống bia - Nhậu', 'Họp nhóm', 'Tiếp khách', 'Ăn chay', 'Tổ chức tiệc cưới', 'BBQ - Món Nướng', 'Ngắm cảnh', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 146,
			TotalReviews: 29,
			TotalViews: 0,
			Url: "/ha-noi/van-tue",
			Website: "www.vantue.com.vn",
			stt: 1,
		},
		{
			Address: "36 Nguyễn Hữu Thọ (đường đôi Linh Đàm), Quận Hoàng Mai, Hà Nội",
			AvgRatingText: 5.5,
			Category: "['Nhà hàng']",
			Close: "22:00",
			CloseTime: "10:30 PM",
			Cuisines: "['Món Việt']",
			Fit: "['Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable: "['Thịt Gà', 'Gà ta']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 20.971149,
			LocationScore: 4.9,
			Longitude: 105.83682,
			Name: "Gà 36 - Linh Đàm",
			Open: "10:30",
			OpenTime: "16:00 - 22:00 | 10:30 - 14:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 10 - 15 phút",
			PriceRange: "70.000đ - 165.000đ",
			PriceScore: 5.5,
			QualityScore: 5.9,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 52,
			ServiceScore: 5.8,
			SpaceScore: 5.8,
			Suitable: "['Ăn gia đình', 'Uống bia - Nhậu']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 11,
			TotalReviews: 13,
			TotalViews: 0,
			Url: "/ha-noi/ga-36-linh-dam",
			Website: "www.ga36.vn",
			stt: 2,
		},
		{
			Address: "15 Tô Hiến Thành, Quận Hai Bà Trưng, Hà Nội",
			AvgRatingText: 6.2,
			Category: "['Nhà hàng']",
			Close: "22:30",
			CloseTime: "09:30 PM",
			Cuisines: "['Món Nhật']",
			Fit: "['Buổi  trưa', 'Buổi  tối']",
			Fuitable: "['Hải sản', 'Lẩu', 'Sushi & Sashimi']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.013518,
			LocationScore: 4.8,
			Longitude: 105.851115,
			Name: "Wabi Sabi - Lẩu Nhật Bản",
			Open: "10:30",
			OpenTime: "17:30 - 22:30 | 10:30 - 02:30",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 3 - 5 phút",
			PriceRange: "100.000đ - 220.000đ",
			PriceScore: 6.1,
			QualityScore: 7.1,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 75,
			ServiceScore: 6.7,
			SpaceScore: 6.1,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Hẹn hò', 'Họp nhóm', 'Tiếp khách', 'Ngắm cảnh', 'Du lịch', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 81,
			TotalReviews: 16,
			TotalViews: 0,
			Url: "/ha-noi/wabi-sabi",
			Website: "www.wabisabi.com.vn",
			stt: 3,
		},
		{
			Address: "31 Láng Hạ, Quận Ba Đình, Hà Nội",
			AvgRatingText: 7.1,
			Category: "['Nhà hàng']",
			Close: "22:00",
			CloseTime: "09:30 PM",
			Cuisines: "['Món Nhật']",
			Fit: "['Buổi sáng', 'Buổi  trưa', 'Buổi xế', 'Buổi  tối']",
			Fuitable: "['Thịt Bò', 'Hải sản', 'Lẩu', 'Sushi & Sashimi']",
			Holiday: "Các ngày lễ trong năm",
			Latitude: 21.019595,
			LocationScore: 5.7,
			Longitude: 105.817335,
			Name: "Miwa - Ẩm thực Nhật",
			Open: "11:00",
			OpenTime: "17:00 - 22:00 | 11:00 - 14:00",
			OtherPriceRange: "",
			PreparationTime: "Khoảng 5 - 10 phút",
			PriceRange: "100.000đ - 330.000đ",
			PriceScore: 7.3,
			QualityScore: 7.7,
			ResCreatedOn: "0001-12-31T17:00:00Z",
			ResId: 77,
			ServiceScore: 7.4,
			SpaceScore: 7.4,
			Suitable:
				"['Đãi tiệc', 'Ăn gia đình', 'Hẹn hò', 'Họp nhóm', 'Tiếp khách', 'Giao tận nơi', 'Takeaway - Mang về', 'Du lịch', 'Nghe nhạc', 'Tiếp khách sang trọng']",
			TotalCheckIns: 0,
			TotalFavourites: 0,
			TotalPictures: 49,
			TotalReviews: 9,
			TotalViews: 0,
			Url: "/ha-noi/miwa",
			Website: "www.sushimiwa.com",
			stt: 4,
		},
	];

	return (
		<>
			{authenticated !== undefined && statusSurvey !== undefined ? (
				<>
					{loading === true ? (
						<Loading />
					) : (
						<>
							<WrapperSearchBar />
							<div className="homepage">
								<RestaurantRecommendList
									restaurantRecommendList={testList}
									title="Top nhà hàng nổi bật trên mạng xã hội"
									bio="Take a fresh view an span our top visited places"
									style={{ marginTop: 0 }}
								/>
								<RestaurantRecommendList
									restaurantRecommendList={testList}
									title="Top ăn trưa gần Hoàng Đạo Thúy gợi ý cho riêng bạn"
									bio="Take a fresh view an span our top visited places"
								/>
								<RestaurantRecommendList
									restaurantRecommendList={testList}
									title="Top nhà hàng nổi bật trên mạng xã hội"
									bio="Take a fresh view an span our top visited places"
								/>
							</div>
						</>
					)}
				</>
			) : (
				<Loading />
			)}
		</>
	);
};

export default Homepage;
