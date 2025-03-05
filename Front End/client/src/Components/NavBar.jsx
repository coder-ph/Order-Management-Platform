import React from "react";
import '../assets/styles/LPNavBar.css'

function Navbar() {
    return (
        <nav className="nav-bar-lp">
            <ul className="nav-list-lp">
                <li><a href="#home">HOME</a></li>
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#services">SERVICES</a></li>
                <li><a href="#contact">CONTACT</a></li>
            </ul>
        </nav>
    )
}

export default Navbar