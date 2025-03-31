
import React from "react";
import { motion } from "framer-motion";

const titleVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      duration: 1,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      duration: 1,
      delay: 0.4,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.5,
      ease: "easeInOut",
    },
  },
};

function IntroSection() {
  return (
    <motion.div
      className="intro_container"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeIn}
    >
      <div className="intro_content">
        <motion.div className="intro_left" variants={titleVariants}>
          <motion.span
            className="section_tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Quantum Leap Innovations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Reimagining Logistics
            <br />
            for the Digital Age
          </motion.h2>
        </motion.div>

        <motion.div className="intro_right" variants={contentVariants}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            We're transforming logistics by leveraging existing digital tools.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Faster, cost-effective logistics management designed for today's
            fast-paced market demands.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default IntroSection;
