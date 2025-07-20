import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import ProjectManager from "./admin/ProjectManager";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {!isAdminRoute && <Navigation />}
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <ProjectsSection />
              <Contact />
            </main>
          }
        />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/admin" element={<ProjectManager />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
