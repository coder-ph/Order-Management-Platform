import React from "react";
import about from "../assets/Images/working-together.png"
import '../assets/styles/About.css'

function About () {
    return (
        <div>
        <section className="about-section">
            
                <div className="about-container">
                    <div className="about-content">
                        {/* <h1>ABOUT US</h1> */}
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
                        <img src={about} alt="about illustration" className="about-illustration" />
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
        </section>
        </div>
    )
}

export default About; 