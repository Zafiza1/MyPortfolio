import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const SectionHeader = ({ title, subtitle, description, align = 'center' }) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${alignmentClasses[align]}`}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
        <ChevronRight className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{subtitle}</span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
        {title}
      </h2>
      
      {description && (
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
