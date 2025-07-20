import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ProjectCard from "./ProjectCard";
import { Filter, Grid, List } from "lucide-react";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
      setFilteredProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Fallback to demo data if Firebase fails
      setProjects(demoProjects);
      setFilteredProjects(demoProjects);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  const filterProjects = (category) => {
    setActiveFilter(category);
    if (category === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === category)
      );
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

  const titleVariants = {
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
      <section className="projects-section">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={titleVariants} className="section-subtitle">
            VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK
          </motion.p>
          <motion.h2 variants={titleVariants} className="section-title">
            My <span className="highlight">Portfolio</span>
          </motion.h2>
          <motion.p variants={titleVariants} className="section-description">
            Here are some of my best projects that showcase my skills in web
            development, UI/UX design, and various technologies.
          </motion.p>
        </motion.div>

        <motion.div
          className="projects-controls"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="filter-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-btn ${
                  activeFilter === category ? "active" : ""
                }`}
                onClick={() => filterProjects(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid size={18} />
            </button>
            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List size={18} />
            </button>
          </div>
        </motion.div>

        <motion.div
          className={`projects-grid ${viewMode}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Demo projects data for fallback
const demoProjects = [
  {
    id: "1",
    title: "E-Commerce Platform",
    shortDescription: "A full-stack e-commerce solution with modern UI",
    category: "Web Development",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/api/placeholder/400/300",
    coverPhoto: "/api/placeholder/400/300",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    shortDescription: "Secure mobile banking application with intuitive design",
    category: "Mobile Development",
    technologies: ["React Native", "Firebase", "Redux"],
    image: "/api/placeholder/400/300",
    coverPhoto: "/api/placeholder/400/300",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
  {
    id: "3",
    title: "Portfolio Website",
    shortDescription: "Modern portfolio website with animations",
    category: "UI/UX Design",
    technologies: ["React", "Framer Motion", "CSS3"],
    image: "/api/placeholder/400/300",
    coverPhoto: "/api/placeholder/400/300",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
  },
];

export default ProjectsSection;
