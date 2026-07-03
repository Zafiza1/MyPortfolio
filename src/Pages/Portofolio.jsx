import React, { useEffect, useState, useCallback } from "react";

import { getProjects, getCertificates } from "../api";

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import TechStackCard from "../components/TechStackCard";
import CertificationCard from "../components/CertificationCard";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { motion, AnimatePresence } from "framer-motion";


const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// techStacks dengan categorization dan experience level
const techStacks = {
  frontend: [
    { icon: "html.svg", language: "HTML5", level: 95, years: 5 },
    { icon: "css.svg", language: "CSS3", level: 90, years: 5 },
    { icon: "javascript.svg", language: "JavaScript", level: 92, years: 5 },
    { icon: "typescript.svg?v=2", language: "TypeScript", level: 88, years: 3 },
    { icon: "reactjs.svg", language: "React.js", level: 95, years: 4 },
    { icon: "nextjs.png", language: "Next.js", level: 85, years: 2 },
    { icon: "tailwind.svg", language: "Tailwind CSS", level: 90, years: 3 },
    { icon: "bootstrap.svg", language: "Bootstrap", level: 85, years: 4 },
  ],
  backend: [
    { icon: "Laravel.png", language: "Laravel", level: 82, years: 3 },
    { icon: "php.svg?v=2", language: "PHP", level: 85, years: 4 },
    { icon: "nodejs.svg", language: "Node.js", level: 88, years: 4 },
    { icon: "express.png", language: "Express.js", level: 80, years: 3 },
  ],
  database: [
    { icon: "mySQL.png", language: "MySQL", level: 85, years: 4 },
    { icon: "postgresql.svg?v=2", language: "PostgreSQL", level: 80, years: 2 },
    { icon: "mongodb.png", language: "MongoDB", level: 78, years: 2 },
  ],
  tools: [
    { icon: "git.png", language: "Git", level: 90, years: 5 },
    { icon: "github.svg?v=2", language: "GitHub", level: 92, years: 5 },
    { icon: "Figma-logo.svg", language: "Figma", level: 75, years: 2 },
    { icon: "Docker.svg?v=2", language: "Docker", level: 70, years: 1 },
    { icon: "postman.png", language: "Postman", level: 85, years: 4 },
  ],
};

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({
      once: false,
    });
  }, []);


  const fetchData = useCallback(async () => {
    try {
      // Mengambil data dari API secara paralel
      const [projectData, certificateData] = await Promise.all([
        getProjects(),
        getCertificates(), 
      ]);

      setProjects(projectData);
      setCertificates(certificateData);

      // Store in localStorage (fungsionalitas ini tetap dipertahankan)
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      
      // Dispatch custom event to notify other components (like About)
      window.dispatchEvent(new Event("portfolioDataUpdated"));
    } catch (error) {
      console.error("Error fetching data from API:", error.message);
    }
  }, []);



  useEffect(() => {
    // Coba ambil dari localStorage dulu untuk laod lebih cepat
    const cachedProjects = localStorage.getItem('projects');
    const cachedCertificates = localStorage.getItem('certificates');

    if (cachedProjects && cachedCertificates) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates));
    }
    
    fetchData(); // Tetap panggil fetchData untuk sinkronisasi data terbaru
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  // Sisa dari komponen (return statement) tidak ada perubahan
  return (
    <div className="md:px-[10%] px-[5%] w-full py-20 lg:py-32 bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pt-16 pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
        </p>
      </div>

      <div className="w-full">
        {/* AppBar and Tabs section - unchanged */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          {/* Tabs remain unchanged */}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

          <AnimatePresence mode="wait">
            {value === 0 && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div className="container mx-auto flex justify-center items-center overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                      {displayedProjects.map((project, index) => (
                        <div
                          key={project.id || index}
                          data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                          data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                        >
                          <CardProject
                            Img={project.Img}
                            Title={project.Title}
                            Description={project.Description}
                            Link={project.Link}
                            id={project.id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  {projects.length > initialItems && (
                    <div className="mt-6 w-full flex justify-start">
                      <ToggleButton
                        onClick={() => toggleShowMore('projects')}
                        isShowingMore={showAllProjects}
                      />
                    </div>
                  )}
                </TabPanel>
              </motion.div>
            )}

            {value === 1 && (
              <motion.div
                key="certificates"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div className="container mx-auto px-6 lg:px-12 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayedCertificates.map((certificate, index) => (
                        <CertificationCard
                          key={certificate.id || index}
                          certification={certificate}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                    {certificates.length > initialItems && (
                      <div className="mt-8 w-full flex justify-center">
                        <ToggleButton
                          onClick={() => toggleShowMore('certificates')}
                          isShowingMore={showAllCertificates}
                        />
                      </div>
                    )}
                  </div>
                </TabPanel>
              </motion.div>
            )}

            {value === 2 && (
              <motion.div
                key="techstack"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <div className="container mx-auto px-6 lg:px-12 py-12">
                    <div className="space-y-12">
                      {Object.entries(techStacks).map(([category, items], categoryIndex) => (
                        <div key={category} className="space-y-6">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
                            className="flex items-center gap-3 mb-6"
                          >
                            <div className="w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                            <h3 className="text-2xl font-bold text-white capitalize">{category}</h3>
                          </motion.div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {items.map((stack, index) => (
                              <TechStackCard
                                key={stack.language}
                                icon={`/${stack.icon}`}
                                name={stack.language}
                                level={stack.level}
                                category={category}
                                delay={categoryIndex * 0.1 + index * 0.05}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}