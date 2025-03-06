import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import coverImage from "../assets/Images/inventory-management.jpg";
import { MainButton } from "../Components/Buttons/Buttons";
import '../assets/styles/ForgotPassword.css';

function ForgotPassword() {
    const [message, setMessage] = useState(null)
    const [key, setKey] = useState(null)

    const handlePasswordReset = async (values, setSubmitting, setErrors) => {
        try {
            const emailResponse = await fetch('https://order-management-platform.onrender.com/api/v1/users/otp?key=' + values.email, {
                method: 'GET',
            })

            if (!emailResponse.ok) {
                const errorText = await emailResponse.text()
                throw new Error(`Something went wrong: ${errorText}`)
            }

            const emailData = await emailResponse.json()
            console.log('Received key:', emailData.data.key)

            if (!emailData.data || !emailData.data.key) {
                throw new Error('Missing key in response')
            }

            setKey(emailData.data.key);

            const url = new URL('https://order-management-platform.onrender.com/api/v1/users/otp')
            url.searchParams.append('email', values.email)
            url.searchParams.append('key', emailData.data.key)

            const otpResponse = await fetch(url, { method: 'GET' })

            if (!otpResponse.ok) {
                const errorText = await otpResponse.text();
                throw new Error(`Something went wrong: ${errorText}`)
            }

            const otpData = await otpResponse.json();
            setMessage(`Token sent to: ${otpData.data.key}`)

        } catch (error) {
            console.error('Error:', error);
            setErrors({ email: error.message || "Something went wrong, please try again." })
        } finally {
            setSubmitting(false)
        }
    };

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
                        onSubmit={(values, { setSubmitting, setErrors }) => {
                            handlePasswordReset(values, setSubmitting, setErrors);
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

                    {/* Display success message if available */}
                    {message && <div className="success-message">{message}</div>}

                    <Link to="/login" className="back-to-signin">Back to <span>Sign in</span></Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
