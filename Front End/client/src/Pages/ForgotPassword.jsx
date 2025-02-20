import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import coverImage from "../assets/Images/inventory-control.avif"
// import MainButton from "../Components/Buttons.jsx"

function ForgotPassword () {
    return (
        <div className="forgot-password-container">
            <div className="left-section">
                <h1>The Optimal Order Management System</h1>
                <p>Manage your orders with ease and efficiency</p>
                <img src={coverImage} alt="cover-image" />
            </div>
            <div className="right-section">
                <h2>Forgot Password</h2>
                <Formik
                initialValues={{ email: "" }}
                validationSchema={Yup.object({
                    email: Yup.string().email("Invalid email").required("Email is required"),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    console.log("Reset password for:", values)
                    setSubmitting(false)
                }}
                >
                    {({ isSubmitting }) => (
                        <Form className="form-container">
                            <div className="input-field">
                                <label>Email</label>
                                <Field type="email" name="email" placeholder="Enter email" />
                                <ErrorMessage name="email" component="div" className="error" />
                            </div>
                            <button type="submit" disabled={isSubmitting}>Reset Password</button>
                        </Form>
                    )}
                </Formik>

                <Link to="/login" className="back-to-signin">Back to <span>Sign in</span></Link>
        
            </div>
        </div>
    )
}

export default ForgotPassword;