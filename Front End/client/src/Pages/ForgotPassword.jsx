import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import coverImage from "../assets/Images/inventory-management.jpg"
import { MainButton } from "../Components/Buttons/Buttons"
import '../assets/styles/ForgotPassword.css'

function ForgotPassword () {
    return (
        <div className="forgot-password-page">
        <div className="forgot-password-container">
            <div className="left-section">
                <h1>The Optimal<br></br> Order Management System</h1>
                <p>Manage your orders with ease and efficiency</p>
                <img src={coverImage} alt="cover image" className="cover-image" />
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
                            <div className="main-button">
                            <MainButton type="submit" disabled={isSubmitting}>Reset Password</MainButton>
                            </div>
                        </Form>
                    )}
                </Formik>

                <Link to="/login" className="back-to-signin">Back to <span>Sign in</span></Link>
        
            </div>
        </div>
        </div>
    )
}

export default ForgotPassword;