import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
		let tempSlide = slide;

		console.log(tempSlide);
		if (tempSlide === 1) {
			return;
		} else {
			setSlide(tempSlide + 1);
			setStatusSlide(true);
			setPixelTranform(pixelTransform + (tempSlide + 1) * width);
		}
	};

	const handlePreviousSlide = () => {
		let tempSlide = slide;

		if (tempSlide === 0) {
			return;
		} else {
			setSlide(tempSlide - 1);
			setStatusSlide(false);
			setPixelTranform(pixelTransform - tempSlide * width);
		}
	};

	useEffect(() => {
		if (window.innerWidth >= 300 && window.innerWidth <= 420) {
			setWidth(5 * 100 + 50);
		} else {
			setWidth(5 * 240 + 50);
		}
	}, [window.innerWidth]);

	return (
		<div className="restaurant-recommend-list" style={style}>
			<p className="restaurant-recommend-list__title">{title}</p>
			<p className="restaurant-recommend-list__bio">{bio}</p>
			<div className="restaurant-recommend-list__container">
				<div className="icon-arrow__container">
					<img src={IconArrowLeft} className="icon-arrow icon-arrow-left" onClick={handlePreviousSlide} />
					<img src={IconArrowRight} className="icon-arrow icon-arrow-right" onClick={handleNextSlide} />
				</div>
				<div
					className="restaurant-recommend-list__containerWrapper"
					style={{
						width,
						transform: `translateX(${!statusSlide ? pixelTransform * -1 : pixelTransform * -1}px)`,
					}}>
					{restaurantRecommendList.slice(0, 10).map((restaurant, index) => (
						<Link to={`/today-eat/${restaurant.ResId}/page=1`} key={index}>
							<RestaurantRecommendItem restaurant={restaurant} id={restaurant.ResId} />
						</Link>
					))}
				</div>
				{/* <Carousel
					className={"restaurant-social-recommend-list__container"}
					addArrowClickHandler
					arrows
					slidesPerScroll={5}
					animationSpeed={500}
					arrowLeft={}
					arrowRight={}
					itemWidth={240}
					offset={8}>
					{restaurantRecommendList.slice(0, 10).map((restaurant, index) => (
						<Link to={`/today-eat/${restaurant.ResId}/page=1`} key={index}>
							<RestaurantRecommendItem restaurant={restaurant} id={restaurant.ResId} />
						</Link>
					))}
				</Carousel> */}
			</div>
		</div>
	);
};

export default RestaurantRecommendList;
