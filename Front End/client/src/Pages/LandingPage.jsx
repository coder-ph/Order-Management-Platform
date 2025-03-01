import React from "react";
import Navbar from "../Components/NavBar";
import { Link } from "react-router-dom";
import landingIllustration from "../assets/Images/delivery-illustration.png";
import { MainButton } from "../Components/Buttons/Button";
import About from "../Components/About"
import Contact from "../Components/Contact"
import Services from "../Components/Services"
import Footer from "../Components/Footer";
import '../assets/styles/LandingPage.css'
import User from "./User/User";

function LandingPage () {
   return (
    <div className="landing-page">
        <Navbar />
        <div className="button-container">
            <MainButton style={{padding:"12px 24px", border:"1px solid white", borderRadius:"25px", fontSize:"14px", letterSpacing:"1px", backgroundColor:"transparent", color:"#fff"}}>
                <Link to="/login">LOGIN</Link>
            </MainButton>
            <MainButton style={{padding:"12px 24px", border:"none", borderRadius:"25px", fontSize:"14px", letterSpacing:"1px", backgroundColor:"#141b2d"}}>
                <Link to="/signup">REGISTER</Link>
            </MainButton>
        </div>
        <div className="landing-page-content">
            <div className="text-content">
                <h1>Order Management System</h1>
                <p>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam erat volutpat. Praesent in ante vel ante mollis.
                </p>
            </div>
            <div className="image-section">
                <img src={landingIllustration} alt="delivery illustration" className="landing-image" />
            </div>
        </div>

        {/*The About section */}
        <div className="section-wrapper">
        <About />
        </div>
        {/*The Services section */}
        <div className="section-wrapper">
            <Services />
        </div>
        {/*The Contact section */}
        <div className="section-wrapper">
            <Contact />
        </div>
        {/* The Footer section */}
        <div className="section-wrapper">
            <User/>
        <Footer />
        </div>
    </div>
   )
}

export default LandingPage;