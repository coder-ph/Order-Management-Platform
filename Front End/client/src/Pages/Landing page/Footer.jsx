// Footer.js
import React from "react";
import { motion } from "framer-motion";
import { IoChevronForward } from "react-icons/io5";
import { IconContext } from "react-icons";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function Footer() {
  return (
    <motion.footer
      className="footer_container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="footer_content">
        <motion.div className="footer_column" variants={itemVariants}>
          <h3 className="footer_logo">Quantum Leap</h3>
          <p className="footer_tagline">
            Skip the hassle—manage orders effortlessly with real-time tracking,
            secure payments, and a seamless workflow.
          </p>
        </motion.div>

        <motion.div className="footer_column" variants={itemVariants}>
          <h4>Products</h4>
          <ul>
            <li>
              <a href="#">For Individuals</a>
            </li>
            <li>
              <a href="#">For Teams</a>
            </li>
          </ul>
        </motion.div>

        <motion.div className="footer_column" variants={itemVariants}>
          <h4>About</h4>
          <ul>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Partners</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
          </ul>
        </motion.div>

        <motion.div className="footer_column" variants={itemVariants}>
          <h4>Community</h4>
          <ul>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Forum</a>
            </li>
            <li>
              <a href="#">Merch Store</a>
            </li>
          </ul>
        </motion.div>

        <motion.div className="footer_column" variants={itemVariants}>
          <h4>Solutions</h4>
          <ul>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Contact Sales</a>
            </li>
            <li>
              <a href="#">Help & Support</a>
            </li>
            <li>
              <a href="#">Invest</a>
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div className="footer_bottom" variants={itemVariants}>
        <p>©2025 Quantum Leap Innovations. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
