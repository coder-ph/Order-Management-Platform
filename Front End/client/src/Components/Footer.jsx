import React from "react";
import { SlSocialFacebook } from "react-icons/sl";
import { FaInstagram } from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaXTwitter } from "react-icons/fa6";
import '../assets/styles/Footer.css'


function Footer() {
    return (
        <footer className="footer">
        <div className="footer-content">
            <h2>Order Management System</h2>
            <p className="footer-statement">Manage your orders with ease</p>
            <p><strong>Customer Service</strong> +254 115816125</p>
            <p><strong>Address</strong> Nairobi, Kenya</p>
            <hr className="footer-divider"/>

            <div className="footer-div">
            <div className="footer-social-icons">
                <a href="#"><SlSocialFacebook /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><SlSocialLinkedin /></a>
                <a href="#"><FaXTwitter /></a>
            </div>

            <div className="delivery-order">
                <span>Delivery and Order Tracking</span>
            </div>
            </div>


        </div>
        <div className="footer-bottom">
        <p className="copyright">&copy; 2025 QUANTUM LI,  All rights reserved</p>
        <span>Terms & Conditions | Privacy Policy</span>
        </div>
    </footer>
    )
}

export default Footer;