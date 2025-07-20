import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  Tag,
} from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const docRef = doc(db, "projects", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      } else {
        // Fallback to demo project
        setProject(demoProject);
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      setProject(demoProject);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="project-detail loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail error">
        <div className="error-message">
          <h2>Project not found</h2>
          <Link to="/" className="btn-primary">
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="project-detail"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container">
        <motion.div variants={itemVariants} className="project-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>

          <div className="project-meta">
            <span className="project-category">{project.category}</span>
            <h1 className="project-title">{project.title}</h1>
            <p className="project-subtitle">{project.shortDescription}</p>
          </div>

          <div className="project-actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLink size={18} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github size={18} />
                View Code
              </a>
            )}
          </div>
        </motion.div>

        <div className="project-content">
          <motion.div variants={itemVariants} className="project-gallery">
            <div className="main-image">
              <img
                src={project.images?.[currentImageIndex] || project.image}
                alt={project.title}
              />
            </div>

            {project.images && project.images.length > 1 && (
              <div className="image-thumbnails">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${
                      currentImageIndex === index ? "active" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`Screenshot ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="project-info">
            <motion.div variants={itemVariants} className="project-description">
              <h2>Project Overview</h2>
              <p>{project.description || project.shortDescription}</p>

              {project.features && (
                <div className="project-features">
                  <h3>Key Features</h3>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="project-details">
              <h2>Project Details</h2>

              <div className="detail-grid">
                <div className="detail-item">
                  <Calendar size={20} />
                  <div>
                    <span className="label">Duration</span>
                    <span className="value">
                      {project.duration || "2-3 months"}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <User size={20} />
                  <div>
                    <span className="label">Role</span>
                    <span className="value">
                      {project.role || "Full Stack Developer"}
                    </span>
                  </div>
                </div>

                <div className="detail-item">
                  <Tag size={20} />
                  <div>
                    <span className="label">Client</span>
                    <span className="value">
                      {project.client || "Personal Project"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="project-technologies"
            >
              <h2>Technologies Used</h2>
              <div className="tech-grid">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-item">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {project.challenges && (
              <motion.div
                variants={itemVariants}
                className="project-challenges"
              >
                <h2>Challenges & Solutions</h2>
                <p>{project.challenges}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Demo project data for fallback
const demoProject = {
  id: "1",
  title: "E-Commerce Platform",
  shortDescription: "A full-stack e-commerce solution with modern UI",
  description:
    "This is a comprehensive e-commerce platform built with React and Node.js. It features a modern, responsive design with advanced functionality including user authentication, payment processing, inventory management, and admin dashboard.",
  category: "Web Development",
  technologies: [
    "React",
    "Node.js",
    "MongoDB",
    "Stripe",
    "Redux",
    "Express.js",
  ],
  image: "/api/placeholder/800/600",
  images: [
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
    "/api/placeholder/800/600",
  ],
  features: [
    "User authentication and authorization",
    "Shopping cart and wishlist functionality",
    "Secure payment processing with Stripe",
    "Admin dashboard for inventory management",
    "Responsive design for all devices",
    "Search and filter functionality",
  ],
  liveUrl: "https://example.com",
  githubUrl: "https://github.com/example",
  duration: "3 months",
  role: "Full Stack Developer",
  client: "Personal Project",
  challenges:
    "One of the main challenges was implementing a secure payment system while maintaining a smooth user experience. This was solved by integrating Stripe's secure payment APIs and implementing proper error handling.",
};

export default ProjectDetail;
