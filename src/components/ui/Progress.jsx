import React from 'react';
import { motion } from 'framer-motion';

const Progress = ({ value, max = 100, color = 'primary', size = 'md', showLabel = true, label }) => {
  const colors = {
    primary: 'from-primary to-accent',
    secondary: 'from-secondary to-primary',
    accent: 'from-accent to-secondary',
    success: 'from-green-400 to-emerald-500'
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  };

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className="space-y-2">
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-white">{label}</span>
          {showLabel && (
            <span className="text-sm text-text-secondary">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-surface rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
};

export default Progress;
