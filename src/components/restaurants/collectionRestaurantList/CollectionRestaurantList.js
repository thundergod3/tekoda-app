import React, { useEffect } from "react";

import "./CollectionRestaurantList.scss";

import CollectionRestaurantItem from "../collectionRestaurantItem/CollectionRestaurantItem";

import { useDispatch, useSelector } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";

const CollectionRestaurantList = () => {
	const {
		restaurantReducer: { collectionList },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { getListCollectionRequest } = restaurantAction;

	useEffect(() => {
		dispatch(getListCollectionRequest());
	}, []);

	return (
		<div className="collection-restaurant-list">
			<p className="collection-restaurant-list__title">Chọn riêng cho bạn</p>
			<div className="collection-restaurant-list__container">
				{collectionList.map((collection) => (
					<CollectionRestaurantItem collection={collection} />
				))}
			</div>
		</div>
	);
};

export default CollectionRestaurantList;
