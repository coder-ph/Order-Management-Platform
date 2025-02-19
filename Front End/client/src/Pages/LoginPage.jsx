import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../Redux/Auth/authsSlice";
import {
  selectisAuthenticated,
  selectRole,
} from "../Redux/Auth/authsSelectors";
import { Formik, Form, Field, ErrorMessage } from "formik";
import coverImage from "../assets/images/inventory-control.avif";


const loginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectisAuthenticated);
  const role = useSelector(selectRole);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
};

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
  return () => dispatch(logout());
}, [isAuthenticated]);

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
        <hr>
          <span>or use email</span>
        </hr>
      </div>
      <div className="login-form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="email">
              <label htmlFor="email">Email</label>
              <Field type="Email" name="email" placeholder="Enter email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className="forgot-password-button">
              <Button type="button">Forgot Password</Button>
            </div>

            <div className="login button">
              <Button type="submit">
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </div>
          </Form>
        </Formik>
        <div className="alternative-text">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);
