import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building } from 'lucide-react';

const CertificationCard = ({ certification, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="premium-card p-6 rounded-2xl relative overflow-hidden group"
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        {/* Certificate image */}
        <div className="relative overflow-hidden rounded-xl mb-4 group-hover:shadow-lg transition-shadow">
          <img
            src={certification.Img}
            alt={certification.title}
            className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content */}
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white line-clamp-1">
                {certification.title || 'Professional Certification'}
              </h3>
              <p className="text-sm text-text-secondary">
                {certification.issuer || 'Certification Authority'}
              </p>
            </div>
          </div>
          
          {/* Meta info */}
          <div className="flex flex-wrap gap-3 text-xs text-text-muted">
            {certification.date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{certification.date}</span>
              </div>
            )}
            {certification.issuer && (
              <div className="flex items-center gap-1">
                <Building className="w-3 h-3" />
                <span>{certification.issuer}</span>
              </div>
            )}
          </div>
          
          {/* Credential ID */}
          {certification.credentialId && (
            <div className="text-xs text-text-secondary">
              <span className="font-medium">Credential ID:</span> {certification.credentialId}
            </div>
          )}
          
          {/* Link */}
          {certification.link && (
            <motion.a
              whileHover={{ x: 5 }}
              href={certification.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm font-medium"
            >
              <span>View Certificate</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
