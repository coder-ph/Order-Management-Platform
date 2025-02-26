import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import '../assets/styles/Footer.css'

function Footer() {
    return (
        <footer>
        <div className="footer-links">
            <div className="footer-column">
                <a href="#">About Us</a>
                <a href="#">Services</a>
                <a href="#">Join Us</a>
            </div>
            <div className="footer-column">
                <a href="#">FAQs</a>
                <a href="#">FAQs</a>
                <a href="#">FAQs</a>
            </div>
            <div className="footer-column-icons">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedin /></a>
                <a href="#"><FaXTwitter /></a>
            </div>

        </div>
        <p className="copyright"> 2025 &copy; All rights reserved</p>
    </footer>
    )
}

export default Footer;