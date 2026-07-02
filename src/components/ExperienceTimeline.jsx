import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, ChevronRight } from 'lucide-react';

const ExperienceTimeline = ({ experiences = [] }) => {
  const defaultExperiences = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      location: "Jakarta, Indonesia",
      description: "Leading development of web applications and mentoring junior developers. Implemented scalable solutions and improved system performance by 40%.",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      type: "work"
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Digital Agency",
      location: "Remote",
      description: "Developed custom web solutions for various clients across different industries. Delivered 20+ projects on time and within budget.",
      technologies: ["Next.js", "Laravel", "MySQL", "Docker"],
      type: "work"
    },
    {
      year: "2019 - 2021",
      title: "Frontend Developer",
      company: "Startup",
      location: "Bandung, Indonesia",
      description: "Built responsive and interactive user interfaces for web applications. Collaborated with design team to implement pixel-perfect designs.",
      technologies: ["React", "Vue.js", "Tailwind CSS", "Figma"],
      type: "work"
    },
    {
      year: "2018 - 2019",
      title: "Junior Web Developer",
      company: "Web Studio",
      location: "Jakarta, Indonesia",
      description: "Started professional journey building websites and learning modern web development practices. Contributed to 15+ client projects.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
      type: "work"
    }
  ];

  const timelineData = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />
      
      <div className="space-y-8">
        {timelineData.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative pl-20"
          >
            {/* Timeline dot */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent border-4 border-background -translate-x-1/2 shadow-lg shadow-primary/30"
            />
            
            {/* Experience card */}
            <motion.div
              whileHover={{ x: 5 }}
              className="premium-card p-6 rounded-2xl relative overflow-hidden group"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-primary font-medium">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{experience.title}</h3>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">{experience.company}</span>
                    </div>
                    {experience.location && (
                      <div className="flex items-center gap-2 text-text-muted text-sm">
                        <MapPin className="w-3 h-3" />
                        <span>{experience.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>
                
                {/* Description */}
                <p className="text-text-secondary mb-4 leading-relaxed">
                  {experience.description}
                </p>
                
                {/* Technologies */}
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + techIndex * 0.05 + 0.3 }}
                        className="px-3 py-1 rounded-full bg-surface border border-white/10 text-xs text-text-secondary hover:border-primary/30 hover:text-primary transition-colors cursor-default"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
