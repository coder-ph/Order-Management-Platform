import React from "react";
// import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="nav-bar">
            <ul className="nav-list">
                <li><a href="">Home</a></li>
                <li><a href="">About</a></li>
                <li><a href="">Services</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Navbar