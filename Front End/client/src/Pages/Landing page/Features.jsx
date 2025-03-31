
import React from "react";
import { motion } from "framer-motion";
import { IoPhonePortrait, IoLaptop, IoCash, IoResize } from "react-icons/io5";
import { IconContext } from "react-icons";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      duration: 0.8,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    y: -15,
    scale: 1.03,
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
    transition: { duration: 0.3 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

function FeaturesSection() {
  return (
    <div className="features_container">
      <motion.div
        className="section_header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={headerVariants}
      >
        <motion.span
          className="section_tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Our Solution
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          A Smarter Way to Manage Logistics
        </motion.h2>
      </motion.div>

      <motion.div
        className="features_grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {[
          {
            icon: <IoPhonePortrait />,
            title: "Hardware-Free",
            desc: "Use existing smartphones for tracking",
          },
          {
            icon: <IoLaptop />,
            title: "Intuitive Dashboard",
            desc: "User-friendly admin interface",
          },
          {
            icon: <IoCash />,
            title: "Cost-Effective",
            desc: "No additional equipment needed",
          },
          {
            icon: <IoResize />,
            title: "Scalable",
            desc: "Fits businesses of any size",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="feature_card"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.div
              className="feature_icon"
              whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
            >
              <IconContext.Provider value={{ color: "#14da8f", size: "20px" }}>
                {feature.icon}
              </IconContext.Provider>
            </motion.div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="section_footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <p>
          Our platform streamlines operations by eliminating traditional
          hardware requirements, letting you focus on exceptional service
          delivery.
        </p>
      </motion.div>
    </div>
  );
}

export default FeaturesSection;
