import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../stores/redux/actions/restaurantAction";
import utilAction from "../../stores/redux/actions/utilAction";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import "./restaurants.scss";
import history from "../../constants/history";

import SaveRestaurantList from "../../components/restaurants/saveRestaurantList/SaveRestaurantList";
import Loading from "../../components/utils/loading/Loading";

const SaveRestaurantPage = () => {
	const {
		restaurantReducer: { saveRestaurantList, statusSurvey },
		utilReducer: { loading },
		authReducer: { authenticated },
		errorReducer: { errorStatus },
	} = useSelector((state) => state);
	const { fetchSaveRestaurantRequest } = restaurantAction;
	const { loadingUI } = utilAction;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadingUI());
		dispatch(fetchSaveRestaurantRequest());
	}, []);

	if (authenticated === false || errorStatus === 401) return <Redirect to="/login" />;

	if (!statusSurvey && authenticated === true) {
		return <Redirect to="/survey" />;
	}

	return (
		<>
			{loading === true ? (
				<Loading />
			) : (
				<div className="save-restaurant-page">
					<div className="save-restaurant-page__backPage" onClick={() => history.goBack()}>
						<ArrowBackIosIcon />
						<p className="save-restaurant-page__backPageTitle">Quay lại </p>
					</div>
					<p className="save-restaurant-page__title">Danh sách nhà hàng đã lưu</p>
					{saveRestaurantList.length === 0 ? (
						<p className="save-restaurant-page__warning">Danh sách lưu nhà hàng của bạn hiện đang trống</p>
					) : (
						<SaveRestaurantList />
					)}
				</div>
			)}
		</>
	);
};

export default SaveRestaurantPage;
