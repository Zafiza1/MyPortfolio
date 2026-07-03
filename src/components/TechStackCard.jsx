import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from './ui';

const TechStackCard = ({ icon, name, level, category, delay = 0 }) => {
  const categoryColors = {
    frontend: 'from-primary to-accent',
    backend: 'from-secondary to-primary',
    database: 'from-accent to-secondary',
    tools: 'from-purple-500 to-pink-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="premium-card p-6 rounded-2xl relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category] || categoryColors.frontend} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
            <img
              src={icon}
              alt={name}
              className="relative w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-xs font-medium text-primary">{level}%</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-1">{name}</h3>
        <p className="text-sm text-text-secondary mb-4 capitalize">{category}</p>
        
        <Progress 
          value={level} 
          max={100} 
          color={category === 'backend' ? 'secondary' : category === 'database' ? 'accent' : 'primary'}
          size="sm"
          showLabel={false}
        />
      </div>
    </motion.div>
  );
};

export default TechStackCard;
