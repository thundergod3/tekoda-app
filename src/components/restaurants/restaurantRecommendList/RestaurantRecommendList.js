import React, { useEffect, useState } from "react";

import Carousel from "@brainhubeu/react-carousel";
import IconArrowLeft from "../../../assets/icons/arrow_left.png";
import IconArrowRight from "../../../assets/icons/arrow_right.png";
import "@brainhubeu/react-carousel/lib/style.css";
import "./RestaurantRecommendList.scss";

import RestaurantRecommendItem from "../restaurantRecommendItem/RestaurantRecommendItem";

const RestaurantRecommendList = ({ restaurantRecommendList, title, bio, style }) => {
	const [slide, setSlide] = useState(0);
	const [width, setWidth] = useState(0);
	const [pixelTransform, setPixelTranform] = useState(0);
	const [statusSlide, setStatusSlide] = useState(false);

	const handleNextSlide = () => {
		if (slide === 1 && window.innerWidth > 420) {
			return;
		} else {
			setSlide(slide + 1);
			setStatusSlide(true);
			setPixelTranform(pixelTransform + width);
		}
	};

	const handlePreviousSlide = () => {
		if (slide === 0) {
			return;
		} else {
			setSlide(slide - 1);
			setStatusSlide(false);
			setPixelTranform(pixelTransform - width);
		}
	};

	useEffect(() => {
		if (window.innerWidth >= 300 && window.innerWidth <= 420) {
			setWidth(3 * 100 + 30);
		} else {
			setWidth(5 * 240 + 50);
		}
	}, [window.innerWidth]);

	return (
		<div className="restaurant-recommend-list" style={style}>
			<p className="restaurant-recommend-list__title">{title}</p>
			<div className="restaurant-recommend-list__container">
				<div className="icon-arrow__container">
					<img
						src={IconArrowLeft}
						className={`icon-arrow icon-arrow-left ${slide === 0 ? "icon-arrow--disable" : ""}`}
						onClick={handlePreviousSlide}
					/>
					<img
						src={IconArrowRight}
						className={`icon-arrow icon-arrow-right ${
							(slide === 1 && window.innerWidth > 420) || (window.innerWidth <= 420 && slide === 3)
								? "icon-arrow--disable"
								: ""
						}`}
						onClick={handleNextSlide}
					/>
				</div>
				<div
					className="restaurant-recommend-list__containerWrapper"
					style={{
						width,
						transform: `translateX(${!statusSlide ? pixelTransform * -1 : pixelTransform * -1}px)`,
					}}>
					{restaurantRecommendList.slice(0, 10).map((restaurant, index) => (
						<RestaurantRecommendItem restaurant={restaurant} id={restaurant.ResId} />
					))}
				</div>
			</div>
		</div>
	);
};

export default RestaurantRecommendList;
