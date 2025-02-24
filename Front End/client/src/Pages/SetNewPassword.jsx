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
import coverImage from "../assets/Images/delivery-man.jpg"
import '../assets/styles/SetNewPassword.css'
import { logout } from "../Redux/Auth/authsSlice";
import { MainButton } from "../Components/Buttons/Buttons";

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
    <div className="set-new-password-page">
    <div className="set-new-password-container">
      <div className="set-new-left-section">
        <h1>The Optimal<br /> Order<br /> Management System</h1>
        <p>Manage your orders with ease</p>
        <img src={coverImage} alt="cover image" className="cover-image" />
      </div>

        <div className="set-new-right-section">
            <h2>Set a New Password</h2>
            <p>Must be at least 8 characters</p>
        

      <form onSubmit={formik.handleSubmit}>
        <div className="set-new-form">
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
          <button type="button" onClick={togglePasswordVisibility} className="eye-button">
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <p className="error-msg">{formik.errors.password}</p>
        ) : null}
        <div className="set-new-form-pass">
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
          <button type="button" onClick={toggleConfirmPasswordVisibility} className="eye-button">
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <p className="error-msg">{formik.errors.confirmPassword}</p>
        ) : null}
        <div>
          <MainButton type="submit" disabled={formik.isSubmitting} style={{ marginTop:"20px"}}>
            Change Password
          </MainButton>
        </div>
      </form>
      <div className="set-new-footer">
        <h4>Back to <span onClick={()=> navigate('login')}>Sign In</span></h4>
      </div>
      </div>
    </div>
    </div>
  );
};

export default SetNewPassword;
