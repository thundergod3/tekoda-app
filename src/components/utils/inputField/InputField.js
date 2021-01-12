import React from "react";

import "./InputField.scss";
import iconError from "../../../assets/icons/error.png";
import iconErrorRed from "../../../assets/icons/error_red.png";

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
	typeInput,
	useCustomErrorIcon,
}) => {
	return (
		<div className="input-field__form" style={style}>
			{fieldIcon && (
				<img src={fieldIcon} alt="" className="input-field__fieldIcon" />
			)}
			<input
				id={titleField}
				type={
					showPassword !== undefined
						? showPassword
							? "text"
							: "password"
						: typeInput
				}
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
					<img
						src={useCustomErrorIcon ? iconErrorRed : iconError}
						alt=""
						className="text-error__icon"
					/>
					<label
						className="text-error"
						style={{ ...(useCustomErrorIcon ? { color: " #ff4444" } : {}) }}
					>
						{errors[titleField]}
					</label>
				</div>
			)}
		</div>
	);
};

export default InputField;
