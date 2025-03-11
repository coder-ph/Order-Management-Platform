import { useState } from 'react';
import React from "react";
import '../assets/styles/LPNavBar.css'
import { RxHamburgerMenu } from "react-icons/rx";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <nav className="nav-bar-lp">
            <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                <RxHamburgerMenu />
                </div>
            <ul className={isOpen ? "nav-list-lp open" : "nav-list-lp"}>
                <li><a href="#home">HOME</a></li>
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#services">SERVICES</a></li>
                <li><a href="#contact">CONTACT</a></li>
            </ul>
        </nav>
    )
}

export default Navbar