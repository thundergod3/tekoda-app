import React from "react";

import "./InputField.scss";
import iconError from "../../../assets/icons/error.png";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const InputField = ({
	touched,
	values,
	errors,
	handleChange,
	handleBlur,
	titleField,
	titlePlaceholder,
	fieldIcon,
	style,
	showPassword,
	setShowPassword,
}) => {
	return (
		<div className="input-field__form" style={style}>
			<img src={fieldIcon} alt="" className="input-field__fieldIcon" />
			<input
				id={titleField}
				type={showPassword !== undefined ? (showPassword ? "text" : "password") : titleField}
				value={values.titleField}
				placeholder={!touched.titleField ? titlePlaceholder : ""}
				className="input-field"
				onChange={handleChange(titleField)}
				onBlur={handleBlur(titleField)}
			/>
			{showPassword !== undefined && (
				<>
					{!showPassword ? (
						<VisibilityIcon onClick={() => setShowPassword(true)} />
					) : (
						<VisibilityOffIcon onClick={() => setShowPassword(false)} />
					)}
				</>
			)}
			{touched[titleField] && errors[titleField] && (
				<div className="text-error__container">
					<img src={iconError} alt="" className="text-error__icon" />
					<label className="text-error">{errors[titleField]}</label>
				</div>
			)}
		</div>
	);
};

export default InputField;
