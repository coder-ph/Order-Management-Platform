import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePassword } from "../Redux/Auth/authsActions";
import {
  selectPasswordUpdateLoading,
  selectPasswordUpdateSuccess,
  selectPasswordUpdateMessage,
} from "../Redux/Auth/authsSelectors";
import { logout } from "../Redux/Auth/authsSlice";

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectPasswordUpdateLoading);
  const success = useSelector(selectPasswordUpdateSuccess);
  const message = useSelector(selectPasswordUpdateMessage);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      dispatch(updatePassword(values.password));
      navigate("/login"); //we'll decide on which page should a user be directed to
      dispatch(logout())
    },
  });
  const togglePasswordVisibility = () => {
    setShowPassword((prev)=> !prev);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev)=>!prev);
  };

  return (
    <div>
        <div>
            <h2>Set a New Password</h2>
            <p>must be at least 8 characters</p>
        </div>

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
      <div>
        <h4>Back to <button onClick={()=> navigate('login')}>Sign In</button></h4>
      </div>
    </div>
  );
};

export default SetNewPassword;
