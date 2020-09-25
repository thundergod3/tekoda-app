import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

import logo from "../../assets/icons/logo.png";
import logoWhite from "../../assets/icons/Vector.png";
import facebookLogo from "../../assets/icons/facebook.png";

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
	name: Yup.string().required("Your username must be required"),
	email: Yup.string().email("Invalid email").required("Your email must be required"),
	password: Yup.string()
		.min(6, "Password must have at least 6 characters")
		.required("Your password must be required"),
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
			dispatch(getUserRequest(...response, userData));
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
										<Link to="/">
											<div className="auth-page__leftContainer">
												<img src={logoWhite} alt="TekodaApp" className="auth-page__logo" />
												<p className="auth-page__appName">TekodaApp</p>
											</div>
										</Link>
										<div className="auth-page__info">
											<p className="auth-page__infoSlogan">
												Khám phá những địa chỉ ẩm thực tuyệt vời
											</p>
										</div>
									</div>
									<div className="auth-page-right">
										<p className="auth-page-right__titleLine1">Trở thành những người sành ăn </p>
										<p className="auth-page-right__titleLine2">
											trong nhóm của bạn chỉ sau vài bước
										</p>
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
											<input
												value={props.values.name}
												onChange={props.handleChange("name")}
												onBlur={props.handleBlur("name")}
												type="text"
												placeholder="Nhập username của bạn"
												className="auth-page__field"
											/>
											{props.touched.name && <p className="text-error">{props.errors.name}</p>}
										</div>
										<div className="auth-page__form">
											<input
												value={props.values.email}
												onChange={props.handleChange("email")}
												onBlur={props.handleBlur("email")}
												type="text"
												placeholder="Nhập email của bạn"
												className="auth-page__field"
											/>
											{props.touched.email && <p className="text-error">{props.errors.email}</p>}
										</div>
										<div className="auth-page__form">
											<div style={{ display: "flex", alignItems: "center", color: "grey" }}>
												<input
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
												<p className="text-error">{props.errors.password}</p>
											)}
										</div>
										<button
											type="submit"
											onClick={props.handleSubmit}
											className="auth-page__register">
											Đăng ký
										</button>
										<div className="auth-page__changePageContainer">
											<span className="auth-page__changePage">Bạn đã có tài khoản Tekoda ?</span>
											<span>
												<Link to="/login">Đăng nhập</Link>
											</span>
										</div>
										<p className="auth-page__privacy">
											Tôi đồng ý với <strong>Chính Sách Bảo Mật</strong> và{" "}
											<strong>Điều Khoản Hoạt Động</strong>
											của Waodate.
										</p>
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
