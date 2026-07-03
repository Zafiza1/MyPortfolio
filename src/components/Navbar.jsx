import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "About" },
        { href: "#Portofolio", label: "Portfolio" },
        { href: "#Contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    return {
                        id: item.href.replace("#", ""),
                        offset: section.offsetTop - 200,
                        height: section.offsetHeight
                    };
                }
                return null;
            }).filter(Boolean);

            const currentPosition = window.scrollY;
            const active = sections.find(section => 
                currentPosition >= section.offset && 
                currentPosition < section.offset + section.height
            );

            if (active) {
                setActiveSection(active.id);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Don't call handleScroll immediately to prevent scroll jump on load
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 100;
            window.scrollTo({
                top: top,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-4 sm:top-6 left-0 right-0 mx-auto z-50 transition-all duration-500 ${
                    scrolled
                        ? "w-[92%] sm:w-[90%] md:w-[85%] lg:w-[80%] max-w-6xl"
                        : "w-[96%] sm:w-[95%] md:w-[90%] lg:w-[85%] max-w-7xl"
                }`}
            >
                <div className={`glass-dark rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 transition-all duration-500 ${
                    scrolled ? "py-2 sm:py-2 md:py-3" : "py-2 sm:py-3 md:py-4"
                }`}>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                href="#Home"
                                onClick={(e) => scrollToSection(e, "#Home")}
                                className="flex items-center gap-2"
                            >
                                <span className="text-base sm:text-lg md:text-xl font-bold gradient-text">
                                    Zafi
                                </span>
                            </a>
                        </motion.div>
            
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                            {navItems.map((item) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl transition-all duration-300 ${
                                        activeSection === item.href.substring(1)
                                            ? "text-white bg-white/10"
                                            : "text-text-secondary hover:text-white hover:bg-white/5"
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={`Navigate to ${item.label}`}
                                    aria-current={activeSection === item.href.substring(1) ? "page" : undefined}
                                >
                                    {item.label}
                                    {activeSection === item.href.substring(1) && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </motion.a>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-text-secondary hover:text-white transition-colors"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>
        
            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div className="absolute inset-0 bg-background/90 backdrop-blur-xl" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 h-full w-[80%] sm:w-[70%] max-w-xs bg-surface border-l border-white/10 p-4 sm:p-6"
                            role="navigation"
                            aria-label="Mobile navigation"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-text-secondary hover:text-white transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            
                            <div className="flex flex-col gap-3 sm:gap-4 mt-12 sm:mt-16">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        onClick={(e) => scrollToSection(e, item.href)}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`text-sm sm:text-base font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-xl transition-all ${
                                            activeSection === item.href.substring(1)
                                                ? "text-white bg-gradient-to-r from-primary/20 to-accent/20"
                                                : "text-text-secondary hover:text-white hover:bg-white/5"
                                        }`}
                                        aria-label={`Navigate to ${item.label}`}
                                        aria-current={activeSection === item.href.substring(1) ? "page" : undefined}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;