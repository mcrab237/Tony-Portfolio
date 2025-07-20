import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";
import {
  Plus,
  Edit,
  Trash,
  Upload,
  Save,
  X,
  ArrowLeft,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    category: "",
    technologies: "",
    features: "",
    liveUrl: "",
    githubUrl: "",
    duration: "",
    role: "",
    client: "",
    challenges: "",
    images: [],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      return await getDownloadURL(snapshot.ref);
    });

    try {
      const imageUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...imageUrls],
      }));
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Error uploading images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
      features: formData.features
        .split("\n")
        .filter((feature) => feature.trim()),
      image: formData.images[0] || "/api/placeholder/400/300",
      createdAt: editingProject ? editingProject.createdAt : serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingProject) {
        await updateDoc(doc(db, "projects", editingProject.id), projectData);
        alert("Project updated successfully!");
      } else {
        await addDoc(collection(db, "projects"), projectData);
        alert("Project added successfully!");
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project");
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      shortDescription: project.shortDescription || "",
      description: project.description || "",
      category: project.category || "",
      technologies: project.technologies?.join(", ") || "",
      features: project.features?.join("\n") || "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      duration: project.duration || "",
      role: project.role || "",
      client: project.client || "",
      challenges: project.challenges || "",
      images: project.images || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteDoc(doc(db, "projects", projectId));
      alert("Project deleted successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      category: "",
      technologies: "",
      features: "",
      liveUrl: "",
      githubUrl: "",
      duration: "",
      role: "",
      client: "",
      challenges: "",
      images: [],
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const seedDemoData = async () => {
    const demoProjects = [
      {
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
        features: [
          "User authentication and authorization",
          "Shopping cart and wishlist functionality",
          "Secure payment processing with Stripe",
          "Admin dashboard for inventory management",
          "Responsive design for all devices",
          "Search and filter functionality",
        ],
        image:
          "https://via.placeholder.com/800x600/667eea/ffffff?text=E-Commerce+Platform",
        images: [
          "https://via.placeholder.com/800x600/667eea/ffffff?text=E-Commerce+Platform",
          "https://via.placeholder.com/800x600/764ba2/ffffff?text=Admin+Dashboard",
          "https://via.placeholder.com/800x600/ff7461/ffffff?text=Mobile+View",
        ],
        liveUrl: "https://example.com",
        githubUrl: "https://github.com/example",
        duration: "3 months",
        role: "Full Stack Developer",
        client: "Tech Startup",
        challenges:
          "One of the main challenges was implementing a secure payment system while maintaining a smooth user experience. This was solved by integrating Stripe's secure payment APIs and implementing proper error handling.",
        createdAt: serverTimestamp(),
      },
      {
        title: "Mobile Banking App",
        shortDescription:
          "Secure mobile banking application with intuitive design",
        description:
          "A comprehensive mobile banking application built with React Native. Features include account management, transfers, bill payments, and advanced security measures.",
        category: "Mobile Development",
        technologies: ["React Native", "Firebase", "Redux", "TypeScript"],
        features: [
          "Secure user authentication with biometrics",
          "Account balance and transaction history",
          "Money transfers and bill payments",
          "Push notifications for transactions",
          "Dark/Light mode support",
          "Offline data synchronization",
        ],
        image:
          "https://via.placeholder.com/800x600/667eea/ffffff?text=Banking+App",
        images: [
          "https://via.placeholder.com/800x600/667eea/ffffff?text=Banking+App",
          "https://via.placeholder.com/800x600/764ba2/ffffff?text=Transfer+Screen",
          "https://via.placeholder.com/800x600/ff7461/ffffff?text=Dashboard",
        ],
        liveUrl: "https://apps.apple.com/example",
        githubUrl: "https://github.com/example",
        duration: "4 months",
        role: "Mobile Developer",
        client: "Financial Institution",
        challenges:
          "Implementing bank-level security while maintaining user experience was crucial. Used advanced encryption and biometric authentication.",
        createdAt: serverTimestamp(),
      },
      {
        title: "Portfolio Website",
        shortDescription: "Modern portfolio website with animations",
        description:
          "A stunning portfolio website built with React and Framer Motion. Features smooth animations, responsive design, and an admin panel for content management.",
        category: "UI/UX Design",
        technologies: ["React", "Framer Motion", "CSS3", "Firebase"],
        features: [
          "Smooth scroll animations",
          "Responsive grid layout",
          "Dark mode theme",
          "Contact form integration",
          "SEO optimization",
          "Fast loading performance",
        ],
        image:
          "https://via.placeholder.com/800x600/667eea/ffffff?text=Portfolio+Website",
        images: [
          "https://via.placeholder.com/800x600/667eea/ffffff?text=Portfolio+Website",
          "https://via.placeholder.com/800x600/764ba2/ffffff?text=Projects+Section",
          "https://via.placeholder.com/800x600/ff7461/ffffff?text=Contact+Form",
        ],
        liveUrl: "https://portfolio.example.com",
        githubUrl: "https://github.com/example",
        duration: "2 months",
        role: "Frontend Developer & Designer",
        client: "Personal Project",
        challenges:
          "Creating smooth animations while maintaining performance across different devices required careful optimization of animation triggers.",
        createdAt: serverTimestamp(),
      },
    ];

    try {
      for (const project of demoProjects) {
        await addDoc(collection(db, "projects"), project);
      }
      alert("Demo data seeded successfully!");
      fetchProjects();
    } catch (error) {
      console.error("Error seeding demo data:", error);
      alert("Error seeding demo data");
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="project-manager">
      <div className="admin-nav">
        <div className="container">
          <div className="admin-nav-content">
            <Link to="/" className="admin-logo">
              <Home size={20} />
              <span>Tony's Portfolio</span>
            </Link>
            <Link to="/" className="back-to-site">
              <ArrowLeft size={18} />
              Back to Site
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="admin-header">
          <h1>Project Manager</h1>
          <div className="admin-actions">
            <button className="btn-secondary" onClick={seedDemoData}>
              Seed Demo Data
            </button>
            <button className="btn-primary" onClick={() => setShowForm(true)}>
              <Plus size={18} />
              Add Project
            </button>
          </div>
        </div>

        {/* Project List */}
        <div className="projects-list">
          {projects.map((project) => (
            <div key={project.id} className="project-item">
              <div className="project-thumbnail">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-details">
                <h3>{project.title}</h3>
                <p className="category">{project.category}</p>
                <p>{project.shortDescription}</p>
                <div className="project-tech">
                  {project.technologies?.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="project-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  <Edit size={16} />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{editingProject ? "Edit Project" : "Add New Project"}</h2>
                <button className="close-btn" onClick={resetForm}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="project-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Short Description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Full Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Technologies (comma-separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Features (one per line)</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Live URL</label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>GitHub URL</label>
                    <input
                      type="url"
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="3 months"
                    />
                  </div>
                  <div className="form-group">
                    <label>Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="Full Stack Developer"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Client</label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    placeholder="Personal Project"
                  />
                </div>

                <div className="form-group">
                  <label>Challenges & Solutions</label>
                  <textarea
                    name="challenges"
                    value={formData.challenges}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Images</label>
                  <div className="image-upload">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="upload-btn">
                      <Upload size={18} />
                      {uploading ? "Uploading..." : "Upload Images"}
                    </label>
                  </div>

                  {formData.images.length > 0 && (
                    <div className="image-preview">
                      {formData.images.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => removeImage(index)}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save size={18} />
                    {editingProject ? "Update Project" : "Add Project"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
