import React from "react"
import { motion } from 'framer-motion';

const AnimatedPage: React.FC = ({ children }) => {

  const animationStyles = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }

  return (
    <motion.div
      variants={animationStyles}
      transition={{ ease: "circIn", duration: 0.25 }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
};

export default AnimatedPage;
