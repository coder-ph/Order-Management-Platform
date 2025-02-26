import React from "react";
import Navbar from "../Components/NavBar";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import landingIllustration from "../assets/Images/delivery-illustration.png"
import { MainButton } from "../Components/Buttons/Buttons";
import '../assets/styles/LandingPage.css'

function LandingPage () {
   return (
    <div className="landing-page">
        <Navbar />
        <div className="landing-page-content">
            <div className="text-content">
                <h1>Order Management System</h1>
                <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam erat volutpat. Praesent in ante vel ante mollis
                </p>
            </div>
            <div className="button-container">
                <MainButton style={{padding:"10px 20px", border:"none", borderRadius:"5px", fontSize:"16px"}}>
                    <Link to="/login">LOGIN</Link>
                </MainButton>
                <MainButton style={{padding:"10px 20px", border:"none", borderRadius:"30%", fontSize:"16px", letterSpacing:"1px"}}>
                    <Link to="/signup">SIGN UP</Link>
                </MainButton>
            </div>
            <div className="image-section">
                <img src={landingIllustration} alt="landing page illustration" className="landing-image" />
            </div>

            {/*The about section*/}
            {/* <section className="about-section">
                <div className="about container">
                    <div className="about-content">
                        <h2>What is Order Management System?</h2>
                        <div className="intro-description"> 
                        <p>
                            Vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada
                            fames ac turpis egestas. Integer posuere erat a ante venenatis dapibus posuere
                            vestibulum at eget.
                        </p>
                        </div>
                    </div>
                    <div className="about-image">
                        <img src="https://via.placeholder.com/500" alt="about illustration" className="about-illustration" />
                    </div>
                    <div className="about-text">
                        <h2>ABOUT</h2>
                        <h3>----</h3>
                        <p>
                            Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus mattis rhoncus 
                            urna neque viverra justo. Vivamus at augue eget arcu dictum. Ultrices gravida 
                            dictum fusce ut placerat orci. Aenean et tortor at risus viverra adipiscing in.
                        </p>
                    </div>
                </div>
            </section> */}

            {/*The Services section */}
            {/* <section className="services-section">
                <div className="services container">
                    <h2>Our services</h2>
                    <p>At [Your Company Name], we provide a seamless Order Management System designed to optimize your business operations, streamline workflows, and enhance customer satisfaction. Our platform offers a range of services to help you manage orders efficiently from start to finish.</p>
                    <div className="service-cards">
                        <div className="service-card">
                            <img />
                            <h3>Order Processing and Automation</h3>
                            <p>Effortlessly manage incoming orders with automated processing, reducing manual errors and increasing efficiency. Track orders in real time and ensure timely fulfillment.</p>
                        </div>
                        <div className="service-card">
                            <img />
                            <h3>Inventory Management</h3>
                            <p>Keep your stock levels in check with real-time inventory tracking. Our system automatically updates stock levels, preventing overselling and ensuring you never run out of high-demand products.</p>
                        </div>
                        <div className="service-card">
                            <img />
                            <h3>Secure Payment Processing</h3>
                            <p>Ensure safe and hassle-free transactions with secure payment gateways. Support multiple payment methods, including credit cards, M-Pesa, and bank transfers.</p>
                        </div> 
                    </div>  
                </div>
            </section> */}

            {/*The Contacts Section*/}
            {/* <section className="contacts-section">
                <div className="contacts container">
                   <h2>CONTACT US</h2>
                   <p>Let's get in touch</p>
                   <form className="contact-form">
                    <div className="input-row">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <div className="input-row">
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Phone Number" />
                    </div>
                    <input type="text" placeholder="Subject" />
                    <textarea placeholder="Write something..."></textarea>
                    <MainButton>Send Message</MainButton>
                    </form> 
                </div>
            </section> */}

            {/*The Footer Section */}
            {/* <footer>
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
                <p> 2025 &copy; All rights reserved</p>
            </footer> */}
        </div>
    </div>
   )
}

export default LandingPage;