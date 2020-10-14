import React, { useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";

import "./UserReviewList.scss";
import ttiPolyfill from "tti-polyfill";
import ReactGA from "react-ga";

import UserReviewItem from "../userReviewItem/UserReviewItem";

const UserReviewList = () => {
	const {
		restaurantReducer: {
			restaurantReviewList,
			restaurantSearchDetail: { _id },
		},
	} = useSelector((state) => state);
	const intersectTarget = useRef(null);
	const dispatch = useDispatch();
	const { trackingUserScrollReviewList } = restaurantAction;

	useEffect(() => {
		const opts = {
			root: null,
			rootMargin: "0px",
			threshold: 0,
		};
		const callback = (list) => {
			list.forEach((entry) => {
				if (entry.isIntersecting) {
					ReactGA.event({
						category: "Scroll",
						action: "Scrolled to review",
						value: entry.intersectionRatio,
					});
					dispatch(trackingUserScrollReviewList(_id));
				}
			});
		};
		const observerScroll = new IntersectionObserver(callback, opts);

		observerScroll.observe(intersectTarget.current);
	}, []);

	return (
		<>
			<div className="user-review-list" ref={intersectTarget} id="review">
				{restaurantReviewList.length !== 0 &&
					restaurantReviewList.map((userReview) => (
						<>{userReview.Description && <UserReviewItem userReview={userReview} />}</>
					))}
			</div>
			{restaurantReviewList.length > 8 && (
				<button className="user-review-list__moreReview">Hiển thị tất cả 153 đánh giá</button>
			)}
		</>
	);
};

export default UserReviewList;
