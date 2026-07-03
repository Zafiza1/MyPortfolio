import React, { useState, useEffect, memo } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { User, Calendar, Mail, Github, Linkedin, ExternalLink, Code2, Globe, Layers, Smartphone, Zap, Heart, BookOpen, Coffee, Dumbbell, Music, Plane } from "lucide-react"
import ExperienceTimeline from "../components/ExperienceTimeline"

const SkillBar = ({ skill, level, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="space-y-2"
  >
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-white">{skill}</span>
      <span className="text-sm text-text-secondary">{level}%</span>
    </div>
    <div className="h-2 bg-surface rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
      />
    </div>
  </motion.div>
)

const InterestCard = ({ icon: Icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.1, y: -5 }}
    className="glass p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer group"
  >
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <span className="text-xs text-text-secondary group-hover:text-white transition-colors">{label}</span>
  </motion.div>
)



const About = () => {
  const [activeTab, setActiveTab] = useState('skills')
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])

  const skills = [
    { name: "React.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "PostgreSQL", level: 80 },
  ]

  const interests = [
    { icon: Code2, label: "Coding" },
    { icon: Globe, label: "Travel" },
    { icon: Music, label: "Music" },
    { icon: Coffee, label: "Coffee" },
    { icon: Dumbbell, label: "Fitness" },
    { icon: BookOpen, label: "Reading" },
  ]

  const timeline = [
    {
      year: "2023 - Present",
      title: "Senior Full Stack Developer",
      company: "Tech Company",
      description: "Leading development of web applications and mentoring junior developers."
    },
    {
      year: "2021 - 2023",
      title: "Full Stack Developer",
      company: "Digital Agency",
      description: "Developed custom web solutions for various clients across different industries."
    },
    {
      year: "2019 - 2021",
      title: "Frontend Developer",
      company: "Startup",
      description: "Built responsive and interactive user interfaces for web applications."
    },
  ]

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden bg-background grid-bg" id="About">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div style={{ y: y1 }} className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Passionate about creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Profile Card */}
            <div className="premium-card p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
              
              <div className="relative flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/10">
                    <img
                      src="/Photo.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Zafi Zunaidi Aziz</h3>
                  <p className="text-text-secondary mb-4">Full Stack Web Developer & UI/UX Designer</p>
                  
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      React.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                      Node.js
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      UI/UX
                    </span>
                  </div>

                  <div className="flex gap-3 justify-center md:justify-start">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://github.com/Zafiza1"
                      target="_blank"
                      className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all"
                    >
                      <Github className="w-5 h-5 text-text-secondary" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href="https://www.linkedin.com/in/zafi-zunaidi-aziz-b6618a2b8"
                      target="_blank"
                      className="w-10 h-10 rounded-xl bg-surface border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all"
                    >
                      <Linkedin className="w-5 h-5 text-text-secondary" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="premium-card p-4 rounded-xl"
              >
                <div>
                  <p className="text-xs text-text-secondary">Location</p>
                  <p className="text-sm font-medium text-white">Indonesia</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="premium-card p-4 rounded-xl"
              >
                <div>
                  <p className="text-xs text-text-secondary">Experience</p>
                  <p className="text-sm font-medium text-white">2 Years</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="premium-card p-4 rounded-xl"
              >
                <div>
                  <p className="text-xs text-text-secondary">Projects</p>
                  <p className="text-sm font-medium text-white">6 Done</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="premium-card p-4 rounded-xl"
              >
                <div>
                  <p className="text-xs text-text-secondary">Focus</p>
                  <p className="text-sm font-medium text-white">Web Dev</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Tab Navigation */}
            <div className="flex gap-2 p-1 bg-surface rounded-xl">
              {['skills', 'timeline', 'interests'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-primary to-accent text-white'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="premium-card p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Technical Skills</h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <SkillBar 
                        key={skill.name} 
                        skill={skill.name} 
                        level={skill.level} 
                        delay={index * 0.1} 
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'timeline' && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="premium-card p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Experience Timeline</h3>
                  <ExperienceTimeline />
                </motion.div>
              )}

              {activeTab === 'interests' && (
                <motion.div
                  key="interests"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="premium-card p-6 rounded-2xl"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">Interests & Hobbies</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {interests.map((interest, index) => (
                      <InterestCard 
                        key={interest.label} 
                        {...interest} 
                        delay={index * 0.1} 
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(About);