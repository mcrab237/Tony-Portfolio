import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, index }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -10 }}
    >
      <Link to={`/project/${project.id}`} className="project-card-link">
        <div className="project-image">
          <motion.img
            src={project.image}
            alt={project.title}
            variants={imageVariants}
            whileHover="hover"
          />
          <div className="project-overlay">
            <div className="project-links">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                </a>
              )}
              <div className="project-link view-details-icon">
                <Eye size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="project-info">
          <div className="project-category">{project.category}</div>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.shortDescription}</p>

          <div className="project-tech">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <span key={techIndex} className="tech-tag">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="tech-tag more">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="view-details">
            View Details
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
