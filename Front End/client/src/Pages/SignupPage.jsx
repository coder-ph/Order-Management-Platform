import React from "react";
import { MainButton, GoogleButton } from "../Components/Buttons/Buttons";
import { useFormik } from "formik";
import coverImage from "../assets/Images/delivery-man.jpg"
import '../assets/styles/SignupPage.css'

const SignupPage = () => {
  // Use Formik hook for form management
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      // validation/username
      if (!values.username) {
        errors.username = "Username required";
      } else if (values.username.length < 5) {
        errors.username = "Username must be at least 5 characters";
      }

      // email
      if (!values.email) {
        errors.email = "Email required";
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Please enter a valid email";
      }

      // password
      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const handleGoogleSignin = () => {
    console.log("Google Sign In Clicked");
  };

  return (
    <div className="signup-page">
    <div className="signup-container">
      <div className="signup-left-section">
        <h1>The Optimal <br></br> Order <br></br> Management System</h1>
        <p>Manage your orders with ease</p>
        <img src={coverImage} alt="cover image" className="cover-image" />
      </div>
      <div className="signup-right-section">
        <h2>Create your Account</h2>
        <div className="google-button">
            <GoogleButton onClick={handleGoogleSignin}className="google-icon">
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
            <div className="username">
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
              />
              {formik.touched.username && formik.errors.username && (
                <p className="error">{formik.errors.username}</p>
              )}
            </div>

            <div className="email">
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
              />
              {formik.touched.email && formik.errors.email && (
                <p className="error">{formik.errors.email}</p>
              )}
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password && (
                <p className="error">{formik.errors.password}</p>
              )}
            </div>

            <MainButton type="submit" >Sign up</MainButton>
          </form>

          </div>
        </div>
      </div>
      </div>
    </div>
    //</div>
  );
};

export default SignupPage;