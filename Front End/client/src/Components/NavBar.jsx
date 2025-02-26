import React from "react";
import '../assets/styles/NavBar.css'

function Navbar() {
    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li><a href="">HOME</a></li>
                <li><a href="">ABOUT</a></li>
                <li><a href="">SERVICES</a></li>
                <li><a href="">CONTACT</a></li>
            </ul>
        </nav>
    )
}

export default Navbar