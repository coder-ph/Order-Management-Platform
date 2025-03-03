import React, { useState, useRef } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import '../assets/styles/EditProfile.css';
import { useNavigate } from 'react-router-dom';

const EditUserProfile = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [profilePicture, setProfilePicture] = useState("/api/placeholder/80/80")
    const fileInputRef = useRef(null)

    const initialValues = {
        address: '1942 Main Street, Nakuru',
        fullName: 'Chris Brown',
        email: 'chrisB@gmail.com',
        phoneNumber: '0700234786',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = Yup.object({
        address: Yup.string().required('Address is required'),
        fullName: Yup.string().required('Full Name is required'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        password: Yup.string(),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords should match')
    })

    const handleSubmit = (values, { setSubmitting }) => {
        alert('User profile updated successfully!')
        setSubmitting(false)
        navigate('/user-profile')
    }

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            navigate('/user-profile')
        }
    }

    const handleChoosePhoto = (e) => {
        e.preventDefault()
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file && file.size <= 4 * 1024 * 1024) {
            const reader = new FileReader()
            reader.onload = (e) => setProfilePicture(e.target.result)
            reader.readAsDataURL(file)
        } else {
            alert("File size exceeds 4MB limit!")
        }
    }

    const handleDeletePhoto = (e) => {
        e.preventDefault();
        if (window.confirm("Confirm you want to delete your profile picture?")) {
            setProfilePicture("/api/placeholder/80/80")
        }
    }

    const PasswordField = ({ name, label, showPassword, toggleShowPassword }) => (
        <div className="form-group">
            <label className="form-label" htmlFor={name}>{label}</label>
            <div className="password-field">
                <Field type={showPassword ? "text" : "password"} id={name} name={name} className="form-control" placeholder={`Enter ${label}`} />
                <div className="password-toggle">
                    <input type="checkbox" id={`show${name}-toggle`} onChange={toggleShowPassword} checked={showPassword} />
                    <label htmlFor={`${name}-toggle`}>Show{label}</label>
                </div>
                <ErrorMessage name={name} component="div" className="error-message" />
            </div>
        </div>
    )

    return (
        <div className="profile">
            <div className="profile-header">
                <h2>Edit User Profile Data</h2>
                <button className="close-btn" onClick={() => navigate('/user-profile')}>×</button>
            </div>
            <p className="form-info">Edit the form to change your data!</p>

            <div className="profile-section">
                <img src={profilePicture} alt="Profile picture" className="profile-image" />
                <div className="profile-actn">
                    <div>
                        <a href="#" className="photo-link" onClick={handleChoosePhoto}>Choose Photo</a>
                        <a href="#" className="delete-link" onClick={handleDeletePhoto}>Delete Photo</a>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            style={{ display: 'none' }} 
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <p>Click Upload to change Profile picture (4 MB max)</p>
                </div>
            </div>
            
            <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h3 className="section-title">User Info</h3>
                        <p className="section-subtitle">Edit the description of the user account.</p>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="address">Address</label>
                                <Field type='text' id='address' name='address' className='form-control' placeholder='Enter your address'/>
                                <ErrorMessage name="address" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="fullName">Full Name</label>
                                <Field type='text' id='fullName' name='fullName' className='form-control'/>
                                <ErrorMessage name="fullName" component="div" className="error-message" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">Email</label>
                                <Field type='email' id='email' name='email' className='form-control'/>
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="phoneNumber">Contact Phone</label>
                                <Field type='text' id='phoneNumber' name='phoneNumber' className='form-control' placeholder='10-digit phone number'/>
                                <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                            </div>
                        </div>
                        <div className="divider"></div>

                        <div id="passwordSection">
                            <h3 className="section-title">Account Access</h3>
                            <p className="section-subtitle">Enter password if you need to change password.</p>

                            <div className="form-row">
                                <PasswordField 
                                    name="password" 
                                    label="Password" 
                                    showPassword={showPassword} 
                                    toggleShowPassword={() => setShowPassword(!showPassword)} 
                                />
                                <PasswordField 
                                    name="confirmPassword" 
                                    label="Confirm Password" 
                                    showPassword={showConfirmPassword} 
                                    toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)} 
                                />
                            </div>
                        </div>
                        <div className="divider"></div>

                        <div className="profile-footer">
                            <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
                            <button type="submit" className="btn save-btn" disabled={isSubmitting}>Save</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditUserProfile;