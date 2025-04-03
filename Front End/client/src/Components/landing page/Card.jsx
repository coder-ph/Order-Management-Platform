import React from "react";
import {
  IoMailOutline,
  IoChevronForward,
  IoApps,
  IoNotifications,
  IoPieChart,
  IoNewspaper,
  IoCard,
  IoColorFill,
} from "react-icons/io5";
import { CgTrack } from "react-icons/cg";
import { MdAltRoute } from "react-icons/md";
import { IconContext } from "react-icons";
import { motion } from "framer-motion";
import { PiTruckTrailerThin } from "react-icons/pi";

let easing = [0.6, -0.05, 0.01, 0.99];

const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.2,
    },
  },
};

const title = {
  hidden: {
    y: 60,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.6,
      ease: easing,
    },
  },
};

const hoverEffect = {
  whileHover: {
    scale: 1.5,
    rotate: 630,
    borderRadius: "100%",
  },
  whileTap: {
    scale: 0.8,
    rotate: 630,
    borderRadius: "100%",
  },
};

function Card() {
  return (
    <motion.div className="service_container">
      <div className="title_wrapper">
        <motion.span
          className="service_title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          Our Services
        </motion.span>
        <motion.h2
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Save Time Managing and
          <br />
          Tracking Your Orders.
        </motion.h2>
      </div>

      <motion.div
        className="service_card"
        variants={container}
        initial="hidden"
        exit="exit"
        whileInView="show"
        viewport={{ once: false }}
      >
        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#ddfbf9" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#14da8f", size: "22px" }}>
              <CgTrack />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Real-Time Tracking
            <br />& Visibility
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>

        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#e7daf8" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#5700cf", size: "22px" }}>
              <MdAltRoute />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Intelligent Route
            <br />
            Optimization
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#ffede6" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#ff8559", size: "22px" }}>
              <PiTruckTrailerThin />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Automated Dispatch
            <br />& Fleet Management
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#ffe1e9" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#fa3970", size: "22px" }}>
              <IoNotifications />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Seamless Integration
            <br />& Scalability
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#dcedff" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#56a8f4", size: "22px" }}>
              <IoNewspaper />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Data Analytics &
            <br />
            Performance Insights
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#dbf9ed" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#06d786", size: "22px" }}>
              <IoPieChart />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Digital Proof
            <br />
            of Delivery
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#fffada" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#f1df11", size: "22px" }}>
              <IoCard />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Seamless Driver
            <br />
            Communication
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>

        <motion.div className="card" variants={item}>
          <motion.span
            className="service_icon"
            style={{ backgroundColor: "#fffada" }}
            variants={hoverEffect}
            whileHover="whileHover"
            whileTap="whileTap"
          >
            <IconContext.Provider value={{ color: "#f1df11", size: "22px" }}>
              <IoCard />
            </IconContext.Provider>
          </motion.span>
          <h3>
            AI-Powered
            <br />& Incident Alert
          </h3>
          <a href="#">
            <span>learn more</span>
            <IconContext.Provider value={{ color: "#14da8f", size: "18px" }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Card;

