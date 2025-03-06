import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import coverImage from "../assets/Images/inventory-management.jpg";
import { GoogleButton } from "../Components/Buttons/Buttons";
import { FaGoogle } from "react-icons/fa";
import "../assets/styles/LoginPage.css";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const API_URL = import.meta.env.VITE_APP_USER_SERVER; // VITE_APP_USER_SERVER /{end point -}/api/vi/user

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
        .min(4, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoginError("");

        // const credentials = {
        //   email: "m.o.shelton@gmail.com",
        //   password: "shelton",
        // };

        const email = document.getElementById('email').value
        const password = document.getElementById("password").value;

        console.log(email, password)

        const response = await axios.get(`${API_URL}/api/v1/users`, {
          params: {
            email: email,
            password: password,
          },
        });
        console.log(response);
       
        const accessToken = response.data.data.token
        const decode = jwtDecode(accessToken)
        console.log(decode)
        const localtoken = localStorage.setItem("token", accessToken);
        console.log(localtoken)
        
        const userId = decode.id
        const role = decode.role
        console.log(userId, role)
        const roleRoutes = {
          admin: "/dashboard/main",
          user: "/user-products",
          driver: "/driver",
        };

        if (roleRoutes[role]) {
          navigate(roleRoutes[role]);
        } else {
          navigate("/");
        }
      } catch (error) {
        setLoginError(
          error.response?.data?.message || "Invalid email or password"
        );
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
            <GoogleButton className="google-press">
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

              {loginError && <div className="error-message">{loginError}</div>}

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
