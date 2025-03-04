import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser, checkAuthToken } from "../Redux/Auth/authsActions";
import {
  selectisAuthenticated,
  selectRole,
} from "../Redux/Auth/authsSelectors";
import coverImage from "../assets/Images/inventory-management.jpg";
import { GoogleButton } from "../Components/Buttons/Buttons";
import { FaGoogle } from "react-icons/fa";
import "../assets/styles/LoginPage.css";
import { loginWithGoogle } from "../Redux/Auth/authsActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectisAuthenticated);
  const role = useSelector(selectRole);

  const handleGoogleSignIn = async ()=> {
    dispatch(loginWithGoogle())
  }
  useEffect(() => {
    console.log("Auth Status:", isAuthenticated);
    console.log("User Role:", role);
    if (isAuthenticated && role) {
      const roleRoutes = {
        admin: "/dashboard/main",
        user: "/user-products",
        driver: "/driver",
      };
     if (isAuthenticated && role && roleRoutes[role]) {
       navigate(roleRoutes[role]);
     } else {
       navigate("/");
     }
    }
  }, [isAuthenticated, role, navigate]);


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
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try{
        dispatch(loginUser(values));
      } catch (error) {
        console.error('login Failed', error)
      }
      
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-left-side ">
          <h1>
            The Optimal <br></br>Order <br></br>Management System
          </h1>
          <p>Manage your orders with ease</p>
          <img
            src={coverImage}
            alt="cover illustration"
            className="cover-image"
          />
        </div>
        <div className="login-right-side">
          <h2>Welcome Back!</h2>
          <div className="google-button">
            <GoogleButton className="google-press" onClick={handleGoogleSignIn}>
              {" "}
              <FaGoogle className="google-icon" /> Sign in with Google{" "}
            </GoogleButton>
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
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <div className="login-button">
                <button type="submit">Sign in</button>
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
  );
};
export default LoginForm;
