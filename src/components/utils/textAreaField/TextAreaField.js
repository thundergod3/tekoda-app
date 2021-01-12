import React from "react";

import "./TextAreaField.scss";
import iconError from "../../../assets/icons/error.png";
import iconErrorRed from "../../../assets/icons/error_red.png";

const TextAreaField = ({
	touched,
	values,
	errors,
	handleChange,
	handleBlur,
	titleField,
	titlePlaceholder,
	showPassword,
	typeInput,
	height,
	style,
	useCustomErrorIcon,
}) => {
	return (
		<>
			<textarea
				id={titleField}
				type={
					showPassword !== undefined
						? showPassword
							? "text"
							: "password"
						: typeInput
				}
				placeholder={!touched.titleField ? titlePlaceholder : ""}
				className="text-area-field"
				onChange={handleChange(titleField)}
				onBlur={handleBlur(titleField)}
				style={{ ...(style ? style : {}), height }}
			>
				{values.titleField}
			</textarea>
			{touched[titleField] && errors[titleField] && (
				<div className="text-area-error__container">
					<img
						src={useCustomErrorIcon ? iconErrorRed : iconError}
						alt=""
						className="text-error__icon"
					/>
					<label
						className="text-area-error"
						style={{ ...(useCustomErrorIcon ? { color: " #ff4444" } : {}) }}
					>
						{errors[titleField]}
					</label>
				</div>
			)}
		</>
	);
};

export default TextAreaField;
