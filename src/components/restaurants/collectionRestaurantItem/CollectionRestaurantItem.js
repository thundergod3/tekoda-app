import React from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";

import "./CollectionRestaurantItem.scss";

const CollectionRestaurantItem = ({ collection: { id, name, collection_image } }) => {
	const { fetchListCollectionRestaurant } = restaurantAction;
	const dispatch = useDispatch();

	return (
		<Link
			to={`/today-eat/collection/collection_id=${id}`}
			onClick={() => dispatch(fetchListCollectionRestaurant(id))}>
			<div className="collection-restaurant-item" key={id}>
				<div className="collection-restaurant-item__container">
					<img src={collection_image} alt="" className="collection-restaurant-item__image" />
					<p className="collection-restaurant-item__bio">{name}</p>
				</div>
			</div>
		</Link>
	);
};

export default CollectionRestaurantItem;
