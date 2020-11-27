import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import logo from "../../assets/icons/logo_white.png";
import facebookLogo from "../../assets/icons/facebook.png";
import iconMap from "../../assets/icons/map_icon.png";
import foodImage from "../../assets/utils/food_bg.png";
import iconUser from "../../assets/icons/user.png";
import iconPassword from "../../assets/icons/password.png";
import iconEmail from "../../assets/icons/email.png";
import iconErrorRed from "../../assets/icons/error_red.png";

import "./auths.scss";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Formik } from "formik";
import * as Yup from "yup";
import FB from "fb";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../../stores/redux/actions/authAction";
import utilAction from "../../stores/redux/actions/utilAction";
import errorAction from "../../stores/redux/actions/errorAction";

import Loading from "../../components/utils/loading/Loading";
import InputField from "../../components/utils/inputField/InputField";

const YupSchema = Yup.object({
	name: Yup.string().required("Tên đăng nhập là bắt buộc"),
	email: Yup.string().email("Địa chỉ email không hợp lệ").required("Địa chỉ email là bắt buộc"),
	password: Yup.string().min(6, "Mật khẩu cần tối thiếu 6 ký tự").required("Mật khẩu là bắt buộc"),
});

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [privacyStatus, setPrivacyStatus] = useState(false);
	const {
		authReducer: { authenticated },
		utilReducer: { loading },
		errorReducer: { errorMsg, errorActive },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { registerUserRequest } = authAction;
	const { loadingUI } = utilAction;
	const { clearError } = errorAction;

	const responseFacebook = (response) => {
		FB.setAccessToken(response.accessToken);
		FB.api("/me", "GET", { fields: "id,birthday,age_range,email,gender,location,name,short_name" }, (userData) => {
			dispatch(registerUserRequest({ loginFb: true, ...userData }));
		});
	};

	if (authenticated === true) return <Redirect to="/survey" />;

	return (
		<Formik
			initialValues={{ name: "", email: "", password: "" }}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				dispatch(loadingUI());
				dispatch(registerUserRequest(values));
			}}>
			{(props) => {
				return (
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
															<img
																src={iconMap}
																alt=""
																className="auth-page__infoIconMap"
															/>
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
												<p className="auth-page-right__titleLine1">
													trở thành người <strong>sành ăn</strong>
												</p>
												<p className="auth-page-right__titleLine2">cùng tekoda</p>
												<FacebookLogin
													disableMobileRedirect={true}
													appId={process.env.REACT_APP_FACEBOOK_ID}
													autoLoad={false}
													callback={responseFacebook}
													render={(renderProps) => (
														<button onClick={renderProps.onClick} className="facebook-form">
															<img src={facebookLogo} alt="facebook" />
															<p>Đăng ký bằng tài khoản facebook</p>
														</button>
													)}
												/>
												<p>hoặc</p>
												<InputField
													{...props}
													titleField="name"
													titlePlaceholder="Tên đăng nhập"
													fieldIcon={iconUser}
												/>
												<InputField
													{...props}
													titleField="email"
													titlePlaceholder="Nhập email của bạn"
													fieldIcon={iconEmail}
												/>
												<InputField
													{...props}
													titleField="password"
													titlePlaceholder="Nhập mật khẩu"
													fieldIcon={iconPassword}
													showPassword={showPassword}
													setShowPassword={setShowPassword}
													style={{ display: "flex", alignItems: "center", color: "grey" }}
												/>
												{errorActive &&
													errorMsg &&
													errorMsg !== "" &&
													errorMsg !== "Unauthorized" && (
														<div className="error-field__container">
															<img
																src={iconErrorRed}
																alt=""
																className="error-field__fieldIcon"
															/>
															<p className="error-field__text">{errorMsg}</p>
														</div>
													)}
												<label className="auth-page__privacyContainer" htmlFor="privacy">
													<input
														id="privacy"
														type="checkbox"
														className="auth-page__privacyCheckbox"
													/>
													<span
														className="input--checked"
														onClick={() => setPrivacyStatus(!privacyStatus)}></span>
													<span
														className="auth-page__privacy"
														onClick={() => setPrivacyStatus(!privacyStatus)}>
														Tôi đồng ý với <strong>Chính Sách Bảo Mật</strong> và
														<strong> Điều Khoản Hoạt Động</strong> của Tekoda.
													</span>
												</label>
												<button
													type="submit"
													onClick={props.handleSubmit}
													className={`auth-page__register ${
														props.errors.name ||
														props.errors.email ||
														props.errors.password ||
														!privacyStatus
															? "button--disable"
															: ""
													}`}
													disabled={
														props.errors.name ||
														props.errors.email ||
														props.errors.password ||
														!privacyStatus
															? true
															: false
													}>
													Đăng ký
												</button>
												<div className="auth-page__changePageContainer">
													<span className="auth-page__changePage">
														Bạn đã có tài khoản Tekoda ?
													</span>
													<span>
														<Link to="/login" onClick={() => dispatch(clearError())}>
															{" "}
															Đăng nhập
														</Link>
													</span>
												</div>
											</div>
										</div>
									</form>
								)}
							</>
						)}
					</>
				);
			}}
		</Formik>
	);
};

export default RegisterPage;
