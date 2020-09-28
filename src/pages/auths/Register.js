import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import logo from "../../assets/icons/logo.png";
import logoWhite from "../../assets/icons/Vector.png";
import facebookLogo from "../../assets/icons/facebook.png";
import iconMap from "../../assets/icons/map_icon.png";
import foodImage from "../../assets/utils/food_bg.png";
import iconUser from "../../assets/icons/user.png";
import iconPassword from "../../assets/icons/password.png";
import iconEmail from "../../assets/icons/email.png";

import "./auths.scss";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Formik } from "formik";
import * as Yup from "yup";
import FB from "fb";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../../stores/redux/actions/authAction";
import utilAction from "../../stores/redux/actions/utilAction";

import Loading from "../../components/utils/loading/Loading";

const YupSchema = Yup.object({
	name: Yup.string().required("Tên đăng nhập là bắt buộc"),
	email: Yup.string().email("Địa chỉ email không hợp lệ").required("Địa chỉ email là bắt buộc"),
	password: Yup.string().min(6, "Mật khẩu cần tối thiếu 6 ký tự").required("Mật khẩu là bắt buộc"),
});

const RegisterPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		authReducer: { authenticated },
		utilReducer: { loading },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { getUserRequest, registerUserRequest } = authAction;
	const { loadingUI } = utilAction;

	const responseFacebook = (response) => {
		FB.setAccessToken(response.accessToken);
		FB.api("/me", "GET", { fields: "id,birthday,age_range,email,gender,location,name,short_name" }, (userData) => {
			dispatch(getUserRequest(userData, response));
		});
	};

	if (authenticated === true) return <Redirect to="/" />;

	return (
		<Formik
			initialValues={{ name: "", email: "", password: "" }}
			validationSchema={YupSchema}
			onSubmit={(values, action) => {
				dispatch(loadingUI());
				dispatch(registerUserRequest(values));
			}}>
			{(props) => (
				<>
					{loading ? (
						<Loading />
					) : (
						<>
							{authenticated !== undefined && (
								<div className="auth-page" role="presentation">
									<div className="auth-page-left">
										{/* <Link to="/">
											<div className="auth-page__leftContainer">
												<img src={logoWhite} alt="TekodaApp" className="auth-page__logo" />
												<p className="auth-page__appName">TekodaApp</p>
											</div>
										</Link> */}
										<div className="auth-page__info">
											<div className="auth-page__infoIconMapWrapper">
												<img src={iconMap} alt="" className="auth-page__infoIconMap" />
											</div>
											<div className="auth-page__infoFoodImgWrapper">
												<img src={foodImage} alt="" className="auth-page__infoFoodImg" />
											</div>
										</div>
									</div>
									<div className="auth-page-right">
										<p className="auth-page-right__titleLine1">
											TRỞ THÀNH NGƯỜI <strong>SÀNH ĂN</strong>
										</p>
										<p className="auth-page-right__titleLine2">CÙNG TEKODA</p>
										<FacebookLogin
											appId="370435007655920"
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
										<div className="auth-page__form">
											<img src={iconUser} className="auth-page__fieldIcon" />
											<input
												id="name"
												value={props.values.name}
												onChange={props.handleChange("name")}
												onBlur={props.handleBlur("name")}
												type="text"
												placeholder="Nhập username của bạn"
												className="auth-page__field"
											/>
											{props.touched.name && (
												<label htmlFor="name" className="text-error">
													{props.errors.name}
												</label>
											)}
										</div>
										<div className="auth-page__form">
											<img src={iconEmail} className="auth-page__fieldIcon" />
											<input
												id="email"
												value={props.values.email}
												onChange={props.handleChange("email")}
												onBlur={props.handleBlur("email")}
												type="text"
												placeholder="Nhập email của bạn"
												className="auth-page__field"
											/>
											{props.touched.email && (
												<label className="text-error">{props.errors.email}</label>
											)}
										</div>
										<div className="auth-page__form">
											<div style={{ display: "flex", alignItems: "center", color: "grey" }}>
												<img src={iconPassword} className="auth-page__fieldIcon" />
												<input
													id="password"
													value={props.values.password}
													onChange={props.handleChange("password")}
													onBlur={props.handleBlur("password")}
													type={showPassword ? "text" : "password"}
													placeholder="Nhập password"
													className="auth-page__field"
												/>
												{!showPassword ? (
													<VisibilityIcon onClick={() => setShowPassword(true)} />
												) : (
													<VisibilityOffIcon onClick={() => setShowPassword(false)} />
												)}
											</div>
											{props.touched.password && (
												<label htmlFor="password" className="text-error">
													{props.errors.password}
												</label>
											)}
										</div>
										<div className="auth-page__privacyContainer">
											<input
												id="privacy"
												type="checkbox"
												className="auth-page__privacyCheckbox"
											/>
											<label htmlFor="privacy" className="auth-page__privacy">
												Tôi đồng ý với <strong>Chính Sách Bảo Mật</strong> và{" "}
												<strong>Điều Khoản Hoạt Động</strong>
												của Tekoda.
											</label>
										</div>
										<button
											type="submit"
											onClick={props.handleSubmit}
											className="auth-page__register"
											disabled={
												props.errors.name && props.errors.email && props.errors.password
													? true
													: false
											}>
											Đăng ký
										</button>
										<div className="auth-page__changePageContainer">
											<span className="auth-page__changePage">Bạn đã có tài khoản Tekoda ?</span>
											<span>
												<Link to="/login">Đăng nhập</Link>
											</span>
										</div>
									</div>
								</div>
							)}
						</>
					)}
				</>
			)}
		</Formik>
	);
};

export default RegisterPage;
