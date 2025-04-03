import "./landingpg.scss";
import { useState, useEffect } from "react";
import { FaBehance, FaDribbble } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { IoMailOutline, IoChevronForwardCircle, IoStar, IoApps } from "react-icons/io5";
import { IconContext } from "react-icons";
import Card from "../../Components/landing page/Card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import {  IoMdClose } from "react-icons/io";
import User from "../User/User";
import IntroSection from "./Intro";
import FeaturesSection from "./Features";
import BackToTop from "./BackToTop";
import Footer from "./Footer";

let easeing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const fadeInUp = {
  initial: {
    y: -60,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: easeing,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: easeing,
    },
  },
};

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

const btnGroup = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.6, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};
const star = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.8, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};

const header = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.05, ease: easeing },
  },
  animate: {
    y: 0,
    opacity: 1,
    animation: {
      duration: 0.6,
      ease: easeing,
    },
  },
};

function LandingPages() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [count, setCount] = useState(1);

  useEffect(() => {
    let start = 1;
    const interval = setInterval(() => {
      start += Math.floor(Math.random() * 5) + 1; 
      if (start >= 95) {
        setCount("95+");
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 50); 

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div initial="initial" animate="animate">
      <motion.header variants={stagger}>
     
        <motion.div
          className="logo_wrapper"
          variants={header}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <img
            src="src/assets/icons/logo2.png"
            alt="QuantumLi Logo"
            style={{ height: "40px" }}
          />
          <span style={{color: "black"}}>
            Quantum<span>Li</span>
          </span>
        </motion.div>

        <motion.div className="desktop-nav" variants={stagger}>
          <motion.span className="nav-item" variants={header}>
            <div className="nav-link">
              <Link to="/login">Login</Link>
              <span className="icon-wrapper">
                <IconContext.Provider value={{ color: "#000", size: "20px" }}>
                  <IoMdLogIn />
                </IconContext.Provider>
              </span>
            </div>
          </motion.span>

          <motion.span className="nav-item" variants={header}>
            <div className="nav-link">
              <Link to="/signup">SignUp</Link>
              <span className="icon-wrapper">
                <IconContext.Provider value={{ color: "#000", size: "20px" }}>
                  <MdOutlinePersonAddAlt />
                </IconContext.Provider>
              </span>
            </div>
          </motion.span>

          <motion.span className="nav-item" variants={header}>
            <div className="nav-link">
              <Link to="/services">Services</Link>
              <span className="icon-wrapper">
                <IconContext.Provider value={{ color: "#000", size: "20px" }}>
                  <IoApps />
                </IconContext.Provider>
              </span>
            </div>
          </motion.span>
        </motion.div>

        <motion.div
          className={`mobile-menu-btn ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          variants={header}
        >
          {isMenuOpen ? (
            <IoMdClose size={24} />
          ) : (
            <>
              <span></span>
              <span></span>
              <span></span>
            </>
          )}
        </motion.div>

        <motion.div
          className={`mobile-menu ${isMenuOpen ? "open" : ""}`}
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: isMenuOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="mobile-nav-item">
            <Link to="/login" onClick={toggleMenu}>
              <IoMdLogIn />
              <span>Login</span>
            </Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/signup" onClick={toggleMenu}>
              <MdOutlinePersonAddAlt />
              <span>Sign Up</span>
            </Link>
          </div>
          <div className="mobile-nav-item">
            <Link to="/services" onClick={toggleMenu}>
              <IoApps />
              <span>Services</span>
            </Link>
          </div>
        </motion.div>
      </motion.header>

      <motion.div
        className="content_wrapper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: easeing }}
      >
        <div className="left_content_wrapper">
          <motion.h2>
            <motion.span
              variants={firstName}
              initial="initial"
              animate="animate"
              className="first"
            >
              <motion.span variants={letter}>T</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>a</motion.span>
              <motion.span variants={letter}>n</motion.span>
              <motion.span variants={letter}>s</motion.span>
              <motion.span variants={letter}>f</motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>m</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>n</motion.span>
              <motion.span variants={letter}>g</motion.span>
              <motion.span variants={letter} className="second">
                l
              </motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>g</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>s</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>c</motion.span>
              <motion.span variants={letter}>s</motion.span>
            </motion.span>
            <motion.span
              variants={lastName}
              initial="initial"
              animate="animate"
              className="last"
            >
              <motion.span variants={letter} className="second">
                f
              </motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>r</motion.span>

              <motion.span variants={letter} className="second">
                m
              </motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>d</motion.span>
              <motion.span variants={letter}>e</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>n</motion.span>

              <motion.span variants={letter} className="second">
                b
              </motion.span>
              <motion.span variants={letter}>u</motion.span>
              <motion.span variants={letter}>s</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>n</motion.span>
              <motion.span variants={letter}>e</motion.span>
              <motion.span variants={letter}>s</motion.span>
              <motion.span variants={letter}>s.</motion.span>
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeInUp}>
            Quantum Leap Innovations introduces a groundbreaking logistics
            solution—no extra hardware, just smart technology
          </motion.p>

          <motion.div className="btn_group" variants={stagger}>
            <motion.div
              className="btn btn_primary"
              variants={btnGroup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <IconContext.Provider value={{ color: "#14da8f", size: "25px" }}>
                <IoChevronForwardCircle />
              </IconContext.Provider>
            </motion.div>
            <motion.div
              className="btn btn_secondary"
              variants={btnGroup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </motion.div>
          </motion.div>

          <motion.div className="review_container" variants={stagger}>
            <motion.p className="total_review" variants={star}>
              {count} Reviews
            </motion.p>
            <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
              <motion.span
                variants={star}
                whileHover={{
                  scale: 1.2,
                  rotate: 180,
                  borderRadius: "100%",
                  cursor: "pointer",
                }}
              >
                <IoStar />
              </motion.span>
            </IconContext.Provider>
            <motion.p className="more_review" variants={star}>
              More then 100+ people using our services.
            </motion.p>
          </motion.div>
        </div>

        <motion.div className="right_content_wrapper">
          <motion.img
            src="https://i.pinimg.com/736x/1f/79/0f/1f790fb5d87aa5c74e96a0094fa6e0ba.jpg"
            alt="bg"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
        </motion.div>
      </motion.div>
      <User />
      <Card />
      <IntroSection />
      <FeaturesSection />
      <BackToTop />
      <Footer />
    </motion.div>
  );
}

export default LandingPages;

