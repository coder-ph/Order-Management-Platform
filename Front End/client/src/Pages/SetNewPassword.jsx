import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../Redux/Auth/authsActions";
import { selectisAuthenticated } from "../Redux/Auth/authsSelectors";

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectisAuthenticated);
  const [showPassword, setShowPassword] = useState(fasle);

  const [showConfirmPassword, setShowConfirmPassword] = useState(fasle);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "password must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      dispatch(updatePassword(values.password));
      navigate("/login"); //we'll decide on which page should a user be directed to
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(showConfirmPassword);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter new password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
        <div>
          <label htmlFor="confirmPassword"> Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button type="button" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div>
        ) : null}
        <div>
          <button type="submit" disabled={formik.isSubmitting}>
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetNewPassword;
