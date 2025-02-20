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
import coverImage from "../assets/Images/inventory-control.avif";
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
    <div className="login-container">
  <div className="login-left-side">
    <h1>The Optimal Order Management System</h1>
    <p>Manage your orders with ease</p>
    <img src={coverImage} alt="cover illustration" />
  </div>
  <div className="login-right-side">
    <h2>Welcome Back!</h2>
    <div className="login-divider">
      <hr />
        <span>or use email</span>
      
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

        <div className="forgot-password-button">
          <button type="button">Forgot Password</button>
        </div>

        <div className="login-button">
          <button type="submit">
            {/* {isSubmitting ? "Logging in..." : "Login"} */}
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
</div>)
};
export default  LoginForm

