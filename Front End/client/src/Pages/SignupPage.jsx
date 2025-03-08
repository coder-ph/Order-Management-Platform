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
  const API_URL = "https://order-management-platform.onrender.com"
  console.log("Here is the Url:", API_URL)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_no: "",
      location:{ longitude: 0, lattitude: 0 },
    },
    validate: (values) => {
      const errors = {};

      
      if (!values.first_name) {
        errors.first_name = "First name is required";
      } else if (values.first_name.length < 3) {
        errors.first_name = "First name must be at least 3 characters";
      }
      if (!values.last_name) {
        errors.last_name = "Last name is required";
        } else if (values.last_name.length < 3) {
          errors.last_name = "Last name must be at least 3 characters";
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

    
      if (values.phone_no && !/^\d{10}$/.test(values.phone_no.replace(/\D/g, ""))) {
        errors.phone_no = "Please enter a valid phone number";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      setError("");

      try {
        
        const response = await fetch(`${API_URL}/api/v1/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to sign up");
        }


        const data = await response.json();
        setSignupSuccess(true);
        setError("");

        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        
        setError(err.message || "Failed to sign up. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  
  const handleGoogleSignin = () => {
    console.log("Google Sign In Clicked");
  };

  // const handleLocationChange = (e) => {
  //   const input = e.target.value;
  //   const [lng, lat] = input.split(",").map(coord => coord.trim()); // Trim spaces
  
  //   // Check if values are valid numbers before updating state
  //   if (!isNaN(lng) && !isNaN(lat) && lng !== "" && lat !== "") {
  //     formik.setFieldValue("location", input);
  //   }
  // };
  

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
                  <label htmlFor="first_name">First Name</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Enter First name"
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={
                      formik.touched.first_name && formik.errors.first_name
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <small className="error-text">
                      {formik.errors.first_name}
                    </small>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="last_name">Last name</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Enter Last Name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={
                      formik.touched.last_name && formik.errors.last_name
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <small className="error-text">
                      {formik.errors.last_name}
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
                    type={showPassword ? "text" : "password"}
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
                  <label htmlFor="phone_no">Phone Number</label>
                  <input
                    id="phone_no"
                    name="phone_no"
                    type="tel"
                    placeholder="Enter phone number"
                    value={formik.values.phone_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.phone_no && formik.errors.phone_no
                        ? "input-error"
                        : ""
                    }
                  />
                  {formik.touched.phone_no && formik.errors.phone_no && (
                    <small className="error-text">{formik.errors.phone_no}</small>
                  )}
                </div>

              
                {/* <div className="form-field">
                  <label htmlFor="longitude">Longitude</label>
                  <input
                  id="longitude"
                  name="longitude"
                  type="text"
                  placeholder="Enter Longitude"
                  value={formik.values.location.longitude}
                  onChange={(e) => formik.setFieldValue("location", {...formik.values.location, longitude: e.target.value})} 
                  /> */}

                  {/* </div>

                  <div className="form-field">
                    <label htmlFor="lattitude">Latitude</label>
                    <input
                    id="lattitude"
                    name="lattitude"
                    type="text"
                    placeholder="Enter lattitude"
                    value={formik.values.location.lattitude}
                    onChange={(e) => formik.setFieldValue("location", {...formik.values.location, lattitude: e.target.value})} 
                    />

                    </div> */}


               
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
