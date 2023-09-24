import React from "react"
import { motion } from 'framer-motion';

const AnimatedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const animationStyles = {
    initial: { height: "100%", opacity: 1 },
    animate: { height: 0 },
    exit: { y: -10, opacity: 0 },
  }

  return (
    <motion.div
      variants={animationStyles}
      transition={{ ease: "circIn", duration: 0.3 }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
};

export default AnimatedPage;
