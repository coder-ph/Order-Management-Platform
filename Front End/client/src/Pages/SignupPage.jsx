import React, { useState } from "react";
import { MainButton, GoogleButton } from "../Components/Buttons/Buttons";
import { useFormik } from "formik";
import coverImage from "../assets/Images/inventory-management.jpg";
import "../assets/styles/SignupPage.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const [signupSuccess, setSignupSuccess] = useState(false); 

  
  const [showPassword, setShowPassword] = useState(false);

  
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
    validate: (values) => {
      const errors = {};

      
      if (!values.username) {
        errors.username = "Username required";
      } else if (values.username.length < 5) {
        errors.username = "Username must be at least 5 characters";
      }

      
      if (!values.email) {
        errors.email = "Email required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Please enter a valid email";
      }

      
      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

     
      if (values.phone && !/^\d{10}$/.test(values.phone.replace(/\D/g, ""))) {
        errors.phone = "Please enter a valid phone number";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true); 
      setError(""); 

      try {
        
        await new Promise((resolve) => setTimeout(resolve, 1000)); 

    
        setSignupSuccess(true);
        setError(""); 

       
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
       
        setError("Failed to sign up. Please try again.");
      } finally {
        setLoading(false); 
      }
    },
  });

  
  const handleGoogleSignin = () => {
    console.log("Google Sign In Clicked");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-left-section">
          <h1>
            The Optimal <br /> Order <br /> Management System
          </h1>
          <p>Manage your orders with ease</p>
          <img src={coverImage} alt="cover" className="cover-image" />
        </div>
        <div className="signup-right-section">
          <h2>Create your Account</h2>
          <div className="google-button">
            <GoogleButton onClick={handleGoogleSignin} className="google-icon">
              Sign up with Google
            </GoogleButton>
          </div>

          <div className="signup-divider">
            <hr />
            <span>or use email</span>
            <hr />
          </div>
          <div className="signup-form-container">
            <div className="form-wrapper">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-field">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={
                      formik.touched.username && formik.errors.username
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.username && formik.errors.username && (
                    <small className="error-text">
                      {formik.errors.username}
                    </small>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={
                      formik.touched.email && formik.errors.email
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.email && formik.errors.email && (
                    <small className="error-text">{formik.errors.email}</small>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"} style={{marginBottom: "7px"}}
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={
                      formik.touched.password && formik.errors.password
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.password && formik.errors.password && (
                    <small className="error-text">
                      {formik.errors.password}
                    </small>
                  )}
                  <div className="password-toggle">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                    />
                    <label htmlFor="showPassword" className="checkbox-label">
                      Show password
                    </label>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.phone && formik.errors.phone
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <small className="error-text">{formik.errors.phone}</small>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="2"
                  />
                </div>

                <MainButton type="submit" disabled={loading}>
                  {loading ? "Signing Up..." : "Sign up"}
                </MainButton>
              </form>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {signupSuccess && (
                <p style={{ color: "green" }}>
                  Signup successful! Redirecting...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
