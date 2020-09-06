import React from "react";
import { Link, Redirect } from "react-router-dom";

import logo from "../../assets/icons/logo.png";
import logoWhite from "../../assets/icons/Vector.png";
import facebookLogo from "../../assets/icons/facebook.png";

import "./auths.scss";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../../stores/redux/actions/authAction";

const LoginPage = () => {
	const {
		authReducer: { authenticated },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { getUserRequest } = authAction;

	const responseFacebook = (response) => dispatch(getUserRequest(response));

	if (authenticated === true) return <Redirect to="/" />;

	return (
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
								Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores,
							</p>
							<div className="auth-page__infoDescription">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</div>
						</div>
					</div>
					<div className="auth-page-right">
						<p className="auth-page-right__titleLine1">Trở thành những người sành ăn </p>
						<p className="auth-page-right__titleLine2">trong nhóm của bạn chỉ sau vài bước</p>
						<FacebookLogin
							appId={process.env.REACT_APP_FACEBOOK_ID}
							autoLoad={false}
							callback={responseFacebook}
							render={(renderProps) => (
								<button onClick={renderProps.onClick} className="facebook-form">
									<img src={facebookLogo} alt="facebook" />
									<p>Đăng nhập bằng tài khoản facebook</p>
								</button>
							)}
						/>
						<p>hoặc</p>
						<div className="auth-page__form">
							<input type="text" placeholder="Nhập Email hoặc Username" className="auth-page__field" />
						</div>
						<div className="auth-page__form">
							<input type="text" placeholder="Nhập mật khẩu" className="auth-page__field" />
						</div>
						<button className="auth-page__login">Đăng nhập</button>
						<div className="auth-page__changePageContainer">
							<span className="auth-page__changePage">Bạn chưa có tài khoản Tekoda ?</span>
							<span>
								<Link to="/register">Đăng ký</Link>
							</span>
						</div>
						<p className="auth-page__privacy">
							Tôi đồng ý với <strong>Chính Sách Bảo Mật</strong> và <strong>Điều Khoản Hoạt Động</strong>
							của Waodate.
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default LoginPage;
