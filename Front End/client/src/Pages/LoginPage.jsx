import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../Redux/Auth/authsActions";
import {
  selectisAuthenticated,
  selectRole,
} from "../Redux/Auth/authsSelectors";
import coverImage from "../assets/Images/delivery-man.jpg";
import { GoogleButton } from "../Components/Buttons/Buttons"
import { FaGoogle } from "react-icons/fa";
import "../assets/styles/LoginPage.css"


import { logout } from "../Redux/Auth/authsSlice";


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectisAuthenticated);
  const role = useSelector(selectRole);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values)); 
    },
  });

  
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "user") {
        navigate("/user");
      } else if (role === "driver") {
        navigate("/driver");
      }
    }
    dispatch(logout())
  }, [isAuthenticated, role, navigate]);

  return (
    <div className="login-page"> 
    {/* the css styling that was originally for the body will only be for the body */}
    <div className="login-container">
  <div className="login-left-side">
    <h1>The Optimal <br></br>Order <br></br>Management System</h1>
    <p>Manage your orders with ease</p>
    <img src={coverImage} alt="cover illustration" className="cover-image" />
  </div>
  <div className="login-right-side">
    <h2>Welcome Back!</h2>
    <div className="google-button">
      <GoogleButton className="google-press"> <FaGoogle className="google-icon"/> Sign in with Google </GoogleButton>
    </div>
    <div className="login-divider">
      <hr />
        <span>or use email</span>
      <hr />
      
    </div>
    <div className="login-form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className="email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error-message">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="forgot-password">
          <Link to ="/forgot-password">Forgot Password?</Link>
        </div>

        <div className="login-button">
          <button type="submit">
            Sign in
          </button>
        </div>
      </form>
      <div className="alternative-text">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  </div>
</div>
</div>
)
};
export default  LoginForm

