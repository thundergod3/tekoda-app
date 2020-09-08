import React from "react";

import loadingGif from "../../../assets/loadings/loading.gif";

import "./Loading.scss";

const Loading = () => {
	return (
		<div className="loading">
			<img src={loadingGif} alt="" />
		</div>
	);
};

export default Loading;
