import { motion } from "framer-motion";
import {
  ChevronDown,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-text">
          <motion.p variants={itemVariants} className="hero-greeting">
            WELCOME TO MY WORLD
          </motion.p>

          <motion.h1 variants={itemVariants} className="hero-title">
            Hi, I'm <span className="highlight">Tony</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Full Stack Developer & Designer
          </motion.p>

          <motion.p variants={itemVariants} className="hero-description">
            I'm a passionate Full Stack Developer and UI/UX Designer based in
            Bangladesh. Visit my profile & hire me & let's connect with me.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <button className="btn-primary">
              <Download size={18} />
              Download My CV
            </button>

            <div className="social-links">
              <a href="#" className="social-link">
                <Github size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="#" className="social-link">
                <Mail size={20} />
              </a>
              <a href="#" className="social-link">
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="hero-image"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="image-container">
            <div className="profile-image">
              <img src="/api/placeholder/400/500" alt="Tony" />
            </div>
            <div className="image-decoration">
              <div className="decoration-circle decoration-1"></div>
              <div className="decoration-circle decoration-2"></div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;
