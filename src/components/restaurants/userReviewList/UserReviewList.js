import React, { useRef, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import restaurantAction from "../../../stores/redux/actions/restaurantAction";

import "./UserReviewList.scss";
import ReactGA from "react-ga";
import { Formik } from "formik";
import * as Yup from "yup";

import Modal from "@material-ui/core/Modal";

import UserReviewItem from "../userReviewItem/UserReviewItem";
import TextAreaField from "../../utils/textAreaField/TextAreaField";
import InputField from "../../utils/inputField/InputField";

const YupSchema = Yup.object({
	description: Yup.string().required("Bình luận là bắt buộc"),
	rating: Yup.number()
		.min(0, "Giá trị tối thiểu là 0")
		.max(10, "Giá trị lớn nhât là 10")
		.required("Điểm đánh giá là bắt buộc"),
});

const UserReviewList = () => {
	const {
		restaurantReducer: {
			restaurantReviewList,
			restaurantSearchDetail: { _id },
		},
	} = useSelector((state) => state);
	const [open, setOpen] = useState(false);
	const intersectTarget = useRef(null);
	const dispatch = useDispatch();
	const { trackingUserScrollReviewList, sendReviewRequest } = restaurantAction;

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

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
				{restaurantReviewList.length !== 0 ? (
					restaurantReviewList.map((userReview) => (
						<>
							{userReview.Description && <UserReviewItem userReview={userReview} />}
							<p>Hãy để lại 1 bình luận nha ^^</p>
							<button
								className="user-review-list__btnOpenModal"
								type="button"
								onClick={handleOpen}></button>
						</>
					))
				) : (
					<>
						<p>Nhà hàng này hiện không có đánh giá nào.</p>
						<button className="user-review-list__btnOpenModal" type="button" onClick={handleOpen}>
							Hãy là người đầu tiên viết đánh giá nào ^^
						</button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description">
							<Formik
								initialValues={{
									title: "",
									description: "",
									rating: "",
								}}
								validationSchema={YupSchema}
								onSubmit={(values, actions) => {
									dispatch(
										sendReviewRequest({
											Title: values.title,
											Description: values.description,
											AvgRating: values.rating,
											ResId: _id,
										})
									);
									actions.resetForm();
									handleClose();
								}}>
								{(props) => (
									<div className="user-review-list__modalReviewContainer">
										<label>Tiêu đề</label>
										<InputField
											{...props}
											titleField="title"
											typeInput="text"
											titlePlaceholder="Tiêu đề"
											style={{
												background: "#fff",
												width: "100%",
												border: "solid 1px #000",
												padding: "10px 20px",
												marginTop: 10,
											}}
											useCustomErrorIcon={true}
										/>
										<label>Bình luận</label>
										<TextAreaField
											{...props}
											titleField="description"
											typeInput="text"
											titlePlaceholder="Hãy để lại 1 lời đánh giá"
											height={200}
											style={{ marginBottom: 10 }}
											useCustomErrorIcon={true}
										/>
										<label>Rating</label>
										<InputField
											{...props}
											titleField="rating"
											typeInput="number"
											titlePlaceholder="Hãy cho điểm đánh giá"
											style={{
												background: "#fff",
												width: "100%",
												border: "solid 1px #000",
												padding: "10px 20px",
												marginTop: 10,
											}}
											useCustomErrorIcon={true}
										/>
										<button
											className={`user-review-list__modalReviewButton ${
												props.errors.description || props.errors.rating ? "button--disable" : ""
											}`}
											type="submit"
											disabled={props.errors.description || props.errors.rating}
											onClick={props.handleSubmit}>
											Gửi
										</button>
									</div>
								)}
							</Formik>
						</Modal>
					</>
				)}
			</div>
			{restaurantReviewList.length > 8 && (
				<button className="user-review-list__moreReview">Hiển thị tất cả 153 đánh giá</button>
			)}
		</>
	);
};

export default UserReviewList;
