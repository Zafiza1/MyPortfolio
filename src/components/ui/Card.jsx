import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true, delay = 0 }) => {
  const MotionCard = motion.div;

  return (
    <MotionCard
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      className={`premium-card p-6 rounded-2xl ${className}`}
    >
      {children}
    </MotionCard>
  );
};

export default Card;
