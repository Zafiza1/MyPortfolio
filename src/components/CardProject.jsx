import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Github, Calendar, Tag } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id, tags = [], date }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group relative w-full"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-surface/90 to-background/90 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500 hover:shadow-primary/20 glow-border">
        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative p-6 z-10">
          {/* Image container */}
          <div className="relative overflow-hidden rounded-xl mb-5">
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={Img}
              alt={Title}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {ProjectLink && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg"
                  aria-label="View live demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              )}
              {id && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to={`/project/${toSlug(Title)}`}
                    onClick={handleDetails}
                    className="w-12 h-12 rounded-xl bg-surface border border-white/20 flex items-center justify-center text-white hover:border-primary/50 transition-colors"
                    aria-label="View project details"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Date badge */}
            {date && (
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Calendar className="w-3 h-3" />
                <span>{date}</span>
              </div>
            )}

            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {Title}
            </h3>

            <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
              {Description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="px-2 py-1 rounded-full bg-surface text-text-secondary text-xs">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-white/10">
              {ProjectLink ? (
                <motion.a
                  whileHover={{ x: 5 }}
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors duration-200 text-sm font-medium"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              ) : (
                <span className="text-text-muted text-sm">Demo Not Available</span>
              )}

              {id ? (
                <motion.div whileHover={{ x: -5 }}>
                  <Link
                    to={`/project/${toSlug(Title)}`}
                    onClick={handleDetails}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all duration-200 text-sm font-medium border border-white/10 hover:border-primary/30"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              ) : (
                <span className="text-text-muted text-sm">Details Not Available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CardProject;
