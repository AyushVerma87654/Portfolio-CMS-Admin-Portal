import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import CmsDashboard from "./pages/CmsDashboard";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogsPage from "./pages/BlogsPage";
import ExperiencePage from "./pages/ExperiencePage";
import ServicesPage from "./pages/ServicesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import MediaPage from "./pages/MediaPage";
import Footer from "./components/Footer";

const App: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col justify-center bg-gray-100 grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<CmsDashboard />}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="experience" element={<ExperiencePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="testimonials" element={<TestimonialsPage />} />
            <Route path="media" element={<MediaPage />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
