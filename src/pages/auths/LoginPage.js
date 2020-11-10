import React from "react";
import { Link, Redirect } from "react-router-dom";

import logo from "../../assets/icons/logo_white.png";
import facebookLogo from "../../assets/icons/facebook.png";
import iconMap from "../../assets/icons/map_icon.png";
import foodImage from "../../assets/utils/food_bg.png";
import iconUser from "../../assets/icons/user.png";
import iconPassword from "../../assets/icons/password.png";
import iconErrorRed from "../../assets/icons/error_red.png";

import "./auths.scss";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FB from "fb";
import { Formik } from "formik";
import * as Yup from "yup";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../../stores/redux/actions/authAction";
import utilAction from "../../stores/redux/actions/utilAction";
import Loading from "../../components/utils/loading/Loading";

import InputField from "../../components/utils/inputField/InputField";

const YupSchema = Yup.object({
	email: Yup.string().email("Địa chỉ email không hợp lệ").required("Địa chỉ email là bắt buộc"),
	password: Yup.string().required("Mật khẩu là bắt buộc"),
});

const LoginPage = () => {
	const {
		authReducer: { authenticated },
		utilReducer: { loading },
		errorReducer: { errorMsg, errorActive },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { loginUserRequest } = authAction;
	const { loadingUI } = utilAction;

	const responseFacebook = (response) => {
		FB.setAccessToken(response.accessToken);
		FB.api("/me", "GET", { fields: "id, email, name" }, (userData) => {
			console.log(userData);
			dispatch(loginUserRequest({ loginFb: true, ...userData }));
		});
	};

	if (authenticated === true) return <Redirect to="/survey" />;

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={YupSchema}
			onSubmit={(values, actions) => {
				dispatch(loadingUI());
				dispatch(loginUserRequest(values));
			}}>
			{(props) => (
				<>
					{loading ? (
						<Loading />
					) : (
						<>
							{authenticated !== undefined && (
								<form
									onSubmit={props.handleSubmit}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											props.handleSubmit();
										}
									}}>
									<div className="auth-page" role="presentation">
										<div className="auth-page-left">
											<Link to="/">
												<div className="auth-page__logoContainer">
													<img src={logo} alt="" className="auth-page__logo" />
												</div>
											</Link>
											<Link to="/">
												<div className="auth-page__info">
													<div className="auth-page__infoIconMapWrapper">
														<img src={iconMap} alt="" className="auth-page__infoIconMap" />
													</div>
													<div className="auth-page__infoFoodImgWrapper">
														<img
															src={foodImage}
															alt=""
															className="auth-page__infoFoodImg"
														/>
													</div>
												</div>
											</Link>
										</div>
										<div className="auth-page-right">
											<p className="auth-page-right__titleLine1">khám phá ẩm thực</p>
											<p className="auth-page-right__titleLine2">cùng tekoda</p>
											<FacebookLogin
												disableMobileRedirect={true}
												appId={process.env.REACT_APP_FACEBOOK_ID}
												autoLoad={false}
												callback={responseFacebook}
												render={(renderProps) => (
													<button onClick={renderProps.onClick} className="facebook-form">
														<img src={facebookLogo} alt="facebook" />
														<p>Đăng nhập bằng facebook</p>
													</button>
												)}
											/>
											<p>hoặc</p>
											<InputField
												{...props}
												titleField="email"
												titlePlaceholder="Tên đăng nhập"
												fieldIcon={iconUser}
											/>
											<InputField
												{...props}
												titleField="password"
												titlePlaceholder="Mật khẩu"
												fieldIcon={iconPassword}
											/>
											{errorActive && errorMsg && errorMsg !== "" && errorMsg !== "Unauthorized" && (
												<div className="error-field__container">
													<img src={iconErrorRed} alt="" className="error-field__fieldIcon" />
													<p className="error-field__text">{errorMsg}</p>
												</div>
											)}
											<button
												type="submit"
												className={`auth-page__login ${
													props.errors.email && props.errors.password ? "button--disable" : ""
												}`}
												onClick={props.handleSubmit}
												disabled={props.errors.email && props.errors.password ? true : false}>
												Đăng nhập
											</button>
											<div className="auth-page__changePageContainer">
												<span className="auth-page__changePage">
													Bạn chưa có tài khoản Tekoda ?
												</span>
												<span>
													<Link to="/register">Đăng ký</Link>
												</span>
											</div>
										</div>
									</div>
								</form>
							)}
						</>
					)}
				</>
			)}
		</Formik>
	);
};

export default LoginPage;
