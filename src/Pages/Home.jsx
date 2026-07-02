import React, { useState, useEffect, memo } from "react"
import { Helmet } from "react-helmet-async"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, Instagram, ArrowRight, Download, Award, Briefcase } from "lucide-react"
import Typewriter from "typewriter-effect"

const StatCard = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="premium-card p-6 rounded-2xl"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2, type: "spring" }}
          className="text-2xl font-bold text-white"
        >
          {value}
        </motion.div>
        <div className="text-sm text-text-secondary">{label}</div>
      </div>
    </div>
  </motion.div>
)

const SocialLink = ({ icon: Icon, link, label, delay }) => (
  <motion.a
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.3 }}
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.1, y: -5 }}
    whileTap={{ scale: 0.9 }}
    className="w-12 h-12 rounded-xl bg-surface border border-white/10 flex items-center justify-center hover:border-primary/50 transition-all duration-300 group"
  >
    <Icon className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors" />
  </motion.a>
)

const CTAButton = ({ text, icon: Icon, primary, delay, onClick }) => (
  <motion.button
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300 ${
      primary
        ? "bg-gradient-to-r from-primary to-accent text-white shadow-glow hover:shadow-glow-sm"
        : "bg-surface border border-white/20 text-white hover:border-primary/50"
    }`}
  >
    {text}
    <Icon className="w-4 h-4" />
  </motion.button>
)

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/EkiZR", label: "GitHub Profile" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ekizr/", label: "LinkedIn Profile" },
  { icon: Instagram, link: "https://www.instagram.com/ekizr_/?hl=id", label: "Instagram Profile" }
]

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.querySelector(sectionId)
    if (section) {
      const top = section.offsetTop - 100
      window.scrollTo({
        top: top,
        behavior: "smooth"
      })
    }
  }

  return (
    <>
      <Helmet>
        <title>Zafi Zunaidi Aziz — Full Stack Web Developer & UI/UX Designer</title>
        <meta name="description" content="Website resmi Zafi Zunaidi Aziz, Full Stack Web Developer & UI/UX Designer. Saya berfokus pada pembuatan website modern, aplikasi web, dan sistem informasi yang cepat, responsif, serta mudah digunakan." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ekizr.com" />
        <meta property="og:title" content="Zafi Zunaidi Aziz — Full Stack Web Developer & UI/UX Designer" />
        <meta property="og:description" content="Website resmi dan portofolio Zafi Zunaidi Aziz, Full Stack Web Developer & UI/UX Designer." />
        <meta property="og:url" content="https://ekizr.com" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Zafi Zunaidi Aziz",
            "jobTitle": "Full Stack Web Developer & UI/UX Designer",
            "url": "https://ekizr.com",
            "sameAs": [
              "https://github.com/EkiZR",
              "https://www.linkedin.com/in/ekizr/",
              "https://www.instagram.com/ekizr_/"
            ]
          }
        `}</script>
      </Helmet>

      <section className="min-h-screen relative overflow-hidden bg-background grid-bg" id="Home">
        {/* Background Effects */}
        <div className="absolute inset-0 gradient-mesh" />
        
        {/* Floating Orbs - Optimized with reduced blur */}
        <motion.div style={{ y: y1 }} className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-2xl" />
        <motion.div style={{ y: y2 }} className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-2xl" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-2xl" 
        />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-16 sm:pt-20 md:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Status Badge */}
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Hi, I'm <span className="gradient-text">Zafi Zunaidi Aziz</span>
                </h1>
                <div className="h-8 text-white">
                  <Typewriter
                    options={{
                      strings: ['Full Stack Web Developer', 'UI/UX Designer', 'Problem Solver'],
                      autoStart: true,
                      loop: true,
                      delay: 50,
                      deleteSpeed: 30,
                      pauseFor: 2000,
                      wrapperClassName: "text-2xl md:text-3xl lg:text-4xl font-semibold",
                      cursorClassName: "text-white text-2xl md:text-3xl lg:text-4xl"
                    }}
                  />
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-lg text-text-secondary max-w-xl leading-relaxed"
              >
                I craft exceptional digital experiences that combine beautiful design with powerful functionality. Specializing in modern web development and intuitive user interfaces.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <CTAButton 
                  text="View Portfolio" 
                  icon={ExternalLink} 
                  primary 
                  delay={0.9}
                  onClick={() => scrollToSection('#Portfolio')}
                />
                <CTAButton 
                  text="Contact Me" 
                  icon={Mail} 
                  delay={1.0}
                  onClick={() => scrollToSection('#Contact')}
                />
                <CTAButton 
                  text="Download CV" 
                  icon={Download} 
                  delay={1.1}
                />
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="flex gap-3"
              >
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} {...social} delay={1.3 + index * 0.1} />
                ))}
              </motion.div>
            </div>

            {/* Right Column - Stats & Animation */}
            <div className="space-y-6">
              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="grid grid-cols-2 gap-4"
              >
                <StatCard icon={Briefcase} value="6" label="Project" delay={0.7} />
                <StatCard icon={Award} value="2" label="Years Experience" delay={0.8} />
              </motion.div>


            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default memo(Home);